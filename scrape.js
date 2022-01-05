const request = require('request')
const cheerio = require('cheerio')
const axios = require('axios')
const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs');
process.env.NTBA_FIX_319 = 1;

request({url : 'http://casn.kemkes.go.id/Cpns/pengumuman.html',  "rejectUnauthorized": false}, (error, response, html) => { 
    if(!error ){
        const $ = cheerio.load(html);

        const tanggal = $('body > div.wrapper > div.fact > div > div > div > div.table100-body.js-pscroll > table > tbody > tr:nth-child(1) > td.cell100.column1').text();
        const namaFile = $('body > div.wrapper > div.fact > div > div > div > div.table100-body.js-pscroll > table > tbody > tr:nth-child(1) > td.cell100.column2').text();
        const linkFile = $('body > div.wrapper > div.fact > div > div > div > div.table100-body.js-pscroll > table > tbody > tr:nth-child(1) > td.cell100.column3 > a').attr('href');

       const tbody = $('body > div.wrapper > div.fact > div > div > div > div.table100-body.js-pscroll > table > tbody > tr');

       let total = 0;
        tbody.each(function(i, result){
            total = i;
        })
        
        let obj = {
            table: []
        };
        const path = './input.json';
        const dateNow = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        if (fs.existsSync(path)) {
        let rawdata = fs.readFileSync('input.json');
        let lastUpdate = JSON.parse(rawdata);
        
        let lastTotalRow = lastUpdate.table[0].total;
        
        if(total != lastTotalRow){
            let textAlert = '';
            let diff = total - lastTotalRow;

            obj.table.push({total: total, date:dateNow});

            fs.writeFile ("input.json", JSON.stringify(obj), function(err) {
                if (err) throw err;
                console.log('complete');
                }
            );
            if(diff > 1){
                tbody.each(function(i, result){
                    total = i;
                })

                let pengumuman = '';
                for(j = 1; j <= diff; j ++){
                    const namaFile = $('body > div.wrapper > div.fact > div > div > div > div.table100-body.js-pscroll > table > tbody > tr:nth-child('+j+') > td.cell100.column2').text();
                    const linkFile = $('body > div.wrapper > div.fact > div > div > div > div.table100-body.js-pscroll > table > tbody > tr:nth-child('+j+') > td.cell100.column3 > a').attr('href');

                    pengumuman += "\n\n**" + namaFile + "**\n\n" + linkFile;

                }

                textAlert = "#PENGUMUMAN\n\nHallo, Pejuang NIP CPNS KEMENKES.\n\nTerdapat "+ diff +" Upload terbaru pada laman :\nhttp://casn.kemkes.go.id/Cpns/pengumuman.html\n\nPada tanggal " + tanggal +", \n\nDengan list file : "+ pengumuman;

            }else{
                textAlert = "#PENGUMUMAN\n\nHallo, Pejuang NIP CPNS KEMENKES.\n\n Terdapat "+ diff +" Upload terbaru pada laman :\nhttp://casn.kemkes.go.id/Cpns/pengumuman.html\n\n Pada tanggal " + tanggal +",\n\nDengan nama file : \n\n\r**" + namaFile + "**\n\n" + linkFile;
            }
          
            const token = '2081986929:AAEmWK23rULdeLYYU4cVsSzvoif0UfBx3AQ';
            const bot = new TelegramBot(token, {polling: true});

            bot.sendMessage('-1001791902476', textAlert);
        }

        }else{
            obj.table.push({total: total, date:dateNow});

            fs.writeFile ("input.json", JSON.stringify(obj), function(err) {
                if (err) throw err;
                    console.log('complete');
                }
            );
        }
    }else{
        const token = '2081986929:AAEmWK23rULdeLYYU4cVsSzvoif0UfBx3AQ';
        const bot = new TelegramBot(token, {polling: true});

        bot.sendMessage('-1001791902476', error);
    }
})