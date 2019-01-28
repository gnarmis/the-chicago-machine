# The Chicago Machine Website

Built using [Next.js](https://nextjs.org).

## Setup

Install node. Use the current LTS version, which is 10 right now. `brew install node@10`. Ensure it's on your `$PATH`.

Then,

    npm install

## Usage

Hot reloading dev server that serves up website at localhost:3000

    npm run dev

Apparently, can run as a static html+css+js website, or as a Node.js app with
`npm run build && npm run start`.

To export an html+css+js website:

    npm run export

See the out/ directory. It's git ignored. It will now have the static website.

To deploy whatever is in `out/` (this uses Google Firebase),

    firebase deploy
    # `firebase` is made available with the dev dependency firebase-tools
