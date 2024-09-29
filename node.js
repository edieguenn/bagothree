const express = require('express');
const bodyParser = require('body-parser');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const app = express();
app.use(bodyParser.json());

// Setup the serial port
const port = new SerialPort('/dev/ttyUSB0', { baudRate: 9600 }); // Adjust the port as per your system
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

// Arduino response listener
parser.on('data', (line) => console.log(`> ${line}`));

// POST route to send SMS
app.post('/send-sms', (req, res) => {
    const { number, message } = req.body;

    // Send command to Arduino to send the SMS
    port.write(`AT+CMGF=1\r`);
    setTimeout(() => {
        port.write(`AT+CMGS="${number}"\r`);
        setTimeout(() => {
            port.write(`${message}\r`);
            setTimeout(() => {
                port.write(String.fromCharCode(26)); // Send Ctrl+Z to complete SMS
            }, 1000);
        }, 1000);
    }, 1000);

    res.json({ success: true, message: 'SMS request sent to Arduino' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
