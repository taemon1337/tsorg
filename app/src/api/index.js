import axios from 'axios'

let api = {
  get: function () {
    return axios.get('/static/data.json')
  }
}

window.api = api

export default api
