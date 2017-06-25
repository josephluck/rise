const createExpiryMonths = (): Core.SelectOption[] => {
  return Array.from({ length: 12 })
    .map((_, index) => {
      const value = index + 1 < 10
        ? `0${index + 1}`
        : (index + 1).toString()
      return {
        value,
        label: value,
      }
    })
}

const createExpiryYears = (): Core.SelectOption[] => {
  const thisYear = new Date().getFullYear()
  return Array.from({ length: 12 })
    .map((_, index) => {
      const value = ((thisYear + index) % 2000).toString()
      return {
        value,
        label: value,
      }
    })
}

export const expiryMonths = createExpiryMonths()
export const expiryYears = createExpiryYears()
