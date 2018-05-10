// **************************************************************************************
// * PARTICLE FUNCTIONS                                                                 *
// **************************************************************************************

function sendMessage() {
  let newMessage = document.getElementById('text-box').value
  let sendCode = {
    str: newMessage
  };

  // * * * * * * ENTER YOUR DEVICE ID (xxxxxx) and ACCESS TOKEN (yyyyyyy)
  let postURL = 'https://api.particle.io/v1/devices/xxxxxxxxxxx/newmsg?access_token=yyyyyyyyyyyyyyyyyyyyyy'

  changeText('SENDING');
  console.log('new message:', newMessage);
  /*
  Particle.publish() returns the following to the callback functions in httpPost
  result: {"id":"xxxxxxxxxxxxxxx","last_app":"","connected":true,"return_value":1}
  */

  httpPost(
    postURL,
    sendCode,
    function (result) {
      let obj = JSON.parse(result);
      console.log('result:', result); // result is a JSON file
      console.log('JSON:', obj); // convert JSON to object
      console.log('connected:', obj.connected);
      changeText('READY');
    },
    function (err) {
      console.log('ERROR:', err);
    });

  console.log('sendCode:', sendCode);
  updateLog(newMessage);

}

function sendPixel(_tdRowColColor) {
  let sendCode = {
    str: _tdRowColColor
  };

  // * * * * * * IMPORTANT ENTER YOUR DEVICE ID (xxxxxxx) and ACCESS TOKEN (yyyyyyyyyyyy)
  let postURL = 'https://api.particle.io/v1/devices/xxxxxxxxxxxxx/pixelxyc?access_token=yyyyyyyyyyyyyyyyy'

  changeText('SENDING');
  console.log('new pixel row/colID/Color:', _tdRowColColor);
  /*
  Particle.publish() returns the following to the callback functions in httpPost
  result: {"id":"xxxxxxxxxxxxxxxxxx","last_app":"","connected":true,"return_value":1}
  */

  httpPost(
    postURL,
    sendCode,
    function (result) {
      let obj = JSON.parse(result);
      console.log('result:', result); // result is a JSON file
      console.log('JSON:', obj); // convert JSON to object
      console.log('connected:', obj.connected);
      changeText('READY');
    },
    function (err) {
      console.log('ERROR:', err);
    });

  console.log('sendCode:', sendCode);

}

function clearOled() {
  let displayStatus = document.getElementById('clear-btn').value
  let sendCode = {
    str: displayStatus
  };
  // * * * * * * IMPORTANT ENTER YOUR DEVICE ID (xxxxxxx) and ACCESS TOKEN (yyyyyyyyyyyy)
  let postURL = 'https://api.particle.io/v1/devices/xxxxxxxxxx/clearoled?access_token=yyyyyyyyyyyyyyy'

  makeGrid(row, col, rowID, colID); // redraw grid to clear it
  changeText('SENDING');
  console.log('CLEAR OLED');
  /*
  Particle.publish() returns the following to the callback functions in httpPost
  result: {"id":"xxxxxxxxxxxxxx","last_app":"","connected":true,"return_value":1}
  */

  httpPost(
    postURL,
    sendCode,
    function (result) {
      let obj = JSON.parse(result);
      console.log('result:', result); // result is a JSON file
      console.log('JSON:', obj); // convert JSON to object
      console.log('connected:', obj.connected);
      changeText('READY');
    },
    function (err) {
      console.log('ERROR:', err);
    });

  console.log('sendCode:', sendCode);

}