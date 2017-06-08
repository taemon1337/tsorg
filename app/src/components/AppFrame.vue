<template>
  <div>
    <v-navigation-drawer persistent light :mini-variant.sync="mini" v-model="drawer">
      <v-list class="pa-0">
        <v-list-item>
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img :src="user.avatarUrl" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ user.name }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-item v-for="(item,index) in navbar.items" key="index">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon v-if='item.fa' :class='item.fa'></v-icon>
              <v-icon v-if='item.icon'>{{ item.icon }}</v-icon>
              <v-layout justify-space-around style='margin-right:10px;'>
                <v-icon v-if='item.fas' v-for='fa in item.fas' :key='fa' :class='fa'></v-icon>  
              </v-layout>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <router-link tag='span' :to='item.route'>{{ item.title }}</router-link>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="indigo darken-4" light>
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ navbar.title | uppercase }}</v-toolbar-title>
    </v-toolbar>
    <slot></slot>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { InfoTypes } from '@/store/mutation-types'
  
  export default {
    name: 'AppFrame',
    data () {
      return {
        drawer: true,
        mini: false,
        right: null
      }
    },
    computed: {
      ...mapGetters({
        user: InfoTypes.user,
        navbar: InfoTypes.navbar
      })
    }
  }
</script>
