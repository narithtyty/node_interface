
let Client = require('ssh2-sftp-client');
const sftp = new Client();
var chokidar = require('chokidar');
var fs=require('fs');
var pathFile =require('path')
var constant =require('./constant');
const log=require('./logfile');

const config = {
    host: constant.host,
    port: constant.port,
    username: constant.username,
    password: constant.password
};

var data=sftp.connect(config).then(async () => {
          return await sftp.list(constant.SFTPSeverPath); 
});

//var data=sftp.connect(config);

 chokidar.watch(constant.Path, {ignored: /(^|[\/\\])\../,
    persistent: true,

    ignored: constant.filter,
    ignoreInitial: false,
    followSymlinks: true,
    cwd: '.',
    disableGlobbing: false,
  
    usePolling: true,
    interval: 100,
    binaryInterval: 300,
    alwaysStat: false,
    depth: 99,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100
    },
  
    ignorePermissionErrors: false,
    atomic: true
    }).on('all', (event, path) => {
    if(event.trim()=="add"){
        var detailFile = pathFile.parse(path);
        log.writeLog("length "+constant.filter.split(".").length);
        log.writeLog("length1 "+constant.filter.split(".")[0]);
        log.writeLog("length2 "+constant.filter.split(".")[1]);
        data.then(data => {
            let filterFile="."+constant.filter.split(".")[1];
            if(detailFile.ext===filterFile){
                log.writeLog(constant.SFTPSeverPath+detailFile.base);
                sftp.put(path,constant.SFTPSeverPath+"\\"+detailFile.base).then(data => {
                     fs.unlink (path, (err) => {
                        if (err) throw err;
                      });
                    }).catch((err) => {
                });
            }     
        })  
    }
  });

