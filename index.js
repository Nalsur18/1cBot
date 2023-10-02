
const TelegramApi = require('node-telegram-bot-api')
const token = '6453567375:AAFa0mtRy0FzTt7zbrNGkfqvTXNI2J62Yx0'
const bot = new TelegramApi(token, {polling: true})

const XLSX = require('xlsx')
//const workbook = XLSX.readFile("C:/Users/Ишмухаметов/Desktop/bot.xlsx");
const workbook = XLSX.readFile("//bdserver83/ПРОГИ2023/Ds/bot.xlsx");

function send(text,chatFN, chatLN){
    
    // Convert the XLSX to JSON
    let worksheets = {};
    for (const sheetName of workbook.SheetNames) {
        worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    }
    let date = new Date();
    worksheets.Sheet1.push({
        "first_name": chatFN,
        "last_name": chatLN,
        "text": text,
        "date": date.toString()
    });
    
    // Update the XLSX file
    XLSX.utils.sheet_add_json(workbook.Sheets["Sheet1"], worksheets.Sheet1)
    XLSX.writeFile(workbook, "//bdserver83/ПРОГИ2023/Ds/bot.xlsx");
}

bot.on('message', msg =>{
    const text = msg.text;
    
    if(msg.text.startsWith("Ошибка:")){
    const chatId = msg.chat.id;
    const chatFN = msg.chat.first_name;
    const chatLN = msg.chat.last_name;
    send(text, chatFN, chatLN);
    bot.sendMessage(chatId, `Сообщение об ошибке отправлено`);
    }
})
