<!--
<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <router-link to="/" exact>
          <p>Logo</p>
        </router-link>
        <router-link to="/page1">page1</router-link>
        <a class="github" href="https://github.com/vuejs/vue-hackernews-2.0" target="_blank" rel="noopener">
          Built with Vue.js
        </a>
      </nav>
    </header>
    <router-view class="view"></router-view>
  </div>
</template>
-->

<template>
  <div id="container">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

