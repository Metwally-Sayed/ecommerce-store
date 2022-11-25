import Layout from 'components/layout'
import ProductCard from 'components/ProductCard'
import React from 'react'
import { Image, Collection, Product } from 'types'
import { extractSheets } from 'spreadsheet-to-json'

const Trending = ({ products }: { products: Product[] }) => {
  const trendingData = products.filter((product) => {
    return product.trending === true
  })
  console.log(trendingData)

  return (
    <Layout>
      <div className="mx-auto max-w-2xl bg-white py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div
          style={{ cursor: 'pointer' }}
          className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8"
        >
          {trendingData.map((product: Product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Trending

export const getStaticProps = async () => {
  // const res = await axios.get('http://localhost:3000/api/hello')
  // const data = await res.data
  let productData
  await extractSheets(
    {
      // my google spreadhsheet key
      spreadsheetKey: '1tBKcuCiJc5A7i3jWXKDIQYsR1zJFYPG4tZT-QTioWCk',
      // my google oauth credentials or API_KEY
      credentials: require('../../product-360416-2ba1dc1ac4a2.json'),
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
