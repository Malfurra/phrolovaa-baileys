<div align="center">

  # ✦ Phrolova Baileys ✦
 <img width="490" height="276" alt="Image" src="https://github.com/user-attachments/assets/e9d62de4-e4cb-4ca0-b661-9b00bc028775" />


> *WhatsApp Web API — No Browser, No Hassle*

[![npm version](https://img.shields.io/npm/v/@phrolovaa/baileys?color=25D366&label=npm&logo=npm&logoColor=white)](https://www.npmjs.com/package/@phrolovaa/baileys)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-blue?logo=open-source-initiative)](./LICENSE)
[![Telegram](https://img.shields.io/badge/Support-Telegram-2CA5E0?logo=telegram&logoColor=white)](https://t.me/phrolovaa)
[![GitHub](https://img.shields.io/badge/GitHub-malfurra-181717?logo=github)](https://github.com/malfurra)

· · ────────────── · ·

*A TypeScript/JavaScript WhatsApp Web API library built on WebSocket — lightweight, fast, and production-ready.*

> 🍁 _Powered by Noya Company_ 𖹭.ᐟ

· · ────────────── · ·

</div>

---

## ✦ Table of Contents

- [What is Phrolova Baileys?](#-what-is-phrolova-baileys)
- [Features](#-features)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Comparison](#-comparison)
- [Contact & Support](#-contact--support)
- [License](#-license)

---

## ✦ What is Phrolova Baileys?

**Phrolova Baileys** is a WhatsApp Web API library built on WebSocket technology — meaning you can build bots, notification systems, or WhatsApp automations **without ever launching a browser**. Less RAM, less overhead, less headache.

Perfect if you want to:

﹒Build a full-featured **WhatsApp bot**
﹒Send automated messages at scale
﹒Integrate WhatsApp into your business systems
﹒Explore the WhatsApp API without dealing with Selenium or Puppeteer

---

## ✦ Features

· · ────────────── · ·

**Messaging & Media**

| Feature | Status |
|---|---|
| Send & receive text messages | Supported |
| Send images, videos, audio, documents | Supported |
| Message groups & personal chats | Supported |
| Quote & forward messages | Supported |
| Interactive messages with buttons | Supported |
| Album messages (multiple images) | Supported |
| Poll & event messages | Supported |

· · ────────────── · ·

**Social & Contacts**

| Feature | Status |
|---|---|
| Presence & typing indicators | Supported |
| Contact management | Supported |
| Message reactions | Supported |
| Status updates | Supported |

· · ────────────── · ·

**Technical & Security**

| Feature | Status |
|---|---|
| Auto-reconnect + exponential backoff | Supported |
| Session management & persistence | Supported |
| Custom pairing code (PHROLOVA) | Supported |
| Multi-device WhatsApp support | Supported |
| Full bad MAC protection | Supported |

---

## ✦ Requirements

> [!CAUTION]
> **Read this before you install anything.**
>
> This library **requires Node.js v20 or higher**. If you're running anything below v20, the process will exit immediately with an error on startup. This is intentional — not a bug.
>
> Check your version right now:
> ```bash
> node --version
> ```
> If the output is below `v20.x.x`, upgrade at [nodejs.org](https://nodejs.org) before continuing.

· · ────────────── · ·

| Component | Minimum | Recommended |
|---|---|---|
| **Node.js** | `v20.0.0` | `v20 LTS` or newer |
| **NPM** | `v8+` | Latest |
| **WhatsApp Account** | Active | Dedicated number for the bot |
| **Internet Connection** | Stable | 1 Mbps minimum |

---

## ✦ Installation

One command and you're in:

```bash
npm install @phrolovaa/baileys
```

Or with yarn:

```bash
yarn add @phrolovaa/baileys
```

> [!NOTE]
> If you run into install errors, try deleting `node_modules` and `package-lock.json`, then run the install command again.

---

## ✦ Quick Start

A few lines is all it takes to get a WhatsApp bot running:

```typescript
import makeWASocket from '@phrolovaa/baileys';

const sock = makeWASocket();

// Monitor connection status
sock.ev.on('connection.update', (update) => {
  const { connection, lastDisconnect } = update;
  if (connection === 'open') {
    console.log('Connected to WhatsApp');
  }
  if (connection === 'close') {
    console.log('Disconnected — attempting to reconnect...');
  }
});

// Auto-reply incoming messages
sock.ev.on('messages.upsert', async (m) => {
  const msg = m.messages[0];

  // Don't reply to your own messages
  if (!msg.key.fromMe) {
    await sock.sendMessage(msg.key.remoteJid, {
      text: 'Hello! Your message has been received.'
    });
  }
});
```

> [!TIP]
> For production bots, always persist your session data to a file or database so you don't have to re-scan the QR Code every time the bot restarts. Use `useSingleFileAuthState` or a custom store implementation.

---

## ✦ Project Structure

```
phrolovaa-baileys/
·
├── lib/
│   ├── Defaults/           # Default connection & socket config
│   ├── Signal/             # Signal Protocol implementation (E2E encryption)
│   │   └── Group/          # Group-specific encryption
│   ├── Socket/             # Core WebSocket connection
│   │   ├── socket.js       # Main connection entry point
│   │   ├── messages-send.js
│   │   ├── messages-recv.js
│   │   ├── chats.js
│   │   ├── groups.js
│   │   ├── communities.js
│   │   ├── business.js
│   │   └── newsletter.js
│   ├── Store/              # In-memory data storage
│   ├── Types/              # TypeScript type definitions
│   └── Utils/              # Helpers & utilities
·
├── WAProto/                # WhatsApp Protobuf (communication protocol)
├── engine-requirements.js  # Node.js version validator
├── information.json        # Latest update info
└── LICENSE
```

---

## ✦ Comparison

How does Phrolova Baileys stack up?

| | **Phrolova Baileys** | Selenium / Puppeteer | WhatsApp Business API |
|---|:---:|:---:|:---:|
| No browser required | ✦ | ✗ | ✦ |
| Free to use | ✦ | ✦ | ✗ paid |
| Multi-device | ✦ | limited | ✦ |
| Send media | ✦ | ✦ | ✦ |
| Group features | ✦ | limited | ✗ |
| RAM usage | low | high | low |
| Setup complexity | easy | complex | moderate |

---

## ✦ Disclaimer

> [!WARNING]
> **Use responsibly.**
>
> This is an **unofficial** implementation of the WhatsApp Web API. Usage may violate [WhatsApp's Terms of Service](https://www.whatsapp.com/legal/terms-of-service). Any risk of account bans is entirely on the user.
>
> The developer is **not responsible** for any misuse of this library including spam, fraud, or illegal activity. Use it for legitimate personal or business purposes only.

---

## ✦ Contact & Support

Found a bug? Have a feature request? Just want to say hi?

· · ────────────── · ·

| Platform | Link |
|---|---|
| Telegram | [@noya4u_27](https://t.me/noya4u_27) |
| GitHub | [@malfurra](https://github.com/malfurra) |
| Other socials | `@malfurra` |

---

## ✦ License

Released under the **MIT License** — free to use, modify, and distribute. See [LICENSE](./LICENSE) for full details.

---

<div align="center">

· · ────────────── · ·

> 🍁 _Powered by Noya Company_ 𖹭.ᐟ

· · ────────────── · ·

*Last updated: April 21, 2026*

</div>
