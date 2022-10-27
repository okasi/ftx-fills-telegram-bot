require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
console.log("TELEGRAM_BOT_TOKEN", "\n", bot.token);
console.log("TELEGRAM_CHAT_ID", "\n", process.env.TELEGRAM_CHAT_ID);

const FTXWs = require("ftx-api-ws");

const ftx = new FTXWs({
	key: process.env.FTX_KEY,
	secret: process.env.FTX_SECRET,
});

console.log("FTX_KEY", "\n", ftx.key);
console.log("FTX_SECRET", "\n", ftx.secret);

(async () => {
	bot.on("polling_error", console.log);

	bot.on("message", (msg) => {
		console.log(msg);
		if (msg.from.is_bot) {
			return null;
		}
		const chatId = String(msg.chat.id);
		if (chatId === process.env.TELEGRAM_CHAT_ID) {
			return bot.sendMessage(
				chatId,
				`Received your message (${msg.text}) in CORRECT chat id (${msg.chat.id})`,
			);
		} else {
			return bot.sendMessage(
				chatId,
				`Received your message (${msg.text}) in WRONG chat id (${msg.chat.id})`,
			);
		}
	});

	await ftx.connect();

	ftx.subscribe("fills");
	ftx.on("fills", (fill) => {
		console.log(fill);
		bot.sendMessage(
			process.env.TELEGRAM_CHAT_ID,
			JSON.stringify(JSON.parse(fill), null, 2),
		);
	});
})();
