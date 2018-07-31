<template>
  <div class="home">
    <v-container fluid grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
            <Articles></Articles>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Articles from '@/views/Articles.vue'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    Articles
  },
  methods: {
    ...mapActions([
      'getArticles'
    ])
  },
  created () {
    this.getArticles()
  },
  computed: {
    ...mapState([
      'articles'
    ])
  }
}
</script>
