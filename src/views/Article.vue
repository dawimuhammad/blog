<template>
  <div class="article">
    <v-container fluid class="article-id-fluid">
        <v-layout row>
          <!-- <v-flex xs12 sm6 offset-sm3 style="border: 1px solid green"> -->
          <v-flex xs12 sm6 offset-sm3>
            <v-card-title primary-title>
              <div style="text-align: left">
                <div class="py-2 display-2" style="text-align: center">{{ articleById.title }}</div>
                <div class="py-2 title font-weight-light">{{ articleById.author.name }}</div>
                <div class="py-2 subheading font-weight-light">{{ articleById.time }}</div>
              </div>
            </v-card-title>
            
            <v-card flat>
              <v-card-media :src="articleById.imageUrl" height="500px"></v-card-media>

            <v-card-title>
              <div>
                <p class="subheading font-weight-light article-content">{{ articleById.content }}</p>
              </div>
            </v-card-title>

            </v-card>
          </v-flex>
        </v-layout>
        <v-layout py-3 row>
          <v-flex xs12 sm6 offset-sm3>
            <div>
              <h2 class="font-weight-light pb-5">COMMENTS</h2>
            </div>
            <!-- form -->
            <v-card class="mb-5">
              <v-layout row wrap>
                <v-flex md6>
                  <v-text-field outline label="Name" v-model="commenterName"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex md12>
                  <v-textarea v-model="commentContent" box label="Type your comment here .." auto-grow ></v-textarea>
                </v-flex>
              </v-layout>
              <v-card-actions class="pb-4">
                <v-spacer></v-spacer>
                <v-btn outline color="light-blue darken-1" v-on:click="postComment">Post Comment</v-btn>
              </v-card-actions>
            </v-card>
            <!-- comments goes here -->
            <v-card>
                <v-card-title flat v-for="(comment, i) in commentsByArticle" :key="i">
                <div style="text-align: left">
                  <div class="title font-weight-regular text">{{ comment.commenterName }}</div>
                  <div class="body-1 font-weight-thin">{{ comment.time }}</div>
                  <div class="subheading font-weight-light">{{ comment.commentContent }}</div>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
import swal from 'sweetalert2'

export default {
  data: function () {
    return {
      commenterName : '',
      commentContent : ''
    }
  },
  methods: {
      ...mapActions([
        'getArticleById',
        'getCommentsByArticle',
        'postCommentByArticle'
      ]),
      postComment() {
        let payload = {
          articleId: this.$route.params.id,
          commenterName: this.commenterName,
          commentContent: this.commentContent
        }

        this.postCommentByArticle(payload)

        this.commenterName = ''
        this.commentContent = ''

        swal('Voila ..', 'Your comment is now live!', 'success')
      }

  },
  computed: {
      ...mapState([
        'articleById',
        'commentsByArticle'
      ])
  },
  created: function () {
      this.getArticleById(`${this.$route.params.id}`)
      this.getCommentsByArticle(`${this.$route.params.id}`)
  }
}
</script>

<style>
.article-content {
  text-align: justify;
  text-justify: inter-word;
}  
</style>
