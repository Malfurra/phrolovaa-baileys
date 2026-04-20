# <div align='center'>Phrolova Baileys - WhatsApp Web API</div>

<p align="center">
  <img src="68747470733a2f2f632e746f7034746f702e696f2f705f333736326d66327969312e6a7067'" alt="Phrolova Baileys" />
</p>

<div align='center'>

A powerful TypeScript/JavaScript WhatsApp Web API library for building automation solutions and integrations with WhatsApp. Built on WebSocket technology without requiring a browser instance.

</div>

## Features

Production-ready features for WhatsApp automation:

- Send and receive text messages
- Send media files (images, videos, audio, documents)
- Message groups and individual chats
- User presence and typing indicators
- Contact management
- Message reactions
- Status updates
- Quote and forward messages
- Interactive messages with buttons
- Album messages (multiple images)
- Poll and event messages
- Auto-reconnection with exponential backoff
- Session management and persistence
- Custom pairing code support (PHRO-LOVA)
- Multi-device WhatsApp support

## Installation

```bash
npm install @phrolovaa/baileys
```

## Quick Start

```typescript
import makeWASocket from '@phrolovaa/baileys';

const sock = makeWASocket();

sock.ev.on('connection.update', (update) => {
  const { connection, lastDisconnect } = update;
  if (connection === 'open') {
    console.log('Connected to WhatsApp');
  }
});

sock.ev.on('messages.upsert', async (m) => {
  const msg = m.messages[0];
  if (!msg.key.fromMe) {
    await sock.sendMessage(msg.key.remoteJid, { 
      text: 'Hello! Thanks for your message.' 
    });
  }
});
```

## Documentation

For detailed documentation and API reference, visit the project repository.

## Requirements

- Node.js 14 or higher
- A WhatsApp account
- Chrome, Edge, or Firefox browser installed

## Disclaimer

This library is an unofficial implementation. Use responsibly and in compliance with WhatsApp's Terms of Service.

## Support and Contact

For support and inquiries, reach out through:

- Telegram: https://t.me/phrolovaa
- GitHub: https://github.com/malfurra
- Other socials: @malfurra

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome. Please fork the repository and submit pull requests with your improvements.

---

Developed and maintained by the Baileys community.