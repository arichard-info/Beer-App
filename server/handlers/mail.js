const nodeMailer = require("nodemailer");

module.exports = {
  getTransporter: function() {
    return nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
  },

  send: function({ to, html = "", subject = "", content = "" }) {
    const transporter = this.getTransporter();
    if (to) {
      let mailOptions = {
        to,
        subject,
        html,
        content
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
      });
    }
  }
};
