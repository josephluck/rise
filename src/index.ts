import helix from 'helix-react'
import log from 'helix-react/lib/log'
import model from './model'
import routes from './pages'
import bootstrap from './bootstrap'
import loadingApp from './components/loading'

let mount = document.createElement('div')
document.body.appendChild(mount)

const loading = loadingApp()

const apis = bootstrap(loading)

helix({
  model: model(apis),
  routes,
  mount,
  plugins: [log],
})
