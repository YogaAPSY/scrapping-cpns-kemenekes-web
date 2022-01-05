const TelegramBot = require('node-telegram-bot-api')

module.exports = {
    sendNotification: async function(text) {
        const token = '2081986929:AAEmWK23rULdeLYYU4cVsSzvoif0UfBx3AQ';
        const bot = new TelegramBot(token, {polling: true});

        return await bot.sendMessage('-1001791902476', text);
    }
}
