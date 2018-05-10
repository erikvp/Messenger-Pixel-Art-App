// This #include statement was automatically added by the Particle IDE.
#include "Adafruit_GFX.h"
#include <Adafruit_SSD1306.h>

#define OLED_RESET D4
Adafruit_SSD1306 display(OLED_RESET);

#define NUMFLAKES 10
#define XPOS 0
#define YPOS 1
#define DELTAY 2


#define LOGO16_GLCD_HEIGHT 16 
#define LOGO16_GLCD_WIDTH  16 



#if (SSD1306_LCDHEIGHT != 64)
#error("Height incorrect, please fix Adafruit_SSD1306.h!");
#endif

// This #include statement was automatically added by the Particle IDE.
// #include <photon_book.h>

// black GND 
// red 3v3      so do not need the protective resistors below
// white SDA    D0 (N/A: needs resistors 1.5K to 10K since 5V serial)
// yellow SCL   D1 (N/A: needs resistors 1.5K to 10K since 5V serial)

int ledPin2 = D2;

// String getMessage(String command);
bool statusMsg;
bool statusPixel;
bool statusClear;
bool pixelDrawNew = true;
bool msgOnDisplay = false;


void setup() { 
    Serial.begin(9600);
    display.begin(SSD1306_SWITCHCAPVCC, 0x3C);  // 0x7A(8-bit) --> 0x3D(7-bit), 0x78(8-bit) --> 0x3C(7-bit)
    pinMode(ledPin2, OUTPUT); 
    
    // Particle functions used by JavaScript app
    statusMsg = Particle.function("newmsg",getMessage);
    statusPixel = Particle.function("pixelxyc",getPixel);
    statusClear = Particle.function("clearoled",getClearOled);
    
    Serial.println("Start Program");
    display.clearDisplay();   // clears the screen and buffer
  
    display.setTextSize(2);           // from 1-9 sensible actually can be bigger but useless
    display.setTextColor(WHITE); // 'inverted' text
    display.setCursor(0,30);       // 128,64 pixels
    display.clearDisplay();
    display.println("Hello");
    display.display();
    delay(4000);
    // display.clearDisplay();

} //setup()

void loop() {
  // This is just test code to show the Photon is operational
  digitalWrite(ledPin2, HIGH);
  delay(1000);
  digitalWrite(ledPin2, LOW);
  delay(1000);
} //loop()


// Each function gets a string variable from the JavaScript app
// call a function for the Photon
// returns 1 or 0 for the callback function to JavaScript
int getMessage(String msg) {
    // msg is the string entered in JavaScript program
    flashMessage(msg);
    return 1;
}

int getPixel(String xyc) {
    // xyc is is pixel x,y coordinates and color
    flashPixel(xyc);
    return 1;
}

int getClearOled(String clr){
    Serial.println(clr); // should = 'CLEAR'
    if(clr == "CLEAR"){
      flashClearOled();
      return 1;
    } else {
        return 0;
    }
}

//SEND MESSAGE TO DISPLAY
void flashMessage(String message) { 
    // output message to terminal
    Serial.println();
    Serial.println(message);
    msgStatus(statusMsg);
    // output message to OLED
    display.setTextSize(2);           // from 1-9 sensible actually can be bigger but useless
    display.setTextColor(WHITE); // 'inverted' text
    display.setCursor(0,30);       // 128,64 pixels
    display.clearDisplay();
    display.println(message);
    display.display();
    msgOnDisplay = true;
    // delay(4000);
}


// SEND PIXEL TO DISPLAY
void flashPixel(String pixel) { 
    char rowID = pixel.charAt(0); 
    char colID = pixel.charAt(1);
    char color = pixel.charAt(2);
    int intRowID;
    int intColID;

    intRowID = charToInt(rowID) * 8;
    intColID = charToInt(colID) * 8;
    //callback to JS app.
    pixelStatus(statusPixel);

    // output message to terminal
    Serial.println();
    Serial.println(pixel);
    Serial.println(rowID);
    Serial.println(colID);
    Serial.println(color);
    Serial.println(intRowID);
    Serial.println(intColID);
    
    // TEST CODE: output pixel coords 
    // display.setTextSize(2);  
    // display.setTextColor(WHITE);
    // display.setCursor(0,30);       // places in vertical center of display
    // display.clearDisplay();
    // display.println(pixel);
    // delay(2000);
    
    //Clear the display for either case
    //pixelDrawNew: new pixel drawing.  We don't want to clear display when drawing is in progress
    // msgOnDisplay:  clear screen to delete message before drawing pixel art
    if(pixelDrawNew || msgOnDisplay) {
        display.clearDisplay();
        pixelDrawNew = false;
        msgOnDisplay = false;
    }
    
    display.setCursor(0,0);
    
    if(color == 'W'){
        display.fillRect(intColID, intRowID, 8, 8, WHITE);
    } else {
        display.fillRect(intColID, intRowID, 8, 8, BLACK);
    }
    display.display();
    // delay(4000);
}


// CLEAR DISPLAY
void flashClearOled(){
        display.clearDisplay();
        display.display();
        clearStatus(statusClear);
}




// THESE ARE CALLBACK FUNCTIONS TO JAVASCRIPT
// send "pass" result back to JS
void msgStatus(bool result){
    String pass = "pass";

    if (result == 1) {
        Serial.println("msgStatus PASS");
        Particle.publish(pass);
    }
}

// send "pass" result back to JS
void pixelStatus(bool result){
    String pass = "pass";

    if (result == 1) {
        Serial.println("pixelStatus PASS");
        Particle.publish(pass);
    }
}

// send "pass" result back to JS
void clearStatus(bool result){
    String pass = "pass";
    if (result == 1){
        Serial.println("clearStatus PASS");
        Particle.publish(pass);
    }
}


// MAPPING PIXEL COL HEX VALUES TO DEC
// e.g. 'A' = 10
int charToInt(char _colID){

switch (_colID) {
    case '0': return 0;
    case '1': return 1;
    case '2': return 2;
    case '3': return 3;
    case '4': return 4;
    case '5': return 5;
    case '6': return 6;
    case '7': return 7;
    case '8': return 8;
    case '9': return 9;
    case 'A': return 10;
    case 'B': return 11;
    case 'C': return 12;
    case 'D': return 13;
    case 'E': return 14;
    case 'F': return 15;
    default: return 0; // This should never be used
    }
}





