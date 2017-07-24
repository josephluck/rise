import * as zenscroll from 'zenscroll'

export type Scroll = (id?: string) => Api

export interface Api {
  toElement: (id: string) => void
}

export default function scroll(id?: string): Api {
  const defaultDuration = 500
  const edgeOffset = 30
  const myDiv = document.getElementById(id)
  const myScroller = id ? zenscroll.createScroller(myDiv, defaultDuration, edgeOffset) : zenscroll
  return {
    toElement(id) {
      const elm = document.getElementById(id)
      myScroller.intoView(elm)
    },
  }
}
