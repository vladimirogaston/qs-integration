const fetch = require('node-fetch');

class Mailer {

    sendMail = async function (title, text) {
        let response = undefined
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
            response = await fetch("https://script.google.com/a/expertizen.com.ar/macros/s/AKfycbxO5BLORLwaNRpk_GjbkHTdBW0uiYj_NiTzzoImJQ/exec", options);
        }catch(error){
            console.log("Error to send email: " + error)
        }        
        return response
    }
}

module.exports = Mailer