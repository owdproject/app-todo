export default {
  id: 'org.owdproject.todo',
  title: 'To-do',
  category: 'productivity',
  icon: 'mdi:format-list-bulleted',
  singleton: false,
  windows: {
    main: {
      component: () => import('./components/Window/WindowTodo.vue'),
      resizable: true,
      maximizable: true,
      size: {
        width: 480,
        height: 320,
      },
    },
  },
  entries: {
    todo: {
      command: 'todo',
    },
  },
  terminal: {
    todo: {
      description: 'Open the To-do app',
    },
  },
  commands: {
    todo: (app: IApplicationController) => {
      const existing = app.getFirstWindowByModel('main')
      if (existing) {
        existing.actions.setActive(true)
        existing.actions.bringToFront()
        return existing
      }

      return app.openWindow('main')
    },
  },
}
