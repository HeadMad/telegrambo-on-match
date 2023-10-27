import {nodeBotAsync} from 'telegrambo';
import onMatch from './index.js';

const bot = nodeBotAsync(process.env.BOT_TOKEN);
bot.match = onMatch(bot, '::');

bot.match('message::text::hello', (ctx, match, event) => {
  console.log({event, match});
  ctx.sendMessage({
    text: ctx.message.text
  });
});

(async () => {
  let offset = 0;
  let timeout = 60;
  while (true) {
    const {ok, result} = await bot.getUpdates({
      offset,
      timeout
    });

    if (!ok)
      break;
    
    if (!result.length)
      continue;
    
    offset = result.at(-1).update_id + 1;

    for (let update of result)
      bot.setUpdate(update);
  }
})();