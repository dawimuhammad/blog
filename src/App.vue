<template>
  <div id="app">
    <div id="header">
      <h1>blog.muhamadhaddawi.com</h1>
    </div>
    <div class="container-fluid">
        <div class="row py-2 justify-content-center">
              <div id="nav">
                <v-spacer></v-spacer>
                <router-link to="/">Home</router-link> |
                <router-link v-if="isToken" to="/about">About</router-link> |
                <router-link v-if="!isToken" to="/login">Login</router-link>
                <router-link v-if="isToken" to="/admin">Administrator</router-link>
                <v-spacer></v-spacer>
                <v-btn flat class="btn-logout" v-if="isToken" v-on:click="logout">Logout</v-btn>
              </div>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Login from '@/views/Login.vue'
// import { mapState, mapActions } from 'vuex'

export default {
  data: function() {
    return {
        userToken : false
    }
  },
  components: {
    Home,
    About,
    Login
  },
  methods: {
      logout: function () {
        this.$router.push('/')
        localStorage.removeItem('token')
      }
  },
  created () {
    if (localStorage.hasOwnProperty('token')) {
      this.userToken = true
      console.log('masih ada token')
    } else {
      this.userToken = false
      console.log('ga ada token')
    }
  }, 
  computed: {
    isToken: function () {
        return this.userToken
    }
  }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#header {
    text-align: center;
    height: 300px;
    background-color: #2c3e50;
    background-image: url("./assets/header-bg.jpg");
    background-size: 100% auto;
}
#header h1 {
    color: azure;
    padding-top: 35px;
    font-family: Arial, Helvetica, sans-serif;
}
#nav {
    padding: 10px;
    text-decoration: none;
    font-size: 17px;
}

#nav a {
  text-decoration: none;
  color:black;
}

#nav a:hover {
  color: #1E88E5;
}

#nav a.router-link-exact-active {
    color: #42b983;
    text-decoration: none;
}
</style>
