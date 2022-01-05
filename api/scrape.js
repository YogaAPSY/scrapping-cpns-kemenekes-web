const request = require('request')
const cheerio = require('cheerio')
const notification = require('./telegram')
const fileManagment = require('./file');

process.env.NTBA_FIX_319 = 1;

module.exports = (req,res) => {
    if(req.method == 'GET'){
        try{
            return request({url : 'http://casn.kemkes.go.id/Cpns/pengumuman.html',  "rejectUnauthorized": false},async (error, response, html) => {
            if(!error ){
                const $ = cheerio.load(html);

            const tbody = $('body > div.wrapper > div.fact > div > div > div > div.table100-body.js-pscroll > table > tbody > tr');

            let total = 0;
                tbody.each(function(i, result){
                    total = i;
                })
                
                const path = './input.json';
                const dateNow = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                if (fileManagment.existFile(path)) {
                let lastTotalRow = fileManagment.totalRow('input.json');

                if(total != lastTotalRow){
                    const tanggal = $('body > div.wrapper > div.fact > div > div > div > div.table100-body.js-pscroll > table > tbody > tr:nth-child(1) > td.cell100.column1').text();
                        const namaFile = $('body > div.wrapper > div.fact > div > div > div > div.table100-body.js-pscroll > table > tbody > tr:nth-child(1) > td.cell100.column2').text();
                        const linkFile = $('body > div.wrapper > div.fact > div > div > div > div.table100-body.js-pscroll > table > tbody > tr:nth-child(1) > td.cell100.column3 > a').attr('href');

                    let textAlert = '';
                    let diff = total - lastTotalRow;

                    fileManagment.writeFileJson(total,dateNow)

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
                    
                    await notification.sendNotification(textAlert)
                    // .then(b => console.log(b))
                    // .catch(e => console.log(e))
                }

                }else{
                    fileManagment.writeFileJson(total,dateNow)
                }
            }else{
                await notification.sendNotification(error)
            }

            res.json({
                'status' : true,
                'code' : 200,
                'message' : 'Success',
                'data' : []
            })
        });
        }catch(e){
            res.json({
            'status' : false,
            'code' : 500,
            'message' : '',
            'data' : []
            })
        }
    }else{
        res.json({
            'status' : false,
            'code' : 405,
            'message' : 'Method not allowed',
            'data' : []
        })
    }
}


