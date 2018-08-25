<template>
  <div id="app">
    <wt-header></wt-header>
    <wt-client></wt-client>
  </div>
</template>

<script>
import Header from './components/Header'
import Client from './components/Client'

export default {
  name: 'app',
  components: {
    'wt-header': Header,
    'wt-client': Client,
  }
}
</script>

<style>
  @import url(./assets/styles/base.css);
</style>
