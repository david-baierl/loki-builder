# Tauri + Solid + Typescript

This template should help get you started developing with Tauri, Solid and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Setup

### Dependencies

The `.devcontainer` binds your local `~/.config` folder into the container.

Ensure you have the following elements installed on your host machine,
otherwise remove the `~/.config`-binding from the `./docker-compose.yml` file.

- [fish](https://fishshell.com/)
- [fisher](https://github.com/jorgebucaran/fisher)
  - [jorgebucaran/nvm.fish](https://github.com/jorgebucaran/nvm.fish)

### Install

```sh
nvm use && pnpm i --forzen-lockfile
```

## start dev environment

```sh
pnpm tauri dev
```
