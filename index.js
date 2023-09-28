const TelegramApi = require('node-telegram-bot-api')

const token = '6453567375:AAFa0mtRy0FzTt7zbrNGkfqvTXNI2J62Yx0'

const bot = new TelegramApi(token, {polling: true})

bot.on('message', msg =>{
    const text = msg.text;
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, text)
})