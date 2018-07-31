<template>
    <div class="about">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title primary-title>
              <div>
                <div class="headline">About the user</div>
              </div>
            </v-card-title>

            <v-card-media src="https://images.unsplash.com/photo-1518526157563-b1ee37a05129?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=33e100b50e0c9dd2af363f1648cb5fd2&auto=format&fit=crop&w=1950&q=80" height="400" style="border-radius: 5%"></v-card-media>

            <v-card-title primary-title>
              <div style="text-align: left">
                <div class="headline">{{ currentUser.name }}</div>
                <div class="subheading">Created at : {{ currentUser.createdAt }}</div>
                <div class="subheading">Contact : {{ currentUser.email }}</div>
              </div>
            </v-card-title>

          </v-card>
        </v-flex>
      </v-layout>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    created () {
        if (!localStorage.hasOwnProperty('token')) {
            console.log('ada token, ga boleh masuk about page')
            this.$router.push('/')
        } else {
          this.getUserById()
        }
    },
    methods: {
      ...mapActions([
        'getUserById'
      ])
    }, computed: {
      ...mapState([
        'currentUser'
      ])
    }
}
</script>
