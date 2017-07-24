import { Apis } from '../bootstrap'
import { Models } from './'

export interface State {
  currentSection: number
}

export interface Reducers {
  setCurrentSection: Helix.Reducer<Models, State, number>
}

export interface Effects {
  scrollToSection: Helix.Effect<Models, number>
  showNextSection: Helix.Effect0<Models>
}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'home'
export interface Namespace { 'home': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

export function model({
  scroll,
}: Apis): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: {
      currentSection: 0,
    },
    reducers: {
      setCurrentSection(state, currentSection) {
        return { currentSection }
      },
    },
    effects: {
      scrollToSection(state, actions, section) {
        const scroller = scroll('scroller')
        scroller.toElement(`section-${section}`)
        actions.home.setCurrentSection(section)
        return Promise.resolve(state)
      },
      showNextSection(state, actions) {
        const nextSection = (state.home.currentSection + 1) % 3
        actions.home.scrollToSection(nextSection)
        return Promise.resolve(state)
      },
    },
  }
}
