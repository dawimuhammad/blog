<template>
    <div id="sidebar">
        <h3>Articles</h3>
        <ul class="nav flex-column">
            <li class="nav-item" v-for="(article, index) in articles" :key="index">
                {{ article.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'Sidebar',
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

<style>
#sidebar ul {
    list-style: none;
}

#sidebar li {
    padding-top: 7px;
    text-align: left;
}
</style>
