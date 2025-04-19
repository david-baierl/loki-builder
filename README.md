# Loki Builder

A character builder based on the 2024 Dungeons and Dragons rules.

This project is in an really early state of development and highly unstable und unfinished.

## Setup

### Dependencies

#### with devcontainer (recommended)

- *no dependencies needed*

#### local (without devcontainer)

- [nodejs](https://nodejs.org/en) ^22.11.0
  - [pnpm](https://pnpm.io/) ^9.13.2
- [rust](https://www.rust-lang.org/) ^1.85.0
  - [rustfmt](https://github.com/rust-lang/rustfmt)

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

### Install

```sh
pnpm i --forzen-lockfile
```

## prebuild typescript types from rust

the prebuild command will run cargo test,
and as a side effect will generate typescript bindings for the IPC layer

```sh
pnpm prebuild
```

## start dev environment

```sh
pnpm tauri dev
```

## build production application\*

```sh
pnpm tauri build
```

*\* at this state: there is currently no fully working build process implemented*
