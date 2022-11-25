import Layout from 'components/layout'
import ProductCard from 'components/ProductCard'
import React from 'react'
import { Product } from 'types'

type Props = {}

const Trending = ({ productsData }: { productsData: Product[] }) => {
  const trendingData = productsData.filter((product) => {
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
  const res = await fetch('http://localhost:3000/api/hello')
  const data = await res.json()

  return {
    props: {
      productsData: data,
    },
  }
}
