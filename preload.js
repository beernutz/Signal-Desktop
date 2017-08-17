(function () {
  'use strict';

  console.log('preload');
  const electron = require('electron');

  window.PROTO_ROOT = 'protos';
  window.config = require('url').parse(window.location.toString(), true).query;

  const ipc = electron.ipcRenderer
  window.config.localeMessages = ipc.sendSync('locale-data');

  window.setBadgeCount = function(count) {
    ipc.send('set-badge-count', count);
  };
  window.drawAttention = function() {
    console.log('draw attention');
    ipc.send('draw-attention');
  };
  window.showWindow = function() {
    console.log('show window');
    ipc.send('show-window');
  };
  window.restart = function() {
    console.log('restart');
    ipc.send('restart');
  };
  ipc.on('debug-log', function() {
    Whisper.events.trigger('showDebugLog');
  });

  // We pull these dependencies in now, from here, because they have Node.js dependencies

  require('./js/spell_check');
  require('./js/backup');

})();
