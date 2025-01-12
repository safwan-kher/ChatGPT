## Install locally

Node version `20.x`

`cp .env.example .env.local` And fill the environment variables

## Enable preview mode

Visit `/api/preview`.

Allows to preview content from WordPress

## Sitemap generation

`buildSitemap.js`

## Building the site

It used to be possible to build the site with https://startsteps.glitch.me/ but it only works with Netlify and now the site is deployed on Vercel. The basic functionality is to send a POST request to Vercel to start the build process.
