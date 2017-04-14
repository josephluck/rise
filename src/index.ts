import helix from 'helix-react'
import log from 'helix-react/lib/log'
import model from './model'
import routes from './pages'
import bootstrap from './bootstrap'

let mount = document.createElement('div')
document.body.appendChild(mount)

bootstrap().then(apis => {
  helix({
    model: model(apis),
    routes,
    mount,
    plugins: [log],
  })
})
