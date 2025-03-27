const { getTime } = global.utils;

module.exports = {
  config: {
    name: "logsbot",
    isBot: true,
    version: "1.1",
    author: "RANA",
    envConfig: {
      allow: true
    },
    category: "events"
  },

  onStart: async ({ usersData, threadsData, event, api }) => {
    const personalGroupID = "7255259501235012"; // এখানে তোমার গ্রুপ আইডি বসাও

    if (
      (event.logMessageType == "log:subscribe" && event.logMessageData.addedParticipants.some(item => item.userFbId == api.getCurrentUserID())) ||
      (event.logMessageType == "log:unsubscribe" && event.logMessageData.leftParticipantFbId == api.getCurrentUserID())
    ) {
      let msg = "🌟━【🔹 𝐁𝐎𝐓 𝐋𝐎𝐆𝐒 🔹】━🌟\n";
      const { author, threadID } = event;

      if (author == api.getCurrentUserID()) return;
      let threadName;

      if (event.logMessageType == "log:subscribe") {
        threadName = (await api.getThreadInfo(threadID)).threadName;
        const authorName = await usersData.getName(author);
        msg += `\n✅ 𝐁𝐎𝐓 𝐀𝐃𝐃𝐄𝐃 𝐈𝐍 𝐀 𝐆𝐑𝐎𝐔𝐏 ✅\n📌 𝐆𝐫𝐨𝐮𝐩 𝐍𝐚𝐦𝐞: ${threadName}\n👤 𝐀𝐝𝐝𝐞𝐝 𝐁𝐲: ${authorName}`;
      } 
      else if (event.logMessageType == "log:unsubscribe") {
        const authorName = await usersData.getName(author);
        const threadData = await threadsData.get(threadID);
        threadName = threadData.threadName;
        msg += `\n❌ 𝐁𝐎𝐓 𝐑𝐄𝐌𝐎𝐕𝐄𝐃 𝐅𝐑𝐎𝐌 𝐀 𝐆𝐑𝐎𝐔𝐏 ❌\n📌 𝐆𝐫𝐨𝐮𝐩 𝐍𝐚𝐦𝐞: ${threadName}\n👤 𝐑𝐞𝐦𝐨𝐯𝐞𝐝 𝐁𝐲: ${authorName}`;
      }

      const time = getTime("DD/MM/YYYY HH:mm:ss");
      msg += `\n\n🆔 𝐔𝐬𝐞𝐫 𝐈𝐃: ${author}\n🆔 𝐆𝐫𝐨𝐮𝐩 𝐈𝐃: ${threadID}\n⏰ 𝐓𝐢𝐦𝐞: ${time}`;
      msg += "\n\n🌟━【 🔹 𝐄𝐍𝐃 𝐎𝐅 𝐋𝐎𝐆 🔹】━🌟";

      api.sendMessage(msg, personalGroupID);
    }
  }
};
