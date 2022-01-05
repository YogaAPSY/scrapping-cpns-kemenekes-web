const fs = require('fs');

module.exports = {
    writeFileJson: function(total, date) {
        let obj = {
            table: []
        };

        obj.table.push({total,date});

        fs.writeFile("input.json", JSON.stringify(obj), function(err) {
            if (err) throw err;
            console.log('complete');
            }
        );
    },
    existFile: function(path) {
        if (fs.existsSync(path)) {
            return true;
        }else{
            return false;
        }
    },
    totalRow: function(name) {
        let rawdata = fs.readFileSync(name);
        let lastUpdate = JSON.parse(rawdata);
        
        return lastUpdate.table[0].total;
    }
}