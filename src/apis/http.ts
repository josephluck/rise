import axios from 'axios'

export default function (loading) {
  const hooks = {
    onRequest: (conf) => {
      loading.setLoading(conf.url || '')
    },
    onResponse: (response) => {
      loading.unsetLoading(response.config.url || '')
    },
    onError: (err) => {
      loading.unsetLoading(err.config.url || '')
    },
  }

  const http = axios.create()

  http.interceptors.request.use(conf => {
    if (hooks.onRequest) {
      hooks.onRequest(conf)
    }
    return conf
  })

  http.interceptors.response.use(response => {
    if (hooks.onResponse) {
      hooks.onResponse(response)
    }
    return response
  }, (err) => {
    if (hooks.onError) {
      hooks.onError(err)
    }
    return Promise.reject(err)
  })
  return http
}
