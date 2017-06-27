import shop from './shop'

export function getReturnType<R>(_f: (...args: any[]) => R): R {
  return null!
}

const apiType = getReturnType(shop)
export type Shop = typeof apiType
