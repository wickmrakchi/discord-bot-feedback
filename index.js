require("dotenv").config();

const Discord = require("discord.js");

const { createCanvas, loadImage } = require("canvas");

const Data = require("./Data");

// إنشاء عميل Discord

const client = new Discord.Client({
  intents: [Discord.IntentsBitField.Flags.Guilds, Discord.IntentsBitField.Flags.GuildMessages, Discord.IntentsBitField.Flags.MessageContent],
});

// عندما يكون البوت جاهزًا

client.on("ready", () => {
  console.log(client.user.tag);

  console.log("Code By Wick Studio");

  console.log("discord.gg/wicks");

  client.user.setPresence({
    activities: [
      {
        name: `Wick Studio`,
        type: Discord.ActivityType.Watching,
      },
    ],
  });
});

// عند تلقي رسالة

client.on("messageCreate", async (message) => {
  if (message.content === Data.Prefix + "send") {
    // if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return;

    // إعداد أزرار التقييم

    let row = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder().setCustomId("star1").setLabel("⭐").setStyle(Discord.ButtonStyle.Secondary),
      new Discord.ButtonBuilder()
        .setCustomId("star2")

        .setLabel("⭐⭐")
        .setStyle(Discord.ButtonStyle.Secondary),
      new Discord.ButtonBuilder().setCustomId("star3").setLabel("⭐⭐⭐").setStyle(Discord.ButtonStyle.Secondary),
      new Discord.ButtonBuilder().setCustomId("star4").setLabel("⭐⭐⭐⭐").setStyle(Discord.ButtonStyle.Secondary),
      new Discord.ButtonBuilder().setCustomId("star5").setLabel("⭐⭐⭐⭐⭐").setStyle(Discord.ButtonStyle.Secondary)
    );
    // إعداد الرسالة الترويجية
    let embed = new Discord.EmbedBuilder()
      .setColor("#0a1a28") // يحدد لون الإطار الجانبي للرسالة
      .setTitle("ملاحظاتك") // يضع عنوان للرسالة
      .setDescription("أعطنا تقييمك أو رأيك حول حل **Wick Studio** لهذا الخادم.") // يضيف وصفًا تحت العنوان
      .setImage("https://cdn.discordapp.com/attachments/1191137526384169122/1275316449476349983/BANNER.jpg?ex=66c8157f&is=66c6c3ff&hm=521bdca7edf49acd69aa95167c9915abd93507c645db001dc89f13fa0f1a2619&") // يعرض صورة كبيرة (بنر) داخل الرسالة
      .setThumbnail(message.guild.iconURL({ dynamic: true })); // يعرض صورة مصغرة، وهي شعار الخادم (server)
    message.channel.send({ embeds: [embed], components: [row] });
  }
});
// عند التفاعل مع الأزرار

client.on("interactionCreate", async (interaction) => {
  if (interaction.customId.startsWith("star")) {
    let starId = interaction.customId.slice(-1);

    let modal = new Discord.ModalBuilder()

      .setCustomId(`thstar${starId}`)

      .setTitle(`تقييم`);

    let textInput = new Discord.TextInputBuilder()

      .setCustomId(`fedd${starId}`)

      .setLabel(`تقييمك`)

      .setStyle(Discord.TextInputStyle.Paragraph)

      .setMinLength(1)

      .setMaxLength(100)

      .setPlaceholder(`يرجى وضع رأيك هنا`)

      .setRequired(true);

    const row = new Discord.ActionRowBuilder().addComponents(textInput);

    modal.addComponents(row);

    interaction.showModal(modal);
  }
});

// عند إرسال النموذج

client.on("interactionCreate", async (modal) => {
  if (modal.customId.startsWith("thstar")) {
    let starId = modal.customId.slice(-1);

    let msg = modal.fields.getTextInputValue(`fedd${starId}`);

    // إنشاء اللوحة (Canvas)

    const canvas = createCanvas(1200, 430);

    const ctx = canvas.getContext("2d");

    // تحميل صورة الخلفية

    const backgroundImage = await loadImage(`./Images/star${starId}.png`);

    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // تعيين أنماط النص

    ctx.fillStyle = "#ffffff";

    ctx.font = "bold 36px Arial";

    ctx.textAlign = "left";

    ctx.textBaseline = "top";

    // إضافة اسم المستخدم

    ctx.fillText("بواسطة: " + modal.user.displayName, 407, 51);

    // تقسيم النص الطويل إلى أسطر

    const charactersPerLine = 25;

    const paragraphs = [];

    for (let i = 0; i < msg.length; i += charactersPerLine) {
      paragraphs.push(msg.slice(i, i + charactersPerLine));
    }

    paragraphs.forEach((paragraph, index) => {
      const yPos = 95 + index * 35;

      ctx.fillText(paragraph, 406, yPos);
    });

    // تحميل ورسم أفتار المستخدم

    const userAvatar = await loadImage(modal.user.avatarURL({ extension: "png" }));

    const avatarCanvas = createCanvas(147, 147);

    const avatarCtx = avatarCanvas.getContext("2d");

    // رسم القص الدائري

    const radius = 73.5;

    avatarCtx.beginPath();

    avatarCtx.arc(radius, radius, radius, 0, Math.PI * 2, true);

    avatarCtx.closePath();

    avatarCtx.clip();

    avatarCtx.drawImage(userAvatar, 0, 0, avatarCanvas.width, avatarCanvas.height);

    // رسم الأفتار على اللوحة الرئيسية

    ctx.drawImage(avatarCanvas, 58, 47, 260, 260);

    // إرسال المرفقات

    const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), `Star${starId}.png`);

    let channel = client.channels.cache.get(Data.Channel);

    await modal.reply({ content: "شكرًا على ملاحظاتك", ephemeral: true }).then(async () => {
      await channel.send({ files: [attachment] });
    });
  }
});

client.login("token"); // token bot
