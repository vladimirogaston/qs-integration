var nodemailer = require('nodemailer');

var mailOptions = {
    from: 'Remitente',
    to: 'destinatario@gmail.com',
    subject: 'Asunto',
    text: 'Contenido del email'
};

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'example@gmail.com',
        pass: 'password'
    }
});

transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.send(500, err.message);
    } else {
        console.log("Email sent");
        res.status(200).jsonp(req.body);
    }
});