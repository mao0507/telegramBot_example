// bot 套件
var TelegramBot = require('node-telegram-bot-api');
// express
const express = require('express');
const bodyParser = require('body-parser');
// axios
const axios = require('axios');
// 環境變數
require('dotenv').config();

// 設定變數
const TOKEN = process.env.BOT_TOKEN;
const url = process.env.URL;
const port = process.env.PORT;
const chatId = process.env.CHAT_ID;

// bot 設定
const bot = new TelegramBot(TOKEN);

// 設定 webHook
bot.setWebHook(`https://api.telegram.org/Bot${TOKEN}/setWebhook?url=${url}`);

const app = express();

// parse the updates to JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);

  console.log(req);
  let test = JSON.stringify(req.body);

  axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    chat_id: chatId, //可以直接對聊天室呼叫
    text: `歡迎使用Telegram bot \n ${test}`,
  });

  res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
  console.log('telegram Bot is working');
  console.log('Is webHook mode now');
});
