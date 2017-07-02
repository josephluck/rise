import shop from './shop'
import blog from './blog'

export function getReturnType<R>(_f: (...args: any[]) => R): R {
  return null!
}

const shopApi = getReturnType(shop)
export type Shop = typeof shopApi

const blogApi = getReturnType(blog)
export type Blog = typeof blogApi
