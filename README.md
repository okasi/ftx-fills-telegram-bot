# ftx-fills-telegram-bot

- Create telegram bot w/ @BotFather

- Get token

- Invite bot to group channel

- Get group chat id, tip on how to do it: https://stackoverflow.com/a/38388851

- Create & get read-only api key & secret from https://ftx.com/profile#a=24724686

- Rename ".env.example" to ".env" and fill in required info

- Install pnpm if not already installed https://pnpm.io/installation

- `pnpm install` to install dependencies

- `pnpm run build` to build a file (./dist/index.js) with minimum required dependencies

- `pnpm run start` to get it running

- You should probably setup pm2 (https://pm2.keymetrics.io/docs/usage/quick-start/) on a VPS (https://cloud.hosthatch.com/a/2831) and keep it running 24/7
