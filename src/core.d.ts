declare namespace Core {
  type Errors<F> = Record<keyof F, string[]>

  type SetFields<F> = (any) => any
}