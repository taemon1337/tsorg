import { InfoTypes } from '../mutation-types'
import Github from 'github-api'
import api from '@/api'
import axios from 'axios'
import showdown from 'showdown'

let converter = new showdown.Converter()

const github = new Github({})
const taemon = github.getUser('taemon1337')

window.github = github
window.taemon = taemon

// init state
const state = {
  readme: '',
  user: {},
  navbar: {},
  github: {},
  whoami: [],
  repos: []
}

// getters
const getters = {
  [InfoTypes.all]: state => state,
  [InfoTypes.user]: state => state.user,
  [InfoTypes.navbar]: state => state.navbar,
  [InfoTypes.github]: state => state.github,
  [InfoTypes.repos]: state => state.repos,
  [InfoTypes.whoami]: state => state.whoami,
  [InfoTypes.readme]: state => state.readme
}

// actions
const actions = {
  [InfoTypes.init] ({ commit }) {
    api.get().then(function (resp) {
      commit(InfoTypes.init, resp.data.data)
    })
  },
  [InfoTypes.add] ({ commit }, opts) {
    commit(InfoTypes.add, opts)
  },
  [InfoTypes.repos] ({ commit }, opts) {
    taemon.listRepos().then(function (resp) {
      commit(InfoTypes.repos, { repos: resp.data })
    }).catch(function (err) {
      if (err.response.status === 403) {
        alert('Github rate limits public requests and looks like you hit the limit, please wait!')
      } else {
        console.warn('Error loading repos', err)
      }
    })
  },
  [InfoTypes.readme] ({ commit }, { owner, repo }) {
    // https://api.github.com/repos/taemon1337/api-boilerplate/readme
    axios.get('https://api.github.com/repos/' + owner + '/' + repo + '/readme').then(function (resp) {
      let markup = atob(resp.data.content)
      axios.post('/markup', markup).then(function (resp) {
        commit(InfoTypes.readme, resp.data)
      }).catch(function (err) {
        console.log('Error with markup service, trying js converter...', err)
        commit(InfoTypes.readme, converter.makeHtml(markup))
      })
    }).catch(function (err) {
      if (err.response.status === 403) {
        alert('Github rate limits public requests and looks like you hit the limit, please wait!')
      } else if (err.response.status === 404) {
        alert('Could not find a ReadMe for this repo: ' + repo)
      } else {
        console.warn('Cannot find readme for repo ', repo, err)
      }
    })
  }
}

// mutations
const mutations = {
  [InfoTypes.init] (state, data) {
    if (data.navbar) { state.navbar = data.navbar }
    if (data.user) { state.user = data.user }
    if (data.github) { state.github = data.github }
    if (data.whoami) { state.whoami = data.whoami }
    if (data.readme) { state.readme = data.readme }
  },
  [InfoTypes.readme] (state, readme) {
    state.readme = readme
  },
  [InfoTypes.add] (state, opts) {
    state = Object.assign(state, opts)
  },
  [InfoTypes.repos] (state, { repos }) {
    state.repos = repos
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
