// let sendBtn;
const row = 8;
const col = 16;
const rowID = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const colID = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

let particle = new Particle();


function preload() {

  //  * * * * * * IMPORTANT:  ENTER YOUR username and password * * * * * * 
  particle.login({
    username: 'xyz@xyz.com',
    password: '1234'
  }).then(
    function (data) {
      let token = data.body.access_token;
      console.log('Particle Login Successful:', token);
    },
    function (err) {
      console.log('Particle Login Failed:', err);
    }
  );

}

function setup() {
  makeGrid(row, col, rowID, colID);
  clearOled();
}

function draw() {

}

// EVENT LISTENER FOR CLICKED TABLE <td> CELL
document.addEventListener('click', function (event) {
  let target = event.target; //target: <td class=​"pixel" id=​"0F" onclick=​"changeColor(this)​">​</td>​
  console.log('target:', target);
  let tdId = target.id // "0F"
  if (tdId.length === 2) {
    console.log('Clicked element is a <td> with id:', tdId);
    changeColor(target, tdId);
  }
});


// EVENT LISTENER FOR CLICKED SEND BUTTON
document.getElementById('send-btn').addEventListener('click', sendMessage);
// EVENT LISTENER FOR KEYPRESS ON 'ENTER'
document.addEventListener('keypress', function (event) {
  // event.key returns the name of the key pressed as a string
  if (event.key === 'Enter') {
    console.log('ENTER PRESSED');
    sendMessage();
  }
});
// If clear button is clicked, call clearOled()
document.getElementById('clear-btn').addEventListener('click', clearOled);

// PIXEL GRID CLICK EVENT LISTENER IS DEFINED IN HTML <td>
// onclick="changeColor(this)


// GENERATE PIXEL GRID USING TABLE
function makeGrid(_row, _col, _rowID, _colID) {
  // let canvasTable = document.getElementById('canvasTable'); // table used for drawing artwork
  let table = '';

  console.log('makeGrid');
  //Create grid rows
  for (let r = 0; r < _row; r++) {
    table += '<tr class="pixel">'; // add row opening with <tr> tag
    //Create grid columns
    for (let c = 0; c < _col; c++) {
      //add <td> tags equal to _col
      //each <td> has an id equal to the row/col.  e.g. id=A4
      // OLD - Removed 'onclick' and placed inside sketch.js file
      // table += '<td class="pixel" id=' + _rowID[r] + _colID[c] + ' onclick="changeColor(this)"></td>'; // add cols
      table += '<td class="pixel" id=' + _rowID[r] + _colID[c] + '></td>'; // add cols

      // table += '<td class="pixel" id=' + rowID[r] + colID[c] + '></td>'; // add cols
    }
    //add closing </tr> tag to each completed row
    table += '</tr>';
  }
  // add table elements inside of <table id='pixelTable' class='pixel'></table>
  document.getElementById('pixelTable').innerHTML = table;
}


// UPDATE MESSAGE STATUS TO: "SENDING" or "READY"
function changeText(value) {
  // would .textContent work instead of .innerHTML?
  document.getElementById('status-line').innerHTML = value;

  if (value === 'SENDING') {
    // document.getElementById("status-line").classList.toggle('sending');
    document.getElementById("status-line").className = 'sending';

  } else if (value === 'READY') {
    // document.getElementById("status-line").classList.toggle('complete');
    document.getElementById("status-line").className = 'ready';
    console.log("text box:", document.getElementById('text-box').value);
    document.getElementById('text-box').value = '';
  }
}

// UPDATE LOG WITH TIMESTAMPED MESSAGE
function updateLog(msg) {
  let time = new Date().toLocaleTimeString(); // current time xx:xx:xx AM/PM
  let table = document.getElementById('msg-log'); // target table
  let row = table.insertRow(1); // create a row under header
  let cell1 = row.insertCell(0); // create cell1 for time stamp
  let cell2 = row.insertCell(1); // create cell2 for message
  let rowCount = document.getElementById('msg-log').getElementsByTagName("tr").length; //# of rows in table

  console.log('Table Rows:', rowCount);
  cell1.innerHTML = time;
  cell2.innerHTML = msg;

  //delete oldest message (<tr>) when there are more than 6 rows (1 header row, 5 message logs)
  if (rowCount > 6) {
    document.getElementById("msg-log").deleteRow(-1);
  }
}


// OLD CODE USING "onClick" inside of HTML <td> elements
//TOGGLE TABLE <td> PIXEL COLOR WHITE/BLACK
// "this" = tdHTML: <td class=​"pixel white" id=​"0F" onclick=​"changeColor(this)​">​</td>​
// function changeColor(tdHTML) {
//   let tdRowCol = tdHTML.id;
//   let tdRowColColor;
//   // console.log('tdHTML:', tdHTML);
//   // console.log('clicked td, id=', tdHTML.id);
//   //tdID = e.g.  <td class=​"pixel white" id=​"0F" onclick=​"changeColor(this)​">​</td>​
//   let tdID = document.getElementById(tdHTML.id);
//   let tdClass; // = 'pixel white' OR 'pixel'
//   let tdColor; // = 'W' if pixel is ON, or 'B' if pixel is OFF

//   console.log('tdID:', tdID);
//   console.log('tdID Class', tdID.class);
//   console.log('tdRow:', tdRowCol[0], 'tdCol:', tdRowCol[1]);
//   tdID.classList.toggle('white');
//   tdClass = tdID.classList.value; // = 'pixel white' OR 'pixel'
//   console.log('tdClass', tdClass);

//   tdColor = (tdClass === 'pixel white') ? 'W' : 'B';
//   console.log('tdColor:', tdColor);
//   tdRowColColor = tdRowCol + tdColor;
//   console.log('tdRowCololor:', tdRowColColor);
//   sendPixel(tdRowColColor);

//   console.log('changeColor is OFF:', tdHTML);
// }

function changeColor(_target, _tdId) {

  let tdId = document.getElementById(_target.id);
  let tdClass; // = 'pixel white' OR 'pixel'
  let tdColor; // = 'W' if pixel is ON, or 'B' if pixel is OFF
  let tdRowColColor;


  tdId.classList.toggle('white');
  tdClass = tdId.classList.value;
  console.log('tdClass:', tdClass);

  tdColor = (tdClass === 'pixel white') ? 'W' : 'B';
  console.log('tdColor:', tdColor);
  tdRowColColor = _tdId + tdColor;
  console.log('tdRowColColor:', tdRowColColor);
  sendPixel(tdRowColColor);
}