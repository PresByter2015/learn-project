import http from '../http/index'

export default class Model {
  constructor(url) {
    this.url = url
    Object.assign(this, http)
  }

  find(id, condition) {
    if (id) {
      let url = `${this.url}/${id}`

      if (typeof condition === 'object' && Object.keys(condition).length > 0) {
        let query = buildParams(condition)
        url = `${url}?${query}`
      }
      return http.get(url)
    } else {
      return http.get(`${this.url}`)
    }
  }

  findBy(condition, url = '') {
    url = url || this.url

    let query = ''
    if (typeof condition === 'string') {
      query = condition
    } else {
      let params = []
      for (let key in condition) {
        params.push(`${key}=${condition[key]}`)
      }
      query = params.join('&')
    }
    return http.get(`${url}?${query}`)
  }

  create(data) {
    data = this.processCreateData(data)

    return http.post(this.url, data)
  }

  update(id, data) {
    let url = `${this.url}/${id}`
    data = this.processUpdateData(data)

    return http.put(url, data)
  }

  destroy(id) {
    let url = `${this.url}/${id}`
    return http.del(url)
  }

  processCreateData(data) {
    return data
  }

  processUpdateData(data) {
    return data
  }

  get(url) {
    return http.get(url)
  }

  del(url) {
    return http.del(url)
  }

  put(url, data) {
    return http.put(url, data)
  }

  post(url, data) {
    return http.post(url, data)
  }
}

function buildParams(obj) {
  let params = []
  for (let key in obj) {
    params.push(`${key}=${obj[key]}`)
  }
  return params.join('&')
}
