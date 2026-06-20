import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin({
  name: 'app-todo-playground-launch',
  dependsOn: ['desktop-app-todo-register'],
  setup(nuxtApp) {
    autoStartPlaygroundApps(nuxtApp, [
      { id: 'org.owdproject.todo', entry: 'todo', windowModel: 'main' }
    ])
  },
})
