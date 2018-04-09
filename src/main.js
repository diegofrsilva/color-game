import Vue from 'vue'
import Home from './Home.vue'
import Board from './Board.vue'
import Ranking from './Ranking.vue'

/**
 * Routes for the application
 */
const routes = {
  '/': Home,
  '/game': Board,
  '/ranking': Ranking
}

/**
 * Router logic and app initialization
 */
new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute] || NotFound
    }
  },
  render(h) {
    return h(this.ViewComponent)
  }
});