<template>
  <v-layout row>
    <v-flex xs8>
      <span v-show='loading' class='fa fa-4x fa-spinner fa-spin pull-right'></span>
      <div v-if='current'>
        <div v-if="readme" v-html="readme"></div>
        <div v-else>
          <pre>{{ current }}</pre>
        </div>
      </div>
      <div v-else>
        Click on a repo on the right
      </div>
    </v-flex>
    <v-flex xs4>
      <v-card>
        <v-toolbar class="white--text indigo" light>
          <v-toolbar-title>My Github Repositories</v-toolbar-title>
          <v-text-field v-model='repoFilter' prepend-icon="search" label="Search..." hide-details single-line light></v-text-field>
        </v-toolbar>
        <v-list>
          <v-list-item v-for="(repo, index) in filterBy(repos, repoFilter)" :key="repo.id" @click='activate(repo)'>
            <v-list-tile avatar>
              <v-list-tile-action>
                <v-icon class="pink--text">star</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="repo.name"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-avatar v-if="repo.owner">
                <img v-bind:src="repo.owner.avatar_url"/>
              </v-list-tile-avatar>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { InfoTypes } from '@/store/mutation-types'

  export default {
    name: 'GithubPage',
    data () {
      return {
        current: null,
        loading: false,
        repoFilter: ''
      }
    },
    computed: {
      ...mapGetters({
        repos: InfoTypes.repos,
        readme: InfoTypes.readme
      })
    },
    methods: {
      activate (repo) {
        this.current = repo
        this.loadRepo(repo)
      },
      loadRepo (repo) {
        this.loading = true
        this.$store.dispatch(InfoTypes.readme, { owner: repo.owner.login, repo: repo.name })
      }
    },
    watch: {
      readme () {
        if (this.readme) {
          this.loading = false
        }
      }
    },
    created () {
      this.$store.dispatch(InfoTypes.repos)
    }
  }
</script>
