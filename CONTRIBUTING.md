# Contributing

First, thanks for being interested in contributing on this project!

## Development

### Pre-request

Before starting, you should ensure your mechine is having:

Node >= 16

pnpm >= 7

### Setup

Fork this repo, the clone it to your local mechine and intsall the dependencies:

```sh
pnpm install # pnpm i
```

Then you need to build all packages under `common`:

```sh
pnpm run build:common
```

### Developing for Component

We use a vite project in `dev-server` for development.

Using the following command you can start development server for specify component:

```sh
pnpm run serve [component]
```

You can also specify the port and language via additional command:

```sh
pnpm run serve [component] -p [port] -l [languagt]
```

### Developing for Document

We alse use a vite project for documenting, you can start it locally:

```sh
pnpm run serve:docs
```

## Create New Component

you can create some templete files by:

```sh
pnpm run create [component-name]
```

Then you need to update exports files by:

```sh
pnpm run bootstrap
```
