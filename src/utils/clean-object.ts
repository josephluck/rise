export default function cleanObj<O>(obj: O): Partial<O> {
  return Object.keys(obj)
    .reduce((prev, key) => {
      if (obj[key] !== undefined && obj[key] !== null) {
        return {
          ...prev,
          [key]: obj[key],
        }
      } else {
        return prev
      }
    }, {})
}
