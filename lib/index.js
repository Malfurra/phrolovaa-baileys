import makeWASocket from './Socket/index.js';

(async () => {
    let chalk;
    try {
        chalk = (await import('chalk')).default;
    } catch {
        const plain = (str) => str;
        chalk = new Proxy({}, {
            get: () => new Proxy(plain, {
                get: () => new Proxy(plain, {
                    get: () => plain
                })
            })
        });
    }

    console.log(chalk.magentaBright.bold("\n🦋 Phrolova Baileys 🦋\n"));
    console.log(chalk.whiteBright("Hi, thank you for using my modified Baileys ^-^"));
    console.log(chalk.cyan("Tiktok: ") + chalk.greenBright("malfurra"));
    console.log(chalk.gray("------------------------------\n"));

    fetch('https://raw.githubusercontent.com/Malfurra/phrolovaa-baileys/refs/heads/main/information.json')
        .then(response => response.json())
        .then(data => {
            const message = data["information"];
            console.log(chalk.yellowBright("🆕 Latest update: ") + chalk.whiteBright("25 - 4 - 2026"));
            console.log(chalk.yellow("📁 Information: ") + chalk.white(message));
            console.log("");
        })
        .catch(() => {
            console.log(chalk.red("❌ Gagal mengambil informasi update dari server.\n"));
        });
})();

export * from '../WAProto/index.js';
export * from './Utils/index.js';
export * from './Types/index.js';
export * from './Defaults/index.js';
export * from './Store/index.js';
export * from './WABinary/index.js';
export * from './WAM/index.js';
export * from './WAUSync/index.js';

export { makeWASocket };
export default makeWASocket;