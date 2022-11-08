# Contributing

Thank you for being interested in helping with the development of this project. Please read the below information to get started.

## Development

### Prerequisites

Before starting, you should ensure you are running atleast Node V16 and PNPM V7:

### Setup

Fork this repo, the clone it to your local mechine and intsall the dependencies:

```sh
pnpm install # pnpm i
```

Then you need to build all packages under `common`:

```sh
pnpm run build:common
```

### Developing Components

We use a vite project in `dev-server` for development.

Using the following command you can start development server for specify component:

```sh
pnpm run serve [component]
```

### Developing Documentation

We alse use a vite project for documentation, you can start it locally:

```sh
pnpm run serve:docs
```

## Create New Component

You can create some templete files by:

```sh
pnpm run create [component-name]
```

Then you need to update exports files by:

```sh
pnpm run bootstrap
```
