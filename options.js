var sip = require('sip');
var os = require('os');

if(process.argv < 3 || !sip.parseUri(process.argv[2])) {
  console.error('Usage: node options.js SIP_URI');
  process.exit(1);
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function rstring() { return Math.floor(Math.random()*1e6).toString(); }

let cfg = {
  tls: {
    enableTrace: (process.argv.indexOf('verbose') === -1) ? false : true
  }
};
sip.start(cfg, function(rq) {
  if(rq.headers.to.params.tag) { // check if it's an in dialog request
    sip.send(sip.makeResponse(rq, 481, "Call doesn't exists"));
      
  }  else {
    sip.send(sip.makeResponse(rq, 405, 'Method not allowed'));
  }
});

let message = {
  method: 'OPTIONS',
  uri: process.argv[2],
  headers: {
    to: {uri: process.argv[2]},
    from: {uri: 'sip:test@test', params: {tag: rstring()}},
    'call-id': rstring(),
    cseq: {method: 'OPTIONS', seq: Math.floor(Math.random() * 1e5)},
    contact: [{uri: 'sip:101@' + os.hostname()}]
  }
};

console.log("Sending...");
console.log(sip.stringify(message));

sip.send(message,
function(rs) {
  console.log("");
  console.log("Response:");
  console.log(sip.stringify(rs));
  process.exit(0);
});