import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon, TrashIcon, XCircleIcon } from '@heroicons/react/solid'
import Dropdown from 'components/dropdown'
import Layout from 'components/layout'
import { classNames } from 'lib'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart } from 'redux/features/cartSlice'
import { useAppSelector } from 'redux/hooks'
import { CartItem, Product } from 'types'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const deliveryMethods = [
  {
    id: 1,
    title: 'Standard',
    turnaround: '4–10 business days',
    price: 5.0,
  },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: 16.0 },
]
const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'paypal', title: 'PayPal' },
  { id: 'etransfer', title: 'eTransfer' },
]

export default function Example() {
  const cartItems = useAppSelector((state) => state.cart)

  const sendData = async (data: any) => {
    try {
      const sentdata = await axios.post('/api/order', data)
    } catch (error) {
      console.log(error)
    }
  }

  const dispatch = useDispatch()
  const removeHandler = (item: CartItem) => {
    dispatch(removeFromCart(item))
  }
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0]
  )
  // console.log(selectedPaymentMethod)

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  )
  const deliveryFees = selectedDeliveryMethod.price

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      city: '',
      apartmen: '',
      country: '',
      state: '',
      postalCode: '',
      phone: '',
      email: '',
      selectedPaymentMethod,
      selectedDeliveryMethod,
    },
    onSubmit: (values) => {
      const order = {
        ...values,
        cartItems,
      }
      sendData(order)

      console.log('order sent')
    },
  })

  const [open, setOpen] = useState(false)

  const subtotal = () => {
    let total = 0
    for (let i = 0; i < cartItems.length; i++) {
      total = +cartItems[i].price * cartItems[i].quantity
    }
    return total
  }

  const totalPrice = () => {
    return subtotal() + deliveryFees + 5.52
  }

  return (
    <Layout>
      <div className="bg-gray-50">
        <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h1 className="sr-only">Checkout</h1>

            <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    Contact information
                  </h2>

                  <div className="mt-4">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      {formik.touched.email && formik.errors.email ? (
                        <div className="rounded-md bg-red-50 p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <XCircleIcon
                                className="h-5 w-5 text-red-400"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="ml-3">
                              <div className="mt-2 text-sm text-red-700">
                                <ul
                                  role="list"
                                  className="list-disc space-y-1 pl-5"
                                >
                                  <li>{formik.errors.email}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-lg font-medium text-gray-900">
                    Shipping information
                  </h2>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <div className="mt-1">
                        {formik.touched.firstName && formik.errors.firstName ? (
                          <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <XCircleIcon
                                  className="h-5 w-5 text-red-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-3">
                                <div className="mt-2 text-sm text-red-700">
                                  <ul
                                    role="list"
                                    className="list-disc space-y-1 pl-5"
                                  >
                                    <li>{formik.errors.firstName}</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <input
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.firstName}
                          type="text"
                          id="firstName"
                          name="firstName"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <div className="mt-1">
                        {formik.touched.lastName && formik.errors.lastName ? (
                          <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <XCircleIcon
                                  className="h-5 w-5 text-red-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-3">
                                <div className="mt-2 text-sm text-red-700">
                                  <ul
                                    role="list"
                                    className="list-disc space-y-1 pl-5"
                                  >
                                    <li>{formik.errors.lastName}</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <input
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.lastName}
                          type="text"
                          id="lastName"
                          name="lastName"
                          autoComplete="family-name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Company
                      </label>
                      <div className="mt-1">
                        {formik.touched.company && formik.errors.company ? (
                          <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <XCircleIcon
                                  className="h-5 w-5 text-red-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-3">
                                <div className="mt-2 text-sm text-red-700">
                                  <ul
                                    role="list"
                                    className="list-disc space-y-1 pl-5"
                                  >
                                    <li>{formik.errors.company}</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <input
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.company}
                          type="text"
                          name="company"
                          id="company"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <div className="mt-1">
                        {formik.touched.address && formik.errors.address ? (
                          <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <XCircleIcon
                                  className="h-5 w-5 text-red-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-3">
                                <div className="mt-2 text-sm text-red-700">
                                  <ul
                                    role="list"
                                    className="list-disc space-y-1 pl-5"
                                  >
                                    <li>{formik.errors.address}</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <input
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.address}
                          type="text"
                          name="address"
                          id="address"
                          autoComplete="street-address"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="apartment"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Apartment, suite, etc.
                      </label>
                      <div className="mt-1">
                        {formik.touched.apartmen && formik.errors.apartmen ? (
                          <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <XCircleIcon
                                  className="h-5 w-5 text-red-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-3">
                                <div className="mt-2 text-sm text-red-700">
                                  <ul
                                    role="list"
                                    className="list-disc space-y-1 pl-5"
                                  >
                                    <li>{formik.errors.apartmen}</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <input
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.apartmen}
                          type="text"
                          name="apartmen"
                          id="apartment"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <div className="mt-1">
                        {formik.touched.city && formik.errors.city ? (
                          <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <XCircleIcon
                                  className="h-5 w-5 text-red-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-3">
                                <div className="mt-2 text-sm text-red-700">
                                  <ul
                                    role="list"
                                    className="list-disc space-y-1 pl-5"
                                  >
                                    <li>{formik.errors.city}</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <input
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.city}
                          type="text"
                          name="city"
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <div className="mt-1">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State / Province
                      </label>
                      <div className="mt-1">
                        {formik.touched.state && formik.errors.state ? (
                          <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <XCircleIcon
                                  className="h-5 w-5 text-red-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-3">
                                <div className="mt-2 text-sm text-red-700">
                                  <ul
                                    role="list"
                                    className="list-disc space-y-1 pl-5"
                                  >
                                    <li>{formik.errors.state}</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.state}
                          type="text"
                          name="state"
                          id="state"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Postal code
                      </label>
                      <div className="mt-1">
                        {formik.touched.postalCode &&
                        formik.errors.postalCode ? (
                          <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <XCircleIcon
                                  className="h-5 w-5 text-red-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-3">
                                <div className="mt-2 text-sm text-red-700">
                                  <ul
                                    role="list"
                                    className="list-disc space-y-1 pl-5"
                                  >
                                    <li>{formik.errors.postalCode}</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <input
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.postalCode}
                          type="text"
                          name="postalCode"
                          id="postalCode"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <div className="mt-1">
                        {formik.touched.phone && formik.errors.phone ? (
                          <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <XCircleIcon
                                  className="h-5 w-5 text-red-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-3">
                                <div className="mt-2 text-sm text-red-700">
                                  <ul
                                    role="list"
                                    className="list-disc space-y-1 pl-5"
                                  >
                                    <li>{formik.errors.phone}</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <input
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.phone}
                          type="text"
                          name="phone"
                          id="phone"
                          autoComplete="tel"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-10">
                  <RadioGroup
                    value={selectedDeliveryMethod}
                    onChange={setSelectedDeliveryMethod}
                  >
                    <RadioGroup.Label className="text-lg font-medium text-gray-900">
                      Delivery method
                    </RadioGroup.Label>

                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      {deliveryMethods.map((deliveryMethod) => (
                        <RadioGroup.Option
                          key={deliveryMethod.id}
                          value={deliveryMethod}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? 'border-transparent'
                                : 'border-gray-300',
                              active ? 'ring-2 ring-indigo-500' : '',
                              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <div className="flex flex-1">
                                <div className="flex flex-col">
                                  <RadioGroup.Label
                                    as="span"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    {deliveryMethod.title}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="span"
                                    className="mt-1 flex items-center text-sm text-gray-500"
                                  >
                                    {deliveryMethod.turnaround}
                                  </RadioGroup.Description>
                                  <RadioGroup.Description
                                    as="span"
                                    className="mt-6 text-sm font-medium text-gray-900"
                                  >
                                    {deliveryMethod.price}
                                  </RadioGroup.Description>
                                </div>
                              </div>
                              {checked ? (
                                <CheckCircleIcon
                                  className="h-5 w-5 text-indigo-600"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <div
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-500'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment */}
                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                  <fieldset className="mt-4">
                    <legend className="sr-only">Payment type</legend>
                    <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                      {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                        <div
                          key={paymentMethod.id}
                          className="flex items-center"
                        >
                          <input
                            onClick={() =>
                              setSelectedPaymentMethod(paymentMethod)
                            }
                            value={paymentMethod.title}
                            id={paymentMethod.id}
                            name="payment-type"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />

                          <label
                            htmlFor={paymentMethod.id}
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            {paymentMethod.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
                    <div className="col-span-4">
                      <label
                        htmlFor="card-number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Card number
                      </label>
                      <div className="mt-1">
                        {/* {formik.touched.cardNumber && formik.errors.cardNumber ? (
                          <Error />
                        ) : null} */}
                        <input
                          onBlur={formik.handleBlur}
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          autoComplete="cc-number"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="col-span-4">
                      <label
                        htmlFor="name-on-card"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name on card
                      </label>
                      <div className="mt-1">
                        <input
                          onBlur={formik.handleBlur}
                          type="text"
                          id="nameOnCard"
                          name="nameOnCard"
                          autoComplete="cc-name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="expiration-date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expiration date (MM/YY)
                      </label>
                      <div className="mt-1">
                        <input
                          onBlur={formik.handleBlur}
                          type="text"
                          name="expirationDate"
                          id="expirationDate"
                          autoComplete="cc-exp"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="cvc"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CVC
                      </label>
                      <div className="mt-1">
                        <input
                          onBlur={formik.handleBlur}
                          type="text"
                          name="cvc"
                          id="cvc"
                          autoComplete="csc"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order summary */}

              <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>

                <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                  <h3 className="sr-only">Items in your cart</h3>
                  <ul role="list" className="divide-y divide-gray-200">
                    {cartItems.map((product: CartItem) => (
                      <li key={product.id} className="flex py-6 px-4 sm:px-6">
                        <div className="flex-shrink-0">
                          <img
                            src={product.image}
                            //alt={product.imageAlt}
                            className="w-20 rounded-md"
                          />
                        </div>

                        <div className="ml-6 flex flex-1 flex-col">
                          <div className="flex">
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm">
                                <a
                                  href={product.href}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.name}
                                </a>
                              </h4>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.color}
                              </p>
                              {/* <p className="mt-1 text-sm text-gray-500">
                                {product.size}
                              </p> */}
                            </div>

                            <div className="ml-4 flow-root flex-shrink-0">
                              <button
                                onClick={() =>
                                  removeHandler(product as CartItem)
                                }
                                type="button"
                                className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Remove</span>
                                <TrashIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-1 items-end justify-between pt-2">
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {product.price}$
                            </p>

                            <div className="ml-4">
                              <label htmlFor="quantity" className="sr-only">
                                Quantity
                              </label>
                              <span>
                                <p className="mt-1 text-sm font-medium text-gray-900">
                                  {' '}
                                  Total Quantity:
                                  {product.quantity}{' '}
                                </p>
                              </span>
                              {/* <Dropdown
                                onChange={(value) => {
                                  console.log('hello world' + value)
                                }}
                                values={Array.from(
                                  Array(product.quantity),
                                  (_, i) => i + 1
                                )}
                              /> */}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ${subtotal()}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Shipping</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ${deliveryFees}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Taxes</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        $5.52
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                      <dt className="text-base font-medium">Total</dt>
                      <dd className="text-base font-medium text-gray-900">
                        ${totalPrice()}
                      </dd>
                    </div>
                  </dl>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <button
                      onClick={() => formik.handleSubmit()}
                      type="button"
                      className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      Confirm order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </Layout>
  )
}
