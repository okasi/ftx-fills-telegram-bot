require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

console.log('TELEGRAM_BOT_TOKEN', TELEGRAM_BOT_TOKEN)
console.log('TELEGRAM_CHAT_ID', TELEGRAM_CHAT_ID)

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true })

const FTXWs = require('ftx-api-ws')

const ftx = new FTXWs({
  key: process.env.FTX_KEY,
  secret: process.env.FTX_SECRET,
})

;(async () => {
  bot.on('polling_error', console.log)

  bot.on('message', (msg) => {
    console.log(msg)
    const chatId = msg.chat.id
    if (chatId == TELEGRAM_CHAT_ID) {
      bot.sendMessage(
        chatId,
        `Received your message (${msg.text}) in CORRECT chat id (${msg.chat.id})`
      )
    } else {
      bot.sendMessage(
        chatId,
        `Received your message (${msg.text}) in WRONG chat id (${msg.chat.id})`
      )
    }
  })

  await ftx.connect()

  ftx.subscribe('fills')
  ftx.on('fills', (msg) => {
    console.log(msg)
    bot.sendMessage(TELEGRAM_CHAT_ID, JSON.stringify(JSON.parse(msg), null, 2))
  })
})()
