var Service = require('node-windows').Service;
var log=require('./logfile');
// Create a new service object
var svc = new Service({
  name:'NodeInterfaceMoveFile',
  description: 'NodeInterfaceMoveFile.',
  script: require('path').join('interfaceMoveFile.js'),    //script: require('path').join('helloworld.js'),
  env:{
    name: "NODE_ENV",
    value: "production"
  }
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

// Just in case this file is run twice.
svc.on('alreadyinstalled',function(){
  log.writeLog('This service is already installed.');
});

// Listen for the "start" event and let us know when the
// process has actually started working.
svc.on('start',function(){
  log.writeLog(svc.name+' started!');
});

// Install the script as a service.
svc.install();
