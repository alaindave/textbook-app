const nodeMailer = require('nodemailer');

sendMessageEmail = (req, res) => {
	const { message } = req.body;
	const senderFirstName = res.locals.senderFirstName;
	const senderLastName = res.locals.senderLastName;
	const receiver = res.locals.receiver;
	const email = res.locals.email;
	const response = res.locals.response;

	const transporter = nodeMailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.email,
			pass: process.env.password
		}
	});

	const postEmail = {
		from: process.env.email,
		to: `${email}`,
		subject: ` ${senderFirstName} ${senderLastName} sent you a message!`,
		text: ` Hi ${receiver},
        
    ${senderFirstName} wrote the following:
    
           " ${message} "

    Please log in to Textbook to reply. 

	Alain from Textbook
   `
	};

	transporter.sendMail(postEmail, (error, info) => {
		if (error) {
			console.log('error sending email', error);
			res.status(400).send({ success: false });
		} else {
			console.log('message email sent successfully!', info.response);
			res.status(200).send(response);
		}
	});
};

module.exports = sendMessageEmail;
