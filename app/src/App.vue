<template>
  <v-app>
    <app-frame>
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </app-frame>
  </v-app>
</template>

<script>
  import 'vuetify/dist/vuetify.min.css'
  import 'vuetify/dist/vuetify.js'
  import AppFrame from '@/components/AppFrame'

  export default {
    name: 'app',
    data () {
      return {
        drawer: true,
        mini: false,
        right: null
      }
    },
    components: {
      AppFrame
    }
  }
</script>
