const validate = require('validate.js')

export interface State<F extends any> {
  valid: boolean
  fields: F
  errors: Errors<F>
  formShowing: string | null
  submitted: boolean
}

export type Errors<F> = Record<keyof F, string[]>
export type Constraints<F> = (fields: F) => Record<keyof F, any>
export type FormConstraints<F> = Constraints<F>

export interface Reducers<F extends any> {
  resetForm: Helix.ScopedReducer0<State<F>>
  setFields: Helix.ScopedReducer<State<F>, Partial<Record<keyof F, any>>>
  validateEntireForm: Helix.ScopedReducer0<State<F>>
  setValidity: Helix.ScopedReducer0<State<F>>
  toggleFormShowing: Helix.ScopedReducer<State<F>, any>
  setSubmitted: Helix.ScopedReducer<State<F>, boolean>
}

export interface Effects<F extends any> {
  validateOnSubmit: Helix.ScopedEffect0<State<F>, Actions<F>>
}

export type Actions<F extends any> = Helix.Actions<Reducers<F>, Effects<F>>

interface Opts<F> {
  constraints: FormConstraints<F>
  defaultForm: () => F
}

export function model<F extends any>({
  constraints,
  defaultForm,
}: Opts<F>): Helix.ScopedModel<State<F>, Reducers<F>, Effects<F>> {
  const fields = defaultForm()
  const emptyErrors = makeDefaultErrors<F>(constraints(fields))

  function initialState() {
    return {
      fields,
      errors: emptyErrors,
      valid: false,
      formShowing: null,
      submitted: false,
    }
  }

  return {
    scoped: true,
    state: initialState(),
    reducers: {
      resetForm() {
        return initialState()
      },
      setFields(state, newFields) {
        const fields = Object.assign({}, state.fields, newFields)
        const errors = getErrorsForFields(newFields, constraints(fields))
        return {
          fields,
          errors: Object.assign({}, state.errors, errors),
        }
      },
      validateEntireForm(state) {
        const errors = validate(state.fields, constraints(state.fields))
        return { errors: errors || emptyErrors, valid: !errors }
      },
      setValidity(state) {
        const errors = validate(state.fields, constraints(state.fields))
        return { valid: !errors }
      },
      toggleFormShowing(state, { name }) {
        return name === state.formShowing ? { formShowing: null } : { formShowing: name }
      },
      setSubmitted: (state, submitted) => ({ submitted }),
    },
    effects: {
      validateOnSubmit(_state, actions) {
        actions.setSubmitted(true)
        const state = actions.validateEntireForm()
        if (!state.valid) {
          return Promise.reject<any>({
            type: 'validation_error',
            message: 'Invalid input',
            errors: state.errors,
          })
        } else {
          return Promise.resolve(state)
        }
      },
    },
  }
}

export function makeDefaultErrors<F>(constraints: Record<keyof F, any>): Errors<F> {
  const errors = Object.keys(constraints).reduce((prev, curr) => {
    return {
      ...prev,
      [curr]: [],
    }
  }, {})
  return errors as Errors<F>
}

function getErrorsForFields<F>(fields: F, constraints: Record<keyof F, any>): Record<keyof F, any> {
  const keys = Object.keys(fields)
  const initialErrors = keys.reduce((prev, key) => ({ ...prev, [key]: [] }), {})

  const filteredConstraints = keys.reduce((prev, key) => {
    return constraints[key] ? { ...prev, [key]: constraints[key] } : prev
  }, {})
  const errors = validate(fields, filteredConstraints) || {}
  return { ...initialErrors, ...errors }
}
