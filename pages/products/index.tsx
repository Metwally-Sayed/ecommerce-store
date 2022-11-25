import Layout from 'components/layout'
import Link from 'next/link'
import { Product } from 'types'
import ProductCard from 'components/ProductCard'
export default function Products({
  productsData,
}: {
  productsData: Product[]
}) {
  console.log(productsData)

  return (
    <Layout>
      <div className="mx-auto max-w-2xl bg-white py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div
          style={{ cursor: 'pointer' }}
          className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8"
        >
          {productsData.map((product: Product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/hello')
  const data = await res.json()

  return {
    props: {
      productsData: data,
    },
  }
}
