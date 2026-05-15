const { Telegraf } = require('telegraf');
const express = require('express');

// আপনার BotFather থেকে পাওয়া টোকেনটি এখানে বসান
const BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"; 

const bot = new Telegraf(BOT_TOKEN);
const app = express();

app.use(express.json());

// হোম পেজ (সার্ভার চেক করার জন্য)
app.get('/', (req, res) => {
    res.send("Bot Server is Active and Running!");
});

// TimeWall Postback রিসিভ করার জন্য
app.get('/timewall-postback', (req, res) => {
    const userId = req.query.userId;
    const reward = req.query.reward;

    console.log(`User ID: ${userId} just earned ${reward} points!`);

    // ইউজারকে মেসেজ পাঠানো
    if (userId) {
        bot.telegram.sendMessage(userId, `অভিনন্দন! আপনি টাস্ক কমপ্লিট করে ${reward} পয়েন্ট পেয়েছেন।`);
    }

    res.status(200).send("OK");
});

// টেলিগ্রাম বট কমান্ড (স্টার্ট)
bot.command('start', (ctx) => {
    ctx.reply('স্বাগতম! আমাদের টাস্ক বতে কাজ শুরু করতে নিচের লিংকে ক্লিক করুন...');
});

// পোর্ট সেটআপ (Render বা অন্য হোস্টিং এর জন্য)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    bot.launch(); 
});
