<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 sm6 md8 lg9>
        <v-layout row>
          <v-flex xs12 sm6 md4 lg4 v-for='(card, i) in linkCards' key='i'>
            <v-card :class='randColor()'>
              <v-card-title>
                <div right>
                  <v-icon v-if='card.icon' large>{{ card.icon }}</v-icon>
                  <span v-if='card.fa' :class='card.fa'></span>
                  <span v-if='card.fas' v-for='fa in card.fas'>
                    <span :class='fa'></span>
                  </span>
                </div>
                {{ card.title }}
              </v-card-title>
              <v-card-text>{{ card.text }}</v-card-text>
              <v-card-row actions>
                <v-btn v-for='(action, ii) in card.actions' key='ii'>
                  <router-link tag='span' :to='action.route'>
                    <v-icon v-if='action.icon'>{{ action.icon }}</v-icon>
                    <span v-if='action.fa' :class='action.fa'></span>
                    <span v-if='action.fas' v-for='fa in fas'>
                      <span :class='fa'></span>
                    </span>
                    <span v-if='action.text'>{{ action.text }}</span>
                  </router-link>
                </v-btn>
              </v-card-row>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3>
        <v-carousel style='height:300px;'>
          <v-carousel-item v-for='(card, index) in whoami' key='index' v-bind:src="card.image"></v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { InfoTypes } from '@/store/mutation-types'

  export default {
    name: 'AboutPage',
    data () {
      return {
        colors: ['blue', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'blue-grey', 'grey'],
        shades: ['lighten', 'darken', 'accent'],
        numbers: ['1', '2', '3', '4']
      }
    },
    computed: {
      ...mapGetters({
        whoami: InfoTypes.whoami,
        navbar: InfoTypes.navbar
      }),
      linkCards () {
        if (this.navbar && this.navbar.items) {
          return this.navbar.items.filter(function (item) { return item.me })
        } else {
          return []
        }
      }
    },
    methods: {
      randItem (items) {
        return items[Math.floor(Math.random() * items.length)]
      },
      randColor () {
        let color = this.randItem(this.colors)
        let shade = this.randItem(this.shades)
        let number = this.randItem(this.numbers)
        let text = shade === 'lighten' || shade === 'accent' ? ' dark--text' : ' white--text'
        return color + ' ' + shade + '-' + number + text + ' mt-3'
      }
    }
  }
</script>
