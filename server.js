const { Telegraf } = require('telegraf');
const express = require('express');

// এখানে আপনার আসল বটের টোকেন বসান
const BOT_TOKEN =  

const bot = new Telegraf(BOT_TOKEN);
const app = express();

app.use(express.json());

// রুট ইউআরএল
app.get('/', (req, res) => {
    res.send("Bot Server is Running!");
});

// টাইমওয়াল পোস্টব্যাক
app.get('/timewall-postback', (req, res) => {
    const userId = req.query.userId;
    const reward = req.query.reward;

    console.log(`User ID: ${userId} earned ${reward}`);

    if (userId) {
        bot.telegram.sendMessage(userId, `অভিনন্দন! আপনি ${reward} পয়েন্ট পেয়েছেন।`).catch(err => console.log(err));
    }

    res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    bot.launch();
});
