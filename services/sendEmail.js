const nodeMailer = require('nodemailer');

sendEmail = (req, res) => {
	const { firstName, lastName, startDate, endDate, adminEmail, adminName } = req.body;

	const transporter = nodeMailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.email,
			pass: process.env.email_password
		}
	});
	const mailOptions = {
		from: process.env.email,
		to: `${adminEmail}`,
		subject: `Days off request for ${firstName} ${lastName} `,
		text: ` Hello ${adminName},
        
    ${firstName} ${lastName} will be off from ${startDate} to ${endDate}.
		
Thanks

 Your electronic manager
        `
	};
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('error sending email', error);
			res.status(400).send({ success: false });
		} else {
			console.log('email sent successfully!', info.response);
			res.status(200).send({ success: true });
		}
	});
};

module.exports = sendEmail;
