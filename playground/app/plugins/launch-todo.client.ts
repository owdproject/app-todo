import { nextTick } from 'vue'
import { defineNuxtPlugin } from 'nuxt/app'
import { useApplicationManager } from '@owdproject/core/runtime/composables/useApplicationManager'

// ponytail: self-contained helper to avoid depending on unpublished core updates
async function autoStartPlaygroundApp(nuxtApp: any, appId: string, entry: string, windowModel = 'main') {
  const applicationManager = useApplicationManager()

  async function tryLaunch(): Promise<boolean> {
    if (!applicationManager.isAppDefined(appId)) return false
    const app = applicationManager.getAppById(appId)!
    if (app.storeWindows.$persistedState) {
      await app.storeWindows.$persistedState.isReady()
    }
    app.closeAllWindows()
    app.storeWindows.windows = {}
    await applicationManager.execAppCommand(appId, entry)
    const window = app.getFirstWindowByModel(windowModel)
    if (window) {
      window.actions.setActive(true)
      window.actions.bringToFront()
    }
    return true
  }

  nuxtApp.hook('app:mounted', async () => {
    await nextTick()
    for (let attempt = 0; attempt < 80; attempt++) {
      if (await tryLaunch()) return
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
  })
}

export default defineNuxtPlugin({
  name: 'app-todo-playground-launch',
  dependsOn: ['desktop-app-todo-register'],
  setup(nuxtApp) {
    autoStartPlaygroundApp(nuxtApp, 'org.owdproject.todo', 'todo', 'main')
  },
})
