<p align="center">
  <img width="160" height="160" src="https://avatars.githubusercontent.com/u/65117737?s=160&v=4" />
</p>
<h1 align="center">To-do</h1>
<h3 align="center">
  To-do App for your Open Web Desktop client.
</h3>

## Overview

This app for Open Web Desktop provides a simple and effective to-do list manager.

## Installation

1.  Navigate to your client folder in your terminal:

    ```bash
    cd owd-client
    ```

2.  Install the desktop module using npm or yarn:

    ```bash
    npm install @owdproject/app-todo
    ```

3.  Register the application in your desktop configuration file:

    ```typescript
    // owd.config.ts
    export default defineDesktopConfig({
        apps: [
            '@owdproject/app-todo',
        ]
    })
    ```

## License

The application is released under the [MIT License](LICENSE).
