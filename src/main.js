import Vue from 'vue'
import App from './App'
import 'material-design-icons/iconfont/material-icons.css'

Vue.config.productionTip = false

const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

Vue.mixin({
  methods: {
    setProps (props) {
      if (isObject(props)) {
        Object.keys(props).forEach(key => this.$emit(`update:${key}`, props[key]))
      }
    }
  }
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
