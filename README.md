<a href="https://snip.ml">
  <img src="https://snip.ml/img/icons/logo.png" width="80px" align="right" />
</a>

# Snip

[![Netlify Status](https://api.netlify.com/api/v1/badges/394af265-a105-4fe8-afb9-ef0a68718780/deploy-status)](https://app.netlify.com/sites/snip-client/deploys)
[![API Uptime](https://badgen.net/uptime-robot/day/m785666575-5273ca5aefce65d777404720?style=flat-square&color=7C68F3&labelColor=1D1E32)](https://badgen.net/uptime-robot/day/m785666575-5273ca5aefce65d777404720?style=flat-square&color=7C68F3&labelColor=1D1E32)
[![API Ping](https://badgen.net/uptime-robot/response/m780862024-50db2c44c703e5c68d6b1ebb?style=flat-square&color=7C68F3&labelColor=1D1E32)](https://badgen.net/uptime-robot/response/m780862024-50db2c44c703e5c68d6b1ebb?style=flat-square&color=7C68F3&labelColor=1D1E32)
[![Code Size](https://img.shields.io/github/languages/code-size/aidenybai/snip?style=flat-square&color=7C68F3&labelColor=1D1E32)](https://img.shields.io/github/languages/code-size/aidenybai/snip?style=flat-square&color=7C68F3&labelColor=1D1E32)
[![License](https://img.shields.io/github/license/aidenybai/snip?style=flat-square&color=7C68F3&labelColor=1D1E32)](https://img.shields.io/github/license/aidenybai/snip?style=flat-square&color=7C68F3&labelColor=1D1E32)

A faster, cleaner, no-bs link shortener, skipping the not-so-great privacy reputation of marketing centric link shorteners (cough adfly). 

## Goals

We adapt [Chromium principles](https://www.chromium.org/developers/core-principles) to help us drive product decisions:

- **Speed**: Snip has low performance overhead and is compressed with deflate and gzip.
- **Security**: Snip is secured with 128-bit SSL and no user data is stored (privacy baby)
- **Sustainability**: Snip relies on a 7 day TTL to keep the service going in good health.
- **Simplicity**: Snip provides a high-level interface that’s easy to use, understand, and debug.

## Getting Started

### Installation

```bash
git clone https://github.com/aidenybai/snip.git
cd snip
```

Note: You will need at least NodeJS 10.18.1+, VSCode 1.44+, Yarn 1.17.3+ and MongoDB 3+. You will also need to configure .env variables before launching.

## FAQ

#### Q: Who maintains Snip?

Aiden Bai maintains the project, but we'd love your help and expertise on the project! Feel free to fork and make changes, if you like the project, drop a ⭐!

#### Q: What is the character limit for links?

100,000 characters after normalization by [normalize-url](https://github.com/sindresorhus/normalize-url). If your link isn't initially provided correctly, the normalization algorithm may increase your link character count.

#### Q: Is there a expiry or TTL for snips?

Yes, the TTL for snips is 7 days before permanent deletion.

#### Q: I'm recieving `ReferenceError: yarn is not defined` whenever I try to use Yarn

You need to install yarn first. Go to [their website](https://yarnpkg.com/lang/en/docs/install/) and follow instructions.

#### Q: What's the difference between `yarn start` and `yarn serve`?

Our project has two environments: Production and Development. The production environment is used when it is actually hosted, an example is https://snip.ml. The development environment shows more "developer" metrics, helping you to debug, but is not suitible for production.

```bash
yarn start # production

yarn serve # development
```

#### Q: I'm recieving `Error: Cannot find module 'example'` whenever I start the project

You need to install the packages with the command below.

```bash
yarn
```


## Useful Links

- [The website](https://snip.ml) hosts the production version of the website.
- [Our Github Repository](https://github.com/aidenybai/snip) contains the most updated code.
- [Our Producthunt Page](https://www.producthunt.com/posts/snip-ml) shows the latest feedback from indie makers.

Made with 💖 by Aiden Bai

＼＿ﾍ(◕‿◕ ✰)
