// bot 套件
var TelegramBot = require('node-telegram-bot-api');
// 環境變數
require('dotenv').config();
// 宣告變數
var token = process.env.BOT_TOKEN;

var bot = new TelegramBot(token, { polling: true });

//收到Start訊息時會觸發這段程式
bot.onText(/\/start/, function (msg) {
  var chatId = msg.chat.id; //用戶的ID
  var resp = '你好'; //括號裡面的為回應內容，可以隨意更改
  bot.sendMessage(chatId, resp); //發送訊息的function
});

//收到/cal開頭的訊息時會觸發這段程式
bot.onText(/\/cal (.+)/, function (msg, match) {
  var fromId = msg.from.id; //用戶的ID
  var resp = match[1].replace(/[^-()\d/*+.]/g, '');
  // match[1]的意思是 /cal 後面的所有內容
  resp = '計算結果為: ' + eval(resp);
  // eval是用作執行計算的function
  bot.sendMessage(fromId, resp); //發送訊息的function
});

//提示訊息，方便終端機檢閱是否執行
console.log('telegramBot is working Now');
