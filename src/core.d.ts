declare namespace Core {
  type Errors<F> = Record<keyof F, string[]>

  type SetFields<F> = (any) => any

  interface Product {
    price: number
    images: string[]
    id: string
    title: string
    description: string
  }

  interface CartEntry extends Product {
    quantity: number
  }

  interface Cart {
    items: CartEntry[]
  }
}