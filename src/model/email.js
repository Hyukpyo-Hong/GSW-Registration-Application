const nodemailer = require('nodemailer');


exports.sendEmail = (receiver_address) => {

    // create reusable ansporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: '"Yahoo"',
        auth: {
            user: 'gswregister@yahoo.com',
            pass: 'database!'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"GSW Registration Application" <gswregister@yahoo.com>', // sender address
        to: receiver_address, // list of receivers
        subject: 'GSW_Registration Password Initialize', // Subject line    
        html: 'Your GSW Register application password reset as <h1>abcd1234</h1>' // html body
    };
    return new Promise(
        function (resolve, reject) {
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                    console.log('Message: ' + info.messageId + '/  sent: ' + info.response);
                    resolve("Email sent succeed!");
                }
            });
        });
}

