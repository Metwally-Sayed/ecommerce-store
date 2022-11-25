import Link from 'next/link'
import React from 'react'
import { Product } from 'types'

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link key={product.id} href={`/products/${product.id}`}>
      <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
          <img
            width="650"
            height="975"
            src={product.image}
            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
          />
        </div>
        <div className="flex flex-1 flex-col space-y-2 p-4">
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
          <div className="flex flex-1 flex-col justify-end">
            <p className="text-sm italic text-gray-500">{product?.options}</p>
            <p className="text-base font-medium text-gray-900">
              ${product.price}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
