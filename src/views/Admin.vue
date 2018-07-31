<template> 
    <div class="admin">
        <v-container fluid>
            <v-layout row class="pb-4">
                <v-flex>
                    <v-container style="width: 75%">
                        <h2>POST AN ARTICLE</h2>
                        <v-form class="my-5">
                            <v-text-field v-model="articleTitle" label="Set an encouraging title .." required></v-text-field>
                            
                            <v-textarea outline v-model="articleContent" label="Type your words here .."></v-textarea>

                            <v-text-field v-model="articleImageUrl" label="Article image url here .."></v-text-field>

                            <v-text-field v-model="articleTags" label="Type tags separated by a space .."></v-text-field>

                            <v-btn @click="articleSubmit"> Post </v-btn>
                        </v-form>
                    </v-container>
                </v-flex>
            </v-layout>
            <v-layout row class="pb-4">
                <v-flex xs4 sm4 md4 style="padding: 20px;" v-for="(article, i) in articlesByAuthor" :key="i">
                    <v-card color="article-card">
                        <router-link :to='`/article/${article._id}`'>
                        <v-card-media :src="article.imageUrl" height="300px" class="article-card">
                            <v-container fill-height fluid pa-5>
                            <v-layout fill-height>
                                <v-flex xs12 align-center flexbox>
                                <span class="headline white--text text-xs-center article-title" v-text="article.title"></span>
                                </v-flex>
                            </v-layout>
                            </v-container>
                        </v-card-media>
                        </router-link>

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>build</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>delete</v-icon>
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import swal from 'sweetalert2';

export default {
  name: 'Sidebar',
  data: function () {
      return {
          articleTitle: '',
          articleContent: '',
          articleImageUrl: '',
          articleTags: ''
      }
  },
  methods: {
    ...mapActions([
      'getArticlesByAuthor',
      'postArticle'
    ]),
    articleSubmit: function () {
        if (this.articleTitle === '' || this.articleContent === '' || this.articleImageUrl === '') {
            swal('Oopss ..', 'Fill all the fileld!', 'error')
        } else {
            let payload = {
                title: this.articleTitle,
                content: this.articleContent,
                imageUrl: this.articleImageUrl,
                tags: this.articleTags
            }

            this.postArticle(payload)
        }
    }
    // articleDetails(articleId) {
    //     swal('Test', `ini article id: ${articleId}`, 'success')
    // }
  },
  created () {
    this.getArticlesByAuthor()
  },
  computed: {
    ...mapState([
      'articlesByAuthor'
    ])
  }
}
</script>

<style>
.article-card:hover {
    opacity: 0.8;
    cursor: pointer;
    transition: 0.4s ease;
}

.article-card {
    opacity: 0.9;
}

.article-card a {
    text-decoration: none;
}

.article-title {
    text-decoration: none;
}
</style>
