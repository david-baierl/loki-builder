# Loki Builder

A character builder based on the 2024 Dungeons and Dragons rules

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Setup

### Dependencies

#### with devcontainer

The `.devcontainer` binds your local `~/.config` folder into the container.

Ensure you have the following elements installed on your host machine,
otherwise remove the `~/.config`-binding from the `./docker-compose.yml` file and use the container defaults.

- [fish](https://fishshell.com/)
- [fisher](https://github.com/jorgebucaran/fisher)
  - [jorgebucaran/nvm.fish](https://github.com/jorgebucaran/nvm.fish)

#### local (without devcontainer)

- [nvm](https://github.com/nvm-sh/nvm) (optional)
  - alternative: [nvm-windows](https://github.com/coreybutler/nvm-windows)
  - alternative: [jorgebucaran/nvm.fish](https://github.com/jorgebucaran/nvm.fish)
- [nodejs](https://nodejs.org/en) ^22.11.0
  - [pnpm](https://pnpm.io/) ^9.13.2
- [rust](https://www.rust-lang.org/) ^1.80.1
  - [rustfmt](https://github.com/rust-lang/rustfmt)

### Install

```sh
nvm use && pnpm i --forzen-lockfile
```

## start dev environment

```sh
pnpm tauri dev
```
