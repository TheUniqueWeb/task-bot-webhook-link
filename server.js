const { Telegraf } = require('telegraf');
const express = require('express');

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

// Webhook সেটিংস (এটি বটের সাথে টেলিগ্রামের লিংক তৈরি করবে)
app.use(bot.webhookCallback('/telegram-webhook'));
bot.telegram.setWebhook("https://my-earn-bot-v2zk.onrender.com/telegram-webhook");

app.get('/', (req, res) => {
    res.send("Bot Server is Running!");
});

app.post('/telegram-webhook', (req, res) => {
    bot.handleUpdate(req.body, res);
});

// আপনার আগের টাইমওয়াল কোড
app.get('/timewall-postback', (req, res) => {
    const userId = req.query.userId;
    const reward = req.query.reward;
    if (userId) {
        bot.telegram.sendMessage(userId, `অভিনন্দন! আপনি ${reward} পয়েন্ট পেয়েছেন।`);
    }
    res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
