# Messenger-Pixel-Art-App #

## IMPORTANT ##
Add your username, password, device id and token to the sketch.js and particle.js file

*EXAMPLE (sketch.js)*  
`particle.login({
    username: 'xyz@xyz.com',
    password: '1234'`

*EXAMPLE (particle.js - sendMessage(), sendPixel(), clearOled())*  
enter your device id in place of 'xxxxxxxxxxxx' and your access_token in place of 'yyyyyyyyyyyyyyyyy'.  Do this in all three functions.
`let postURL = 'https://api.particle.io/v1/devices/xxxxxxxxxxx/newmsg?access_token=yyyyyyyyyyyyyyyyyyyyyy'`
