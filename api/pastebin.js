const PastebinAPI = require('pastebin-ts');

const pastebin = new PastebinAPI({
    'api_dev_key' : 'eYAYGA4NLyE5p3VLkieefqqYqtaRA-Nb',
    'api_user_name' : 'griyabuntu29',
    'api_user_password' : 'Qwerty123456'
});

module.exports = {
    getTotal: async function() {
        try{
            let paste = await pastebin.listUserPastes()
            const {paste_key} = paste[paste.length - 1] || {};
        
            return await pastebin.getPaste(paste_key)
        }catch(e){
            console.log(e)
            return false;
        }
       
    },
    setTotal: async function(total) {
        await pastebin
        .createPaste({
            text:total.toString(),
            title: 'total',
            privacy: 2,
            expiration: '10M'
        })
        .then((data) => {
            console.log(data);
            return true;
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
    },
    // deleteTotal: function(id) {
    //     await pastebin.deletePaste(id).then((data) => {
    //         console.log(data);
    //         return true;
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         return false;
    //     });
    // }
}