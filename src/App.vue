<template>
  <div id="app">
    <div id="header">
      <h1>blog.muhamadhaddawi.com</h1>
    </div>
    <div class="container-fluid">
        <div class="row py-2 justify-content-center">
              <div id="nav">
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link>
              </div>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Home from '@/views/Home.vue'

export default {
  components: {
    Home
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

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
