# Telegrambo On Match

## Installation

You can install Telegrambo using npm:

`npm install telegrambo-on-match` or `npm install headmad/telegrambo-on-match`

## Usage
```js
// bot.js
import { nodeBotAsync } from 'telegrambo';
import onMatch  from 'telegrambo-on-match';

const bot = nodeBotAsync(process.env.YOU_BOT_TOKEN);

// Initialize new method
bot.match = onMatch(bot, '::');
```

Creates a callback function to handle a specific match.

**Parameters:**

- `bot` (BotContext ): The bot instance.
- `matchSeparator` (string, optional): The separator used to split the match string into an array. Defaults to `'::'`.

**Returns:**

- `function`: A callback function that handles the match.

<br>Example of using:

```js
// If user send photo
bot.match('message::photo', (ctx, match, eventName) => {
  ctx.sendMessage({
    text: 'Great photo!'
  });
});
```

This handler will working in `message` event and [_Message_](https://core.telegram.org/bots/api#message) message type has field `photo`.
This filter is very powerfull. You can check endpoints for a match or regular expression match:

```js
// Will matching for text "Hello!"
'message::text::Hello!'

// Matching regular expression for /start command in text of message 
'message::text::/.*\\/start\\b.*/i'

// Also filter can be applied to array field like 'entities'
// then filter will maching to each element of them
// and check is this entitie is mention (@username) 
'message::entities::type::mention'
```

<br>If You whant change match separator from '::' to your, pass as second argument new separator: 

```js
import { nodeBotAsync } from 'telegrambo';
import onMatch  from 'telegrambo-on-match';

const bot = nodeBotAsync(process.env.YOU_BOT_TOKEN);
bot.match = onMatch(bot, '--');

bot.on('message--text--/\\/\\w+/i', (ctx, match) => {
  ctx.sendMessage({
    text: 'You send me command <b>${match}</b>'
  });
});
```