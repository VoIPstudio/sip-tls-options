# sip-tls-options
Nodejs tool to send SIP OPTIONS request.


# Installation:

```
git clone https://github.com/VoIPstudio/sip-tls-options.git
cd sip-tls-options.git
npm install
```

# Usage:

```
node options.js SIP_URI [verbose]
```

# Example

```
node options.js "sip:hello@sip.ashburn.twilio.com;transport=tls" verbose
```