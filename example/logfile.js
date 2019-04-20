const fs=require('fs');
var dateFormat = require('dateformat');
var now = new Date();
const filelog=__dirname+"\\log.txt"

var writeLog= async (data) => {
  var logTxt="["+dateFormat(now)+"] "+data;
  await fs.appendFileSync(filelog,logTxt+"\n");
  return ;
}

module.exports.writeLog=writeLog;


