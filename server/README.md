# Snip API

> The API for the Snip backend API.

### Installation

```bash
git clone https://github.com/aidenybai/snip.git
cd snip
cd server
```

Note: You will need at least NodeJS 10.18.1+, VSCode 1.44+, Yarn 1.17.3+ and MongoDB 3+. You will also need to configure .env variables before launching.

### Configuring Environment Variables

```bash
# Environment Config
# Store your secrets and config variables in here
# reference these in code with process.env.ENV_VARIABLE

PORT=3000
DB_URL=mongodb://mongodb.example.com:27017
SECRET=google-recaptcha3-token

# Note: MongoDB URI must be in the mongodb:// protocol, the mongodb+srv:// is not supported
```

Copy and rename `.env.example` to `.env` to be able to interact with `process.env` in NodeJS.

### Usage

#### Project setup
```
yarn install
```

#### Compiles and hot-reloads for development
```
yarn serve
```

#### Compiles and minifies for production
```
yarn build
```

#### Runs production program 
```
yarn start
```