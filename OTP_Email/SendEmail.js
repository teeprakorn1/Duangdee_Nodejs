// Import required modules
require('dotenv').config();
const nodemailer = require('nodemailer');

// Function to send OTP email
async function sendOTPEmail(toEmail, OTP, Value) {
  let mailOptions;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Check the Value to determine which email to send
  if (Value == 0) { // send Password Changed Successfully email
    mailOptions = {
      from: `"DuangDee Service" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: 'Password Changed Successfully',
      text: `Your password has been changed successfully. If you did not request this, please contact support immediately.`,
      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        <head>
          <meta charset="UTF-8">
          <meta content="width=device-width, initial-scale=1" name="viewport">
          <meta name="x-apple-disable-message-reformatting">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta content="telephone=no" name="format-detection">
          <title>Password Changed Successfully</title>
          <style type="text/css">
            /* CSS styles */
            body { font-family: Arial, sans-serif; }
            .container { background-color: #F6F6F6; padding: 20px; }
            .email-content { background-color: #FFFFFF; padding: 20px; border-radius: 10px; }
            .header { font-size: 24px; color: #322d2d; text-align: center; }
            .footer { font-size: 14px; color: #666666; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email-content">
              <h1 class="header">Password Changed Successfully</h1>
              <p style="text-align: center;">Your password has been changed successfully. If you did not request this change, please contact support immediately.</p>
              <img src="https://example.com/path/to/your/image.jpg" alt="DuangDee Logo" width="350" style="display: block; margin: auto;">
              <p class="footer">If you have additional problems, please contact support.</p>
            </div>
          </div>
        </body>
      </html>`
    };
  } else if (Value == 1) { // send OTP Register email
    mailOptions = {
      from: `"DuangDee Service" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: 'Your OTP Code for Registration',
      text: `Your OTP code for registration is ${OTP}`,
      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        <head>
          <meta charset="UTF-8">
          <meta content="width=device-width, initial-scale=1" name="viewport">
          <meta name="x-apple-disable-message-reformatting">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>OTP Code for Registration</title>
          <style type="text/css">
            /* CSS styles */
            body { font-family: Arial, sans-serif; }
            .container { background-color: #F6F6F6; padding: 20px; }
            .email-content { background-color: #FFFFFF; padding: 20px; border-radius: 10px; }
            .header { font-size: 24px; color: #322d2d; text-align: center; }
            .otp-code { font-size: 32px; color: #E20001; text-align: center; padding: 10px 20px; background-color: #f6f6f6; border-radius: 5px; }
            .footer { font-size: 14px; color: #666666; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email-content">
              <h1 class="header">Your OTP Code</h1>
              <p style="text-align: center;">Thank you for registering with DuangDee Service. Please use the OTP code below to complete your registration:</p>
              <div class="otp-code">${OTP}</div>
              <p class="footer">If you did not request this code, please ignore this email.</p>
            </div>
          </div>
        </body>
      </html>`
    };
  } else if (Value == 2) { // send OTP Reset Password email
    mailOptions = {
      from: `"DuangDee Service" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: 'Your OTP Code for Password Reset',
      text: `Your OTP code for resetting your password is ${OTP}`,
      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        <head>
          <meta charset="UTF-8">
          <meta content="width=device-width, initial-scale=1" name="viewport">
          <meta name="x-apple-disable-message-reformatting">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>Reset Password OTP Code</title>
          <style type="text/css">
            /* CSS styles */
            body { font-family: Arial, sans-serif; }
            .container { background-color: #F6F6F6; padding: 20px; }
            .email-content { background-color: #FFFFFF; padding: 20px; border-radius: 10px; }
            .header { font-size: 24px; color: #322d2d; text-align: center; }
            .otp-code { font-size: 32px; color: #E20001; text-align: center; padding: 10px 20px; background-color: #f6f6f6; border-radius: 5px; }
            .footer { font-size: 14px; color: #666666; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email-content">
              <h1 class="header">Password Reset Code</h1>
              <p style="text-align: center;">We have received a request to reset your password. Please use the OTP code below to proceed with resetting your password:</p>
              <div class="otp-code">${OTP}</div>
              <p class="footer">If you did not request a password reset, please ignore this email.</p>
            </div>
          </div>
        </body>
      </html>`
    };
  } else {
    return false;
  }

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

module.exports = sendOTPEmail;
