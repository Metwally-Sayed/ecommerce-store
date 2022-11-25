/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Fragment, useEffect } from 'react'
import {
  addQuantity,
  addToCart,
  removeFromCart,
} from '../redux/features/cartSlice'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'redux/hooks'
import Dropdown from './dropdown'
import { CartItem, Product } from 'types'
import Link from 'next/link'

type props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function ShoppingCartDrawer({ open, setOpen }: props) {
  const cartItems = useAppSelector((state) => state.cart)

  console.log('cartItems from shoppingCart:', { cartItems })

  const dispatch = useDispatch()
  const removeHandler = (item: CartItem) => {
    dispatch(removeFromCart(item))
  }

  const addHandler = (data: CartItem) => {
    dispatch(addToCart(data))
  }

  const subtotal = () => {
    let total = 0
    for (let i = 0; i < cartItems.length; i++) {
      total = +cartItems[i].price * cartItems[i].quantity
    }
    return total
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {' '}
                          Shopping cart{' '}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartItems.map((cartItem, idx) => (
                              <li key={idx} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    //src={cartItem.imageSrc}
                                    //alt={cartItem.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={cartItem.href}>
                                          {cartItem.name}
                                        </a>
                                      </h3>
                                      <p className="ml-4">
                                        ${+cartItem.price * +cartItem.quantity}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {cartItem.color}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      <Dropdown
                                        onChange={(value) => {
                                          const order = {
                                            id: cartItem.id,
                                            name: cartItem.name,
                                            href: cartItem.href,
                                            color: cartItem.color,
                                            price: cartItem.price,
                                            availableQty:
                                              +cartItem.availableQty,
                                            image: cartItem.image,
                                            imageAlt: cartItem.imageAlt,
                                            quantity: +value,
                                          }

                                          addHandler(order)
                                        }}
                                        values={Array.from(
                                          Array(cartItem.availableQty),
                                          (_, i) => i + 1
                                        )}
                                      />
                                    </p>

                                    <div className="flex">
                                      <button
                                        onClick={() => removeHandler(cartItem)}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${subtotal()}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link href={'/checkout'}>
                          <a className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            Checkout
                          </a>
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
