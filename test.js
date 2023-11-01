import telegrambo from 'telegrambo';
import polling from 'telegrambo-polling';
import onMatch from './index.js';

const bot = telegrambo(process.env.BOT_TOKEN);
bot.polling = polling;

bot.match = onMatch('::');

bot.match('message::text::/hello/i', (event, match, eventName) => {
  console.log({event, match});
  event.sendMessage({
    text: event.message.text
  });
});

bot.polling();
