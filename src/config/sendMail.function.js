const fetch = require('node-fetch');

function sendMail(title, text) {
    try {
        options = {
            method: "POST",
            muteHttpExceptions: true,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                msg: text,
                token: "add33cedc59a1ff5388bcd3e2499941d"
            })
        };
        let response = await fetch("https://script.google.com/a/expertizen.com.ar/macros/s/AKfycbxO5BLORLwaNRpk_GjbkHTdBW0uiYj_NiTzzoImJQ/exec", options);
    } catch (e) {
        console.error(e);
    }
}

module.exports = sendMail