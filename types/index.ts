export interface Product {
  productImages: Image[]
  id: string
  name: string
  href: string
  color: string
  highlights?: string[]
  price: number
  availableQty: number
  // images?: Image[]
  image: string
  imageAlt: string
  collectionsId?: string,
  description?: string,
  trending?: string | boolean
  options?: string
}


export interface Collection {
  id: string,
  name: string,
  imageSrc: string,
  imageAlt: string
  // href?: string
}

export interface Image {
  src: string,
  alt: string,
  productId: string,
  id: string,
}

export interface CartItem extends Product {
  quantity: number
}

export type Category = {
  name: string
  featured: Product[]
}
export type AppStateType = {
  products: Product[]
  categories: Category[]
  cart: CartItem[]
}

export type Page = {
  name: string;
  href: string;
}
