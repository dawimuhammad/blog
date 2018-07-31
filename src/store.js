import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
    articleById: [],
    commentsByArticle: []
  },
  mutations: {
    emptyCommit () {

    },
    updateArticles (state, payload) {
      return state.articles = payload
    },
    updateArticleById (state, payload) {
      return state.articleById = payload
    },
    updateCommentByArticle (state, payload) {
      return state.commentsByArticle = payload
    }
  },
  actions: {
      getArticles ({ commit }) {
        axios.get('http://localhost:3000/articles')
        .then(function (response) {
            if (response) {
              // console.log(response.data)
              commit('updateArticles', response.data)
            } else {
              console.log(response)
            }
        })
        .catch(function (err) {
            console.log(err)
        })
      },
      getArticleById ({ commit }, payload) {
        let url =`http://localhost:3000/articles/${payload}`
        axios.get(url)
        .then(function (response) {
              // console.log(response.data)
              commit('updateArticleById', response.data)
        })
        .catch(function (err) {
            console.log(err)
        })
      },
      getCommentsByArticle ({ commit }, payload) {
        let url =`http://localhost:3000/articles/comment/${payload}`
        axios.get(url)
        .then(function (response) {
          // console.log(response.data)
          commit('updateCommentByArticle', response.data)
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      postCommentByArticle ({ commit, dispatch }, payload) {
        // console.log(payload)
        let articleId = payload.articleId

        let url =`http://localhost:3000/articles/comment`
        axios({
          method: 'post',
          url: url,
          data: {
            articleId: articleId,
            commenterName: payload.commenterName,
            commentContent: payload.commentContent
          }
        })
        .then(function () {
          dispatch('getCommentsByArticle', articleId)
          commit('emptyCommit')
        })
        .catch(function (err) {
            console.log(err)
        })
      }
  }
})
