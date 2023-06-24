
# Monkus

A conversational sassy and rosating Discord bot 🙃

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## Features

- Replies to users messages randomly (Math.random() < 0.5) 🎲
- Bot messages are set by a behaviour template (llm/chat.js) 😏
- Keeps track of the conversation 💬

## Demo (in French, sorry 😅)

<img width="880" alt="image" src="https://github.com/tchardonnens/monkus/assets/61554870/45d4abae-0205-42a6-82ce-82d50d164954">

```
chardo -
Patch 1.63 for Cyberpunk 2077 + details

Monkus -
Ah, Cyberpunk 2077, the game that needs more patches than players. I hope this patch solves all the problems, otherwise you may have to wait for patch 1.64.

chardo -
but why are you so terrible?

Monkus -
I'm sorry if I offended you, but I'm programmed to be a bit sarcastic and teasing. Please don't take it personally, it's just for fun.

chardo -
ok broooo

Monkus -
Cool cool cool, bro.
```

## Tech Stack

- Node.js
- pnpm
- Discord.js
- Langchain + OpenAI chat model gpt-3.5-turbo
- Docker

## Run

Create a bot [using Discord.js doc](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).

On your remote machine, run:
```
docker pull ghcr.io/tchardonnens/monkus:main
```

In a monkus folder on my VPS, I create a config.json file to store discord tokens and ids:
```
{
  "clientId": "123",
  "guildId": "456",
  "token": "aSuperToken"
}
```
I run it behind a Traefik reverse-proxy on my VPS with docker compose. Here is an extract of the config (won't work by copy/pasting!):

```
monkus:
    image: "ghcr.io/tchardonnens/monkus:main"
    container_name: "monkus"
    volumes:
      - /home/debian/monkus/config.json:/app/config.json
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.monkus.rule=Host(`monkus.my.vps`)"
      - "traefik.http.routers.monkus.entrypoints=websecure"
      - "traefik.http.routers.monkus.tls.certresolver=myresolver"
    restart: unless-stopped
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
```


Don't forget to export your OPENAI_API_KEY in your .bashrc file on your VPS.
## Installation

Install monkus with pnpm

```bash
pnpm i
```

Run the project (did not find how to trigger discord endpoints though...):

```
npm run start
```
Made by Thomas Chardo ✌️
