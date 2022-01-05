 const TelegramBot = require('node-telegram-bot-api')

 const token = '2081986929:AAEmWK23rULdeLYYU4cVsSzvoif0UfBx3AQ';
const bot = new TelegramBot(token, {polling: true});

bot.sendMessage('-1001791902476', 'rtesss').then(b => console.log(b))
.catch(e => console.log(e));