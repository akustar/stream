import Vue from 'vue'
import App from './App'
import Toasted from 'vue-toasted';
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

Vue.use(Toasted, {
  theme: 'primary', 
  position: 'bottom-right', 
  duration: 3 * 1000
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
