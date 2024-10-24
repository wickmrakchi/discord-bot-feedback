# Feedback Discord Bot

This is a simple Discord bot that allows users to send feedback in a specific channel using interactive buttons. The bot is built using `discord.js` and helps collect feedback efficiently with an easy-to-use interface.

## Features

- **Send Feedback Form**: Users can easily send their feedback using buttons.
- **Customizable Embed**: The bot allows customizing the feedback message with a title, description, and images.
- **Channel Configuration**: Feedback is sent to a designated channel defined in the `Data.js` configuration file.
- **Interactive Components**: The bot uses buttons for a seamless user experience.

## Requirements

- Node.js v18
- Discord.js v14.x
- Canvas v2.x

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/wickmrakchi/discord-bot-feedback.git
   cd discord-bot-feedback```

2. **Install the dependencies:**

```bash
npm install```


3. **Configuration:**

Open the `Data.js` file and configure the bot by adding the following:

```js
module.exports = {
  Channel: "id_channel", // ID of the channel where feedback is sent
  Prefix: "!" // Prefix for commands, e.g., !send
};```

In the `index.js` file, customize the embed message:

```js
let embed = new Discord.EmbedBuilder()
  .setColor("#0a1a28") // Frame color of the message
  .setTitle("ملاحظاتك") // Message title
  .setDescription("") // Add description under the title
  .setImage("") // Banner image
  .setThumbnail(message.guild.iconURL({ dynamic: true })); // Small image (server icon)
message.channel.send({ embeds: [embed], components: [row] });```

Replace "token" with your bot's token in the client.login("token"); line.



4. **Run the bot:**

```js
node index.js```



# Commands

Send Feedback: Use the prefix + send command (e.g., !send) to send a feedback form with interactive buttons to the designated channel.


# How It Works

1. Configure the bot with your channel ID and prefix in `Data.js`.


2. Use the command !send in any text channel to send a feedback form.


3. Users can interact with the feedback form through buttons.



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! If you have ideas to improve the bot, feel free to open an issue or submit a pull request.

## Support

For support, join our [Discord server](https://discord.gg/wicks).


### **الشرح**:
- **اسم المشروع**: تم تحديده بـ "Feedback Discord Bot".
- **الوصف**: البوت يسمح بجمع التقييمات عبر زر تفاعلي في قناة معينة.
- **المميزات**: تتضمن إرسال قائمة تقييمات، تخصيص الرسائل، واستخدام الأزرار التفاعلية.
- **المتطلبات**: حددنا المتطلبات مثل Node.js و Discord.js.
- **التثبيت**: يشمل نسخ المشروع من GitHub وتعديل بعض الملفات مثل `Data.js` و `index.js`.
- **الأوامر**: أمر `!send` لإرسال قائمة التقييمات.
- **الرخصة**: تحت MIT License.
