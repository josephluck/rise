import * as sheetify from 'sheetify'
const clx1 = sheetify('./styles/styles.css')
const clx2 = sheetify('./styles/index.css')

import helix from 'helix-react'
import log from 'helix-react/lib/log'
import model from './model'
import routes from './pages'

let mount = document.createElement('div')
mount.className = `${clx1} ${clx2}`
document.body.appendChild(mount)

helix({
  model: model(),
  routes,
  mount,
  plugins: [log],
})
