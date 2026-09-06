# Microfrontend Practice

This project is a microfrontend demo built with Webpack Module Federation. It demonstrates how a host application can compose several independent frontend apps into a single user experience while keeping each feature app isolated and independently served.

The repository is divided into four packages under `packages/`:

- `container`: the shell application that owns routing and shared UI
- `marketing`: React-based public marketing app
- `auth`: React-based authentication app
- `dashboard`: Vue-based dashboard app

---

## Purpose

The goal of this project is to showcase a practical microfrontend architecture in a small but realistic application.

It demonstrates:

- independent frontend apps for different business areas
- runtime composition through Module Federation
- route synchronization between a host shell and remote apps
- a simple authentication flow
- cross-framework composition using React and Vue in the same product

This is primarily a learning and demonstration project for real-world microfrontend patterns.

---

## Architecture

The application follows a host + remote model.

### Host app
The container app is the main shell. It is responsible for:

- rendering the shared header
- managing the top-level router
- tracking authentication state
- mounting the marketing, auth, and dashboard apps
- redirecting unauthenticated users away from the dashboard

### Remote apps
Each remote app exposes a mount function and is rendered into a specific DOM node managed by the container.

The project includes:

- marketing app
- auth app
- dashboard app

The container loads these remotes via webpack Module Federation at runtime.

---

## Technology stack

This project uses a mix of frontend technologies:

- React 17
- React Router DOM 5
- Material UI
- Vue 3
- PrimeVue
- PrimeFlex
- PrimeIcons
- Chart.js
- Webpack 5
- Babel
- webpack-dev-server
- Module Federation

---

## Communication between the host and microfrontends

The communication model is based on mount functions and callback-based navigation.

### 1. Remote mounting
Each remote app exports a `mount` function from its bootstrap file. The container calls that function with a DOM element and configuration such as:

- `initialPath`
- `onNavigate`
- `onSignIn`

This allows the host to embed the microfrontend inside the main shell without tightly coupling the apps.

### 2. Route synchronization
The container passes navigation callbacks to the remote apps, and the remote apps notify the host when their internal routes change.

This keeps the browser URL aligned with the host shell and the remote app state.

### 3. Authentication flow
The auth app can trigger an `onSignIn` callback. The container updates `isSignedIn` and redirects the user to `/dashboard`.

The dashboard route is protected, so if the user is not authenticated, the container redirects them back to the entry page.

---

## Project structure

```text
packages/
├── auth/
│   ├── config/
│   ├── public/
│   └── src/
├── container/
│   ├── config/
│   ├── public/
│   └── src/
├── dashboard/
│   ├── config/
│   ├── public/
│   └── src/
├── marketing/
│   ├── config/
│   ├── public/
│   └── src/
```

Each package includes a dedicated `package.json`, webpack config, and local development server.

---

## Local execution

This repository does not have a single root-level start script. Each package must be installed and started separately.

### 1. Install dependencies

From the repository root, run:

```bash
cd packages/marketing && npm install
cd ../auth && npm install
cd ../dashboard && npm install
cd ../container && npm install
```

### 2. Start the remote apps

Open separate terminals and run:

```bash
cd packages/marketing && npm start
```

```bash
cd packages/auth && npm start
```

```bash
cd packages/dashboard && npm start
```

### 3. Start the host app

Then start the container shell:

```bash
cd packages/container && npm start
```

### 4. Open the app

Once everything is running, open:

```text
http://localhost:8080/
```

The container or host app is the main entry point.

### Dev ports

- Container: http://localhost:8080
- Marketing: http://localhost:8081
- Auth: http://localhost:8082
- Dashboard: http://localhost:8083

---

## Typical flow

- The container loads the marketing app at the root route
- Users can navigate to the auth app
- After sign in, the container redirects to `/dashboard`
- The dashboard route is protected
- The user can move through the app without full-page reloads

---

## Production build

Each package has a build script:

```bash
cd packages/marketing && npm run build
cd ../auth && npm run build
cd ../dashboard && npm run build
cd ../container && npm run build
```

---

## Summary

This repository is a compact but practical example of a microfrontend architecture using Module Federation. It shows how independent frontend apps can cooperate under one host shell, share navigation flow, and coordinate authentication while staying decoupled.

It is a useful demo for learning how microfrontends are composed in real-world frontend systems.
