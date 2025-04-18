export default {
    id: "org.owdproject.todo",
    title: "To-do",
    category: "productivity",
    icon: "mdi:format-list-bulleted",
    windows: {
        main: {
            component: () => import('./app/components/Window/WindowTodo.vue'),
            resizable: false,
            size: {
                width: 480,
                height: 320
            },
            position: {
                x: 400,
                y: 240,
                z: 0
            },
        }
    },
    entries: {
        debug: {
            command: "todo"
        }
    },
    commands: {
        todo: (app: IApplicationController) => {
            app.openWindow("main")
        }
    },
}