import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'
import jwt from 'jsonwebtoken'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
    articlesByAuthor: [],
    articleById: [],
    commentsByArticle: [],
    currentUser: []
  },
  mutations: {
    emptyCommit () {

    },
    updateCurrentUser (state, payload) {
      return state.currentUser = payload
    },
    updateArticles (state, payload) {
      return state.articles = payload
    },
    updateArticlesByAuthor (state, payload) {
      return state.articlesByAuthor = payload
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
      getArticlesByAuthor ({ commit }) {
        let decodedToken = jwt.decode(localStorage.getItem('token'))
        
        let url = `http://localhost:3000/articles/author/${decodedToken._id}`
        
        axios.get(url)
        .then(function (response) {
          commit('updateArticlesByAuthor', response.data)
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
      },
      postArticle ({commit, dispatch}, payload) {
          console.log(payload)
          commit('emptyCommit')

          let authorId = (jwt.decode(localStorage.getItem('token')))._id

          console.log(authorId)

          let url =`http://localhost:3000/articles/`
          axios({
            method: 'post',
            url: url,
            data: {
              author: authorId,
              title: payload.title, 
              content: payload.title, 
              imageUrl: payload.imageUrl, 
              tags: payload.tags
            }
          })
          .then(function () {
            dispatch('getArticlesByAuthor')
            commit('emptyCommit')
          })
          .catch(function (err) {
              console.log(err)
          })
      },
      registerAccount ({ commit }, payload) {
        // console.log(payload)
        let url =`http://localhost:3000/users/register`
        axios({
          method: 'post',
          url: url,
          data: {
              name: payload.name,
              email: payload.email,
              password: payload.password
          }
        })
        .then(function (response) {
            console.log(response)
            swal('Yeah ..', 'User has been registered!', 'success')
        })
        .catch(function (err) {
            console.log(err)
            swal('Opps ..', `Something went wrong! Message: ${err.message}`, 'error')
        })

        commit('emptyCommit')
      },
      loginAccount ({ commit }, payload) {
        let url =`http://localhost:3000/users/login`
        
        axios({
          method: 'post',
          url: url,
          data: {
              email: payload.email,
              password: payload.password
          }
        })
        .then(function (response) {
          // console.log(response.data.token)
          localStorage.setItem('token', response.data.token)
          swal('Yeah ..', 'Login Success!', 'success')
        })
        .catch(function (err) {
            console.log(err)
            swal('Ooops ..', `Login Failed! Error: ${err.message}`, 'error')
        })

          commit('emptyCommit')
      },
      getUserById ({ commit }) {
          let authorId = (jwt.decode(localStorage.getItem('token')))._id
          
          let url = `http://localhost:3000/users/findUser/${authorId}`
          
          axios({
            method: 'get',
            url: url
          })
          .then(function (response) {
            console.log(response.data)
            commit('updateCurrentUser', response.data)
          })
          .catch(function (err) {
              console.log(err)
          })
      },
      deleteArticleById ({ commit, dispatch }, payload) {
        console.log('delete article')

        let articleId = payload

        let url = `http://localhost:3000/articles`
        
        axios({
          method: 'delete',
          url: url,
          data : {
            id: articleId
          }
        })
        .then(function (response) {
          console.log(response.data)
          dispatch('getArticlesByAuthor')
          commit('emptyCommit')
        })
        .catch(function (err) {
            console.log(err)
        })
      }
  }
})
