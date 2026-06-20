<p align="center">
  <img width="160" height="160" src="https://avatars.githubusercontent.com/u/65117737?s=160&v=4" />
</p>
<h1 align="center">To-do</h1>
<h3 align="center">
  To-do App for Open Web Desktop.
</h3>

<br />

## Overview

This app for Open Web Desktop provides a simple and effective to-do list manager.

[Demo](https://owdproject.github.io/app-todo/) · [Documentation](https://owdproject.github.io/docs/) · [Support](https://github.com/sponsors/owdproject)

## Installation

```bash
pnpm desktop add app-todo
```

## Configuration

Add the app to your `desktop.config.ts`:

```ts
export default defineDesktopConfig({
  apps: [
    '@owdproject/app-todo'
  ]
})
```

## Usage

#### Available commands

```
todo
todo <text>
```

## License

This application is released under the [MIT License](LICENSE).
