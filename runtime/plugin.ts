import {defineNuxtPlugin} from "nuxt/app"
import {defineDesktopApp} from "@owdproject/core/runtime/utils/utilDesktop"
import configAppTodo from './owd.config'

export default defineNuxtPlugin({
    parallel: true,
    async setup(nuxtApp) {
        nuxtApp.hook('app:created', async () => {
            await defineDesktopApp(configAppTodo)
        })
    }
})
