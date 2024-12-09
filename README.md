# Pulppo Dashboard

## Getting Started

First, clone the repository:

```bash
git clone git@github.com:Drmanzanas/pulppo-dashboard.git
```
 ## Navigate to the Project Directory

```bash
cd pulppo-dashboard
```

## Install the dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

## Environment Variables
This project uses MongoDB as its database. Set up the following environment variable in a .env.local file in the root of your project:

```bash
MONGODB_URI=mongodb+srv://challenge:v9vQpYbAcmOYAvGo@development.8jpnw.mongodb.net/pulppo
```

Important: Never share or upload your database URL in a real-world project. This URL is for testing and challenge purposes only.

## Start the development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 with your browser to see the result.
