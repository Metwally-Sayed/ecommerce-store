import React, { useEffect } from 'react'
import { getAllCollections } from 'redux/features/collectionsSlice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { Collection } from 'types'
import axios from 'axios'

const Collections = () => {
  const dispatch = useAppDispatch()
  const getCollections = async () => {
    const collections = await axios.get('http://localhost:3000/api/collections')
    dispatch(getAllCollections(collections.data))
  }
  const collectionData = useAppSelector((state) => state.collection)
  useEffect(() => {
    getCollections()
  }, [])

  return (
    <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 sm:px-6 lg:gap-x-8 lg:px-8">
      {collectionData?.map((collection: Collection) => (
        <div
          key={collection?.name}
          className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-w-4 sm:aspect-h-5 sm:h-auto"
        >
          <div>
            <div
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden rounded-lg"
            >
              <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                <img
                  src={collection?.imageSrc}
                  alt={collection?.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
            </div>
            <div className="absolute inset-0 flex items-end rounded-lg p-6">
              <div>
                <p aria-hidden="true" className="text-sm text-white">
                  Shop the collection
                </p>
                <h3 className="mt-1 font-semibold text-white">
                  <span className="absolute inset-0" />
                  {collection?.name}
                </h3>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Collections
