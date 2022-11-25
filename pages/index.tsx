import Layout from 'components/layout'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { Product } from 'types'
import CollectionPage from '../components/Collections'
import { extractSheets } from 'spreadsheet-to-json'
import { Image, Collection } from 'types'
const perks = [
  {
    name: 'Free returns',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
    description:
      'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
  },
  {
    name: 'Same day delivery',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
    description:
      'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
  },
  {
    name: 'All year discount',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
    description:
      'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
  },
  {
    name: 'For the planet',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
    description:
      'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.',
  },
]

const Home = ({ products }: { products: Product[] }) => {
  // const products = useAppSelector((state) => state.products)

  const dispatch = useDispatch()

  return (
    <div className="">
      <Layout>
        <main>
          {/* Hero section */}
          <div className="relative">
            {/* Background image and overlap */}
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden sm:flex sm:flex-col"
            >
              <div className="relative w-full flex-1 bg-gray-800">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="absolute inset-0 bg-gray-900 opacity-50" />
              </div>
              <div className="h-32 w-full bg-white md:h-40 lg:h-48" />
            </div>

            <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
              {/* Background image and overlap */}
              <div
                aria-hidden="true"
                className="absolute inset-0 flex flex-col sm:hidden"
              >
                <div className="relative w-full flex-1 bg-gray-800">
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gray-900 opacity-50" />
                </div>
                <div className="h-48 w-full bg-white" />
              </div>
              <div className="relative py-32">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                  Mid-Season Sale
                </h1>
                <div className="mt-4 sm:mt-6">
                  <Link
                    className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 font-medium text-white hover:bg-indigo-700"
                    href="./products"
                  >
                    Shop Collection
                  </Link>
                </div>
              </div>
            </div>

            <section
              aria-labelledby="collection-heading"
              className="relative -mt-96 sm:mt-0"
            >
              <h2 id="collection-heading" className="sr-only">
                Collections
              </h2>
              <div>
                <CollectionPage />
              </div>
            </section>
          </div>
          <div>
            <section aria-labelledby="trending-heading">
              <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
                <div className="md:flex md:items-center md:justify-between">
                  <h2
                    id="favorites-heading"
                    className="text-2xl font-extrabold tracking-tight text-gray-900"
                  >
                    Trending Products
                  </h2>
                  <Link
                    href={'./products/trending'}
                    className="hidden text-sm font-medium text-indigo-500 hover:text-indigo-500 md:block"
                  >
                    Shop the collection<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
                  {products.map((product: Product) =>
                    product.trending === true ? (
                      <div key={product.id} className="group relative">
                        <div className="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
                          <img
                            src={product.image}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">
                          <Link href={`/products/${product.id}`}>
                            <span className="absolute inset-0" />
                            {product.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          ${product.price}
                        </p>
                      </div>
                    ) : (
                      ''
                    )
                  )}
                  <div className="mt-8 text-sm md:hidden">
                    <a className="font-medium text-indigo-600 hover:text-indigo-500">
                      Shop the collection<span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section
              aria-labelledby="perks-heading"
              className="border-t border-gray-200 bg-gray-50"
            >
              <h2 id="perks-heading" className="sr-only">
                Our perks
              </h2>

              <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
                <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
                  {perks.map((perk) => (
                    <div
                      key={perk.name}
                      className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                    >
                      <div className="md:flex-shrink-0">
                        <div className="flow-root">
                          <img
                            className="-my-1 mx-auto h-24 w-auto"
                            src={perk.imageUrl}
                          />
                        </div>
                      </div>
                      <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                          {perk.name}
                        </h3>
                        <p className="mt-3 text-sm text-gray-500">
                          {perk.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </Layout>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  // const res = await axios.get('http://localhost:3000/api/hello')
  // const data = await res.data
  let productData
  await extractSheets(
    {
      // my google spreadhsheet key
      spreadsheetKey: '1tBKcuCiJc5A7i3jWXKDIQYsR1zJFYPG4tZT-QTioWCk',
      // my google oauth credentials or API_KEY
      credentials: require('../product-360416-2ba1dc1ac4a2.json'),
      // optional: names of the sheets i wanted to extract
      sheetsToExtract: ['Products', 'images', 'collections'],
    },
    function (
      err: any,
      data: { Products: Product[]; images: Image[]; collections: Collection[] }
    ) {
      let productInfo = data.Products.map((product: Product) => {
        const images = data.images.filter(
          (image: Image) => image.productId === product.id
        )
        const collections = data.collections.find(
          (collection: Collection) => collection.id === product.collectionsId
        )
        return {
          ...product,
          trending: product.trending === 'TRUE' ? true : false,
          images,
          collections,
        }
      })
      productData = productInfo
    }
  )

  return {
    props: {
      products: productData,
    },
  }
}
