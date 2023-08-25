export function sendEmail(param) {
    Email.send({
      Host: "smtp.elasticemail.com",
      Username : "devsachaengineering@gmail.com",
      Password : "A0243FBBE872A23DA0C904D1EB07ED401310",
      To : 'chandraworks@6kty4v.onmicrosoft.com',
      From : "devsachaengineering@gmail.com",
      Subject : "Chandra Works | New User Invitation | Dev",
      Body :`Email: ${param[0]}` ,
     
      }).then(
        message => console.log("Message Sent: ",message)
      );
}