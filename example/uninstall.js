var Service = require('node-windows').Service;
var log=require('./logfile');
// Create a new service object
var svc = new Service({
  name:'NodeInterfaceMoveFile',
  script: require('path').join('interfaceMoveFile.js')
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  log.writeLog('Uninstall complete.');
  log.writeLog('The service exists: ',svc.exists);
});

// Uninstall the service.
svc.uninstall();