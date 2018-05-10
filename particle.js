// **************************************************************************************
// * PARTICLE FUNCTIONS                                                                 *
// **************************************************************************************

function sendMessage() {
  let newMessage = document.getElementById('text-box').value
  let sendCode = { str: newMessage };
  let postURL = 'https://api.particle.io/v1/devices/5b0035000c51353432383931/newmsg?access_token=e53696eadec1c6c5f8402c2cba52a10a509be28d'

  changeText('SENDING');
  console.log('new message:', newMessage);
  /*
  Particle.publish() returns the following to the callback functions in httpPost
  result: {"id":"5b0035000c51353432383931","last_app":"","connected":true,"return_value":1}
  */

  //Note:  fetch might be an ES6 alternative, or axios library
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
  let sendCode = { str: _tdRowColColor };
  let postURL = 'https://api.particle.io/v1/devices/5b0035000c51353432383931/pixelxyc?access_token=e53696eadec1c6c5f8402c2cba52a10a509be28d'

  changeText('SENDING');
  console.log('new pixel row/colID/Color:', _tdRowColColor);
  /*
  Particle.publish() returns the following to the callback functions in httpPost
  result: {"id":"5b0035000c51353432383931","last_app":"","connected":true,"return_value":1}
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
  let sendCode = { str: displayStatus };
  let postURL = 'https://api.particle.io/v1/devices/5b0035000c51353432383931/clearoled?access_token=e53696eadec1c6c5f8402c2cba52a10a509be28d'

  makeGrid(row, col, rowID, colID); // redraw grid to clear it
  changeText('SENDING');
  console.log('CLEAR OLED');
  /*
  Particle.publish() returns the following to the callback functions in httpPost
  result: {"id":"5b0035000c51353432383931","last_app":"","connected":true,"return_value":1}
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