const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 5000;

//config file reference
const config = require('./config');

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.locals.msg = '';
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/send', (req, res) => {
  let output = `
       Name: ${req.body.name}  <br/>
       Email: ${req.body.email}  <br/>
       Subject: ${req.body.subject}  <br/>
       Message: ${req.body.message}  <br/>
       Type: ${req.body.option1}  <br/>
  `;
  let output_plain = `
Name: ${req.body.name}  
Email: ${req.body.email}  
Subject: ${req.body.subject}  
Message: ${req.body.message}  
Type: ${req.body.option1}
  `;

    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: process.env.EMAILSERVICE,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
 
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: process.env.USER, // sender address
      to: process.env.USER, // list of receivers
      subject: config.subject, // Subject line
      text: output_plain, // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
		  res.status(200).send("There was an error sending message. Please contact admin. \n\n"+ (error));
		  console.log("User name for login was: " + (transporter.transporter.auth.user));
          return console.log(error);
      } else {
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	  res.status(200).send("Email successfully sent to " + mailOptions.to);
	  }
  });
});

server.listen(port, () => console.log(`App running on port ${port}`));
