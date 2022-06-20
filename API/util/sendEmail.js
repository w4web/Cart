const nodemailer = require("nodemailer");
const sendgridTransport = require('nodemailer-sendgrid-transport');

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport(sendgridTransport({
			auth: {
				api_key: process.env.MAIL_key
			}
		}));

		await transporter.sendMail({
			from: process.env.MAIL_USER,
			to: email,
			subject: subject,
			text: text,
		});

		console.log("email sent successfully to: ", email);

	} catch (error) {

		console.log("email not sent!");
		console.log(error);
		return error;
        
	}
};