// import { Apis } from '../bootstrap'
// import { Models } from './'

// export interface State {
//   user: null | any
// }

// export interface Reducers { }

// export interface Effects {
//   create: Helix.Effect0<Models>
// }

// export type Actions = Helix.Actions<Reducers, Effects>

// export const namespace: keyof Namespace = 'user'
// export interface Namespace { 'user': ModelApi }

// export type ModelApi = Helix.ModelApi<State, Actions>

// export function model({
//   shop,
// }: Apis): Helix.ModelImpl<Models, State, Reducers, Effects> {
//   return {
//     state: {
//       user: null,
//     },
//     reducers: {},
//     effects: {
//       create(state, actions) {
//         const customer = {
//           first_name: 'Joseph',
//           last_name: 'Luck',
//           email: Date.now().toString + 'joseph@luck.com',
//         }
//         return new Promise(resolve => {
//           console.log(shop)
//           shop.Customer.Create(customer, resolve)
//         })
//           .then(() => state)
//       },
//     },
//   }
// }
