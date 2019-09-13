const nodeMailer = require("nodemailer");

sendEmail = (req, res) => {
  const { firstName, email } = req.body;
  const token = res.locals.token;
  const response = res.locals.response;

  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  });
  const mailOptions = {
    from: process.env.email,
    to: `${email}`,
    subject: `Welcome to Textbook `,
    text: ` Hi ${firstName},
        
	I'd like to personally thank you for joining Textbook. 
	Use this app to stay in touch with friends from all over the world. 
    For all questions and concerns, reply to this email directly!
		
	Alain from Textbook

        `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error sending email", error);
      console.log("token: ", token);
      console.log("response: ", response);

      res.status(400).send({ success: false });
    } else {
      console.log("email sent successfully!", info.response);
      res
        .header("x-auth-token", token)
        .status(200)
        .send(response);
    }
  });
};

module.exports = sendEmail;
