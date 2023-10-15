// step 1:npm init  
// step 2:npm i mongoose express cors jsonwebtoken  
// step 3:to install dev dependencies:npm i -D nodemon concurrently     
// to run server: npm run server



// "start": "node server",
//     "server": "nodemon server",
//     "client": "npm start --prefix client",
//     "dev": "concurrently \"npm run server\" \"npm run client\" "


//to run only backend use:npm run server
// to run front end along with backend use: npm run dev
// to check in talend API tester in POST method Set header as: Content-Type:application/json
// to check in talend API tester in GET method for login page Set header as: x-token:{----token generated----}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt=require("jsonwebtoken")
const SlideSchema = require("./models/SlideSchema");
const cors=require("cors");//used to use API's of backend in frontend
const Registeruser = require("./models/schema.js");
const EventSchema=require("./models/EventSchema");
const DonationSchema=require("./models/Donationrecordsschema");
const ApplyforvolunteerSchema=require("./models/ApplyforvolunteerSchema");
const MarqueeSchema=require("./models/MarqueeSchema")
const middleware=require("./middleware")
require('dotenv').config();
// const jwt=require("jsonwebtoken")
app.use(express.json()); // Added line to include the express.json() middleware
app.use(cors({origin:'*'}))

// app.get('/', (req, res) => {
//     res.send("helloo");
//     return res.json("hello");
//   });




// app.get('/myprofile',middleware,async(req,res)=>{
//   try{
//       let exist=await Registeruser.findById(req.user.id);
//       if(!exist){
//           return res.status(400).send("user not found");
//       }
//       res.json(exist);
//   }
//   catch(err){
//       console.log(err);
//       return res.status(500).send('Server Error!!')
//   }
// })
// app.post('/addslides',middleware, async (req, res) => {
app.post('/addslides',middleware, async (req, res) => {
    const {Main_text,Sub_text,filechoosen} = req.body;
    try {
      const newData = new SlideSchema({
        Main_text: Main_text,
        Sub_text: Sub_text,
        filechoosen:filechoosen
      });
      await newData.save();
      // res.send(todo);
      return res.json(await SlideSchema.find());
    } catch (err) {
      console.log(err);
    }
  });
  app.get('/getslides', async (req, res) => {
    try {
      return res.json(await SlideSchema.find());
    } catch (err) {
      console.log(err);
    }
  }); 
  // app.post('/addevents',middleware, async (req, res) => {
  app.post('/addevents',middleware, async (req, res) => {
    const {Title,Location,Timings,phone,OrganisedBy,filechoosen} = req.body;
    try {
      const newData = new EventSchema({
        Title: Title,
        Location: Location,
        Timings:Timings,
        phone:phone,
        OrganisedBy:OrganisedBy,
        filechoosen:filechoosen
      });
      await newData.save();
      // res.send(todo);
      return res.json(await EventSchema.find());
    } catch (err) {
      console.log(err);
    }
  });
  
  app.get('/getevents', async (req, res) => {
    try {
      return res.json(await EventSchema.find());
    } catch (err) {
      console.log(err);
    }
  });
  app.post('/updateevent',middleware, async (req, res) => {
    const {id,E_Title,E_Location,E_OrganisedBy}=req.body;
    try {
      // return res.json(await EventSchema.findById(id));
      // console.log(res.json(await EventSchema.findById(id)));
      // return res.json(await EventSchema.findById(id));


      await EventSchema.updateOne({ "_id": id }, { $set: { "Title": E_Title,"Location":E_Location,"OrganisedBy":E_OrganisedBy } });
// appliedvolunteer = await EventSchema.find({"_id": id });

return res.json(await EventSchema.find({"_id": id }));
    } catch (err) {
      console.log(err);
    }
  });

  
  app.post('/updatemarqueecontent',middleware, async (req, res) => {
    const {marquee}=req.body;
    console.log("in server.js:",req.body)
    try {
      // const newData = new MarqueeSchema({
      //   Content:marquee
      // });
      // await newData.save();

      await MarqueeSchema.updateOne({ "_id": '651f20d88e490a312ca14269' }, { $set: { "Content":marquee} });


return res.json(await MarqueeSchema.find());
    } catch (err) {
      console.log(err);
    }
  });
  app.get('/getmarqueecontent', async (req, res) => {
    try {
      // Assuming you have already imported and defined your MarqueeSchema
  
      // Use findOne() instead of find() since you are looking for a single document by its ID
      const marqueeContent = await MarqueeSchema.findOne({ _id: '651f20d88e490a312ca14269' });
  
      if (!marqueeContent) {
        // Handle the case where the document is not found
        return res.status(404).json({ error: 'Marquee content not found' });
      }
  
      return res.json(marqueeContent);
    } catch (err) {
      console.error(err);
      // Handle other errors and send an appropriate response
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.post('/deletecarousel',middleware, async (req, res) => {
    console.log(req.body);
    const {id}=req.body;
    try {
      // return res.json(await EventSchema.findById(id));
      // console.log(res.json(await EventSchema.findById(id)));
      // return res.json(await EventSchema.findById(id));

// console.log(id);
      await SlideSchema.deleteOne({ "_id": id });


// appliedvolunteer = await EventSchema.find({"_id": id });

return res.json(await EventSchema.find());
    } catch (err) {
      console.log(err);
    }
  });
  app.post('/deleteevent',middleware, async (req, res) => {
    // console.log(req.body);
    const {id}=req.body;
    try {
      // return res.json(await EventSchema.findById(id));
      // console.log(res.json(await EventSchema.findById(id)));
      // return res.json(await EventSchema.findById(id));

// console.log(id);
      await EventSchema.deleteOne({ "_id": id });


// appliedvolunteer = await EventSchema.find({"_id": id });

return res.json(await EventSchema.find());
    } catch (err) {
      console.log(err);
    }
  });
  app.post('/deleteappliedvolunteer',middleware, async (req, res) => {
    // console.log(req.body);
    const {id}=req.body;
    try {
      // return res.json(await EventSchema.findById(id));
      // console.log(res.json(await EventSchema.findById(id)));
      // return res.json(await EventSchema.findById(id));

// console.log(id);
      await ApplyforvolunteerSchema.deleteOne({ "_id": id });


// appliedvolunteer = await EventSchema.find({"_id": id });

return res.json(await ApplyforvolunteerSchema.find({accept:-1}));
    } catch (err) {
      console.log(err);
    }
  });
  app.post('/updatecarousel',middleware, async (req, res) => {
    const {id,E_Main_text,E_Sub_text}=req.body;
    console.log(req.body);
    try {
      // return res.json(await EventSchema.findById(id));
      // console.log(res.json(await EventSchema.findById(id)));
      // return res.json(await EventSchema.findById(id));


      await SlideSchema.updateOne({ "_id": id }, { $set: { "Main_text": E_Main_text,"Sub_text":E_Sub_text} });
// appliedvolunteer = await EventSchema.find({"_id": id });

return res.json(await SlideSchema.find());
    } catch (err) {
      console.log(err);
    }
  });
  app.post('/applyforvolunteer', async (req, res) => {
    const {volunteer_name,email,Blood_donar,phone,state,District,address,Blood_grp,Gender,Profession,user_id,user_photo,additionalInfo} = req.body;
    console.log(req.body);
    try {
      const newData = new ApplyforvolunteerSchema({
        volunteer_name: volunteer_name,
        email: email,
        phone:phone,
        state:state,
        District:District,
        address:address,
        availability:'',
        Blood_donar:Blood_donar,
        Blood_grp:Blood_grp,
        Gender: Gender,
        Profession:Profession,
        user_id:user_id,
        user_photo:user_photo,
        additionalInfo:additionalInfo

      });
      await newData.save();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "node.mailer144@gmail.com",
          pass: "tilt ldbh pesw igca"
        }
      });
  
      const mailOptions = {
        from: "sunforindia@gmail.com",
        to: email,
        subject: "SUN NGO",
        // html: "Thank you for the Application , Our team will review your application and will get back to you with in 2 working days!!  any queries please contact to Co-ordinator:+91 72075 66702(Mr .K. Sai Kumar) , Gmail:sunforindia@gmail.com"
        html:`
        <html>
<head>
  <style>
    /* Document-like CSS styling with colors, 12px font size, and border */
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 30px;
      border: 1px solid #003a69; /* Border added with color #003a69 */
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      line-height: 1.6;
    }
    h1 {
      color: #003a69; /* Blue */
      font-size: 28px;
      text-align: center;
    }
    h2 {
      color: #333;
      font-size: 24px;
      margin-top: 20px;
    }
    p {
      font-size: 12px;
      margin-bottom: 6px;
      color: #555; /* Dark Gray */
    }
    .contact-info {
      margin-top: 20px;
      border-top: 1px solid #ccc;
      padding-top: 20px;
    }
    .signature {
      font-style: italic;
      margin-top: 20px;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Application Confirmation</h1>
    <h2>Dear ${volunteer_name},</h2>
    <p>Thank you for the Application</p>
    <h4>Our team will review your application and will get back to you within 2 working days.</h4>
   
    <p>If you have any queries or need further assistance, please do not hesitate to contact our Coordinator:</p>
    <div class="contact-info">
      <p><strong>Name:</strong> Mr. K. Sai Kumar</p>
      <p><strong>Contact Number:</strong> +91 72075 66702</p>
      <p><strong>Email:</strong> sunforindia@gmail.com</p>
    </div>
    <p class="signature">Best regards,<br>The SUN NGO Team</p>
  </div>
</body>
</html>`
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      // res.send(todo);
      return res.json(await ApplyforvolunteerSchema.find());
    } catch (err) {
      console.log(err);
    }
  });
  app.get('/appliedforvolunteer',middleware, async (req, res) => {
    try {
      return res.json(await ApplyforvolunteerSchema.find({accept:0}));
    } catch (err) {
      console.log(err);
    }
  });


  
function generateCustomUUID() {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(-2); // Get the last two digits of the year
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to the month since it's 0-based
  const day = currentDate.getDate().toString().padStart(2, '0');
  const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

  const customUUID = `SUN${year}${month}${day}${randomPart}`;
  return customUUID;
}

  app.post('/appliedforvolunteer',middleware, async (req, res) => {
    const {email,selectedOption,accept} = req.body;
    try {
      let studentId;
      do {
          studentId = generateCustomUUID();
          console.log(studentId);
      } while (await ApplyforvolunteerSchema.findOne({ studentId }));

      // const appliedvolunteer=await ApplyforvolunteerSchema.find({email:email});
      // await appliedvolunteer.updateOne({"email":email},{$set:{"accept":accept}});
      let appliedvolunteer = await ApplyforvolunteerSchema.find({ email: email });
      let volunteerdetails=await ApplyforvolunteerSchema.findOne({ email: email });
      console.log(volunteerdetails);
await ApplyforvolunteerSchema.updateOne({ email: email }, { $set: { "accept": accept,"position":selectedOption,"studentId":studentId } });
appliedvolunteer = await ApplyforvolunteerSchema.find({ accept: 0 });
      // await  appliedvolunteer.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "node.mailer144@gmail.com",
          pass: "tilt ldbh pesw igca"
        }
      });
  
      const mailOptions = {
        from: "sunforindia@gmail.com",
        to: [email],
        subject: "SUN NGO",
        html: `
        <html>
        <head>
          <style>
            /* Document-like CSS styling with colors, 12px font size, and border */
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 30px;
              border: 1px solid #003a69; /* Border added with color #003a69 */
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              line-height: 1.6;
            }
            h1 {
              color: #003a69; /* Blue */
              font-size: 28px;
              text-align: center;
            }
            h2 {
              color: #333;
              font-size: 24px;
              margin-top: 20px;
            }
            p {
              font-size: 12px;
              margin-bottom: 6px;
              color: #555; /* Dark Gray */
            }
            .contact-info {
              margin-top: 20px;
              border-top: 1px solid #ccc;
              padding-top: 20px;
            }
            .signature {
              font-style: italic;
              margin-top: 20px;
              font-size: 12px;
              color: #888;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Volunteer Confirmation</h1>
     
            <h2>Dear ${volunteerdetails.volunteer_name},</h2>
            <p>Congratulations </p>
            <p>You have been selected as a <strong>${selectedOption}</strong> team member at SUN NGO.</p>
            <h2>Your Details:</h2>
            <p><strong>Name:</strong> ${volunteerdetails.volunteer_name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>SUN ID:</strong> ${studentId}</p>
            <p>If you have any queries or need further assistance, please do not hesitate to contact our Coordinator:</p>
            <div class="contact-info">
              <p><strong>Name:</strong> Mr. K. Sai Kumar</p>
              <p><strong>Contact Number:</strong> +91 72075 66702</p>
              <p><strong>Email:</strong> sunforindia@gmail.com</p>
            </div>
            <p class="signature">Best regards,<br>The SUN NGO Team</p>
          </div>
        </body>
      </html>`
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return res.json(appliedvolunteer);
    } catch (err) {
      console.log(err);
    }
  });
  app.post('/deniedforvolunteer',middleware, async (req, res) => {
    const {email,accept} = req.body;
    try {
      // const appliedvolunteer=await ApplyforvolunteerSchema.find({email:email});
      // await appliedvolunteer.updateOne({"email":email},{$set:{"accept":accept}});
      let appliedvolunteer = await ApplyforvolunteerSchema.find({ email: email });
await ApplyforvolunteerSchema.updateOne({ email: email }, { $set: { "accept": accept } });
appliedvolunteer = await ApplyforvolunteerSchema.find({ accept: -1 });
      // await  appliedvolunteer.save();
      return res.json(appliedvolunteer);
    } catch (err) {
      console.log(err);
    }
  });
  app.get('/deniedforvolunteer',middleware, async (req, res) => {
    try {
      return res.json(await ApplyforvolunteerSchema.find({accept:-1}));
    } catch (err) {
      console.log(err);
    }
  });

  // app.get('/getslides', async (req, res) => {
  //   try {
  //     return res.json(await SlideSchema.find());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });


  // const newDonation = new donationSchema({
  //   name: name,
  //   email: email,
  //   phoneNumber:phoneNumber,
  //   transactionId:transactionId,
  //   paymentMethod:paymentMethod,
  //   amount:amount,

  //   qrCodeScan:qrCodeScan,
  //   additionalInformation:additionalInformation,

  // });
  // await newDonation.save();
  // // res.send(todo);
  // return res.json(await DonationSchema.find());


  const nodemailer = require("nodemailer");

  // ... (other code)
  
  app.post('/donationrecords', async (req, res) => {
    // console.log(req.body);
    const { name, email, phoneNumber, transactionId, paymentMethod, amount, qrCodeScan, additionalInformation } = req.body;
    try {
      console.log(req.body);
  
      const newDonation = new DonationSchema({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        transactionId: transactionId,
        paymentMethod: paymentMethod,
        amount: amount,
        qrCodeScan: qrCodeScan,
        additionalInformation: additionalInformation,
      });
  
      // console.log(newDonation);
      await newDonation.save();
  
    
      // const transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: "node.mailer144@gmail.com",
      //     pass: "tilt ldbh pesw igca"
      //   },
 
      // });
  
      // const mailOptions = {
      //   from: "sunforindia@gmail.com",
      //   to: email,
      //   subject: "SUN NGO Contribution Confirmation",
      //   html: `
      //     <html>
      //       <head>
      //         <style>
      //           /* Document-like CSS styling with colors, 12px font size, and border */
      //           body {
      //             font-family: Arial, sans-serif;
      //             background-color: #f4f4f4;
      //             margin: 0;
      //             padding: 0;
      //           }
      //           .container {
      //             max-width: 600px;
      //             margin: 0 auto;
      //             background-color: #ffffff;
      //             padding: 30px;
      //             border: 1px solid #003a69; /* Border added with color #003a69 */
      //             border-radius: 8px;
      //             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      //             line-height: 1.6;
      //           }
      //           h1 {
      //             color: #003a69; /* Blue */
      //             font-size: 28px;
      //             text-align: center;
      //           }
      //           h2 {
      //             color: #333;
      //             font-size: 24px;
      //             margin-top: 20px;
      //           }
      //           p {
      //             font-size: 12px;
      //             margin-bottom: 6px;
      //             color: #555; /* Dark Gray */
      //           }
      //           .contact-info {
      //             margin-top: 20px;
      //             border-top: 1px solid #ccc;
      //             padding-top: 20px;
      //           }
      //           .signature {
      //             font-style: italic;
      //             margin-top: 20px;
      //             font-size: 12px;
      //             color: #888;
      //           }
      //         </style>
      //       </head>
      //       <body>
      //         <div class="container">
      //           <h1>Contribution Confirmation</h1>
      //           <h2>Dear Contributor,</h2>
      //           <p>We are writing to express our sincere gratitude for your generous contribution to SUN NGO. Your support helps us make a meaningful impact on the lives of those in need.</p>
      //           <h2>Details:</h2>
      //           <p><strong>Name:</strong> ${name}</p>
      //           <p><strong>Email:</strong> ${email}</p>
      //           <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      //           <p><strong>Transaction ID:</strong> ${transactionId}</p>
      //           <p><strong>Payment Method:</strong> ${paymentMethod}</p>
      //           <p><strong>Additional Information:</strong> ${additionalInformation}</p>
      //           <p>If you have any queries or need further assistance, please do not hesitate to contact our Coordinator:</p>
      //           <div class="contact-info">
      //             <p><strong>Name:</strong> Mr. K. Sai Kumar</p>
      //             <p><strong>Contact Number:</strong> +91 72075 66702</p>
      //             <p><strong>Email:</strong> sunforindia@gmail.com</p>
      //           </div>
      //           <p class="signature">Best regards,<br>The SUN NGO Team</p>
      //         </div>
      //       </body>
      //     </html>
      //   `
      // };
      
      
      
  
      // transporter.sendMail(mailOptions, function (error, info) {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log("Email sent: " + info.response);
      //   }
      // });
  
      return res.json("hieee");
    } catch (err) {
      console.log(err);
    }
  });
  app.post('/verifydonationrecords',middleware, async (req, res) => {
    // console.log(req.body);
    const {id} = req.body;
    const donar=await DonationSchema.findOne({"_id":id});
    try {
      // console.log(req.body);
      await DonationSchema.updateOne({ "_id": id }, { $set: {  verifystatus:true} });
  
      // After successfully saving the donation record, send the email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "node.mailer144@gmail.com",
          pass: "tilt ldbh pesw igca"
        },

      });
  
      const mailOptions = {
        from: "sunforindia@gmail.com",
        to: donar.email,
        subject: "SUN NGO Contribution Confirmation",
        html: `
          <html>
            <head>
              <style>
                /* Document-like CSS styling with colors, 12px font size, and border */
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 30px;
                  border: 1px solid #003a69; /* Border added with color #003a69 */
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  line-height: 1.6;
                }
                h1 {
                  color: #003a69; /* Blue */
                  font-size: 28px;
                  text-align: center;
                }
                h2 {
                  color: #333;
                  font-size: 24px;
                  margin-top: 20px;
                }
                p {
                  font-size: 12px;
                  margin-bottom: 6px;
                  color: #555; /* Dark Gray */
                }
                .contact-info {
                  margin-top: 20px;
                  border-top: 1px solid #ccc;
                  padding-top: 20px;
                }
                .signature {
                  font-style: italic;
                  margin-top: 20px;
                  font-size: 12px;
                  color: #888;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Contribution Confirmation</h1>
                <h2>Dear Contributor,</h2>
                <p>We are writing to express our sincere gratitude for your generous contribution to SUN NGO. Your support helps us make a meaningful impact on the lives of those in need.</p>
                <h2>Details:</h2>
                <p><strong>Name:</strong> ${donar.name}</p>
                <p><strong>Email:</strong> ${donar.email}</p>
                <p><strong>Phone Number:</strong> ${donar.phoneNumber}</p>
                <p><strong>Transaction ID:</strong> ${donar.transactionId}</p>
                <p><strong>Payment Method:</strong> ${donar.paymentMethod}</p>
                <p><strong>Additional Information:</strong> ${donar.additionalInformation}</p>
                <p>If you have any queries or need further assistance, please do not hesitate to contact our Coordinator:</p>
                <div class="contact-info">
                  <p><strong>Name:</strong> Mr. K. Sai Kumar</p>
                  <p><strong>Contact Number:</strong> +91 72075 66702</p>
                  <p><strong>Email:</strong> sunforindia@gmail.com</p>
                </div>
                <p class="signature">Best regards,<br>The SUN NGO Team</p>
              </div>
            </body>
          </html>
        `
      };
      
      
      
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
  
      return res.json(await DonationSchema.find());
    } catch (err) {
      console.log(err);
    }
  });


    app.get('/donationrecords',middleware, async (req, res) => {
    // console.log(req.body);
    // const {name,email,phoneNumber,transactionId,paymentMethod,amount,qrCodeScan,additionalInformation} = req.body;
    try {
  //     console.log(req.body);
  // const newDonation = new DonationSchema({
  //   name:name,
  //   email: email,
  //   phoneNumber:phoneNumber,
  //   transactionId:transactionId,
  //   paymentMethod:paymentMethod,
  //   amount:amount,
  //   qrCodeScan:qrCodeScan,
  //   additionalInformation:additionalInformation,

  // });
  // await newDonation.save();
  // res.send(todo);
  return res.json(await DonationSchema.find());
  // return res.json("hieee");
    } catch (err) {
      console.log(err);
    }
  });
  // app.get('/getblooddonars',middleware, async (req, res) => {
  //   try {
    
  //     return res.json(await ApplyforvolunteerSchema.find({Blood_donar:true,accept:1}));
  //   } catch (err) {
  //     console.log(err);
      
  //   }
  // });
  app.get('/getblooddonars', middleware, async (req, res) => {
    try {
      if (!req.headers['x-token']) {
        return res.status(400).json({ error: 'Bad Request' }); // Return a 400 Bad Request response
      }
      return res.json(await ApplyforvolunteerSchema.find({ Blood_donar: true, accept: 1 }));
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' }); // Return a 500 Internal Server Error response
    }
  });
  app.get('/gettotalvolunteers', middleware, async (req, res) => {
    try {
      if (!req.headers['x-token']) {
        return res.status(400).json({ error: 'Bad Request' }); // Return a 400 Bad Request response
      }
      return res.json(await ApplyforvolunteerSchema.find({accept: 1 }));
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' }); // Return a 500 Internal Server Error response
    }
  });
  app.get('/getallemails', async (req, res) => {
    try {
      // if (!req.headers['x-token']) {
        // return res.status(400).json({ error: 'Bad Request' }); // Return a 400 Bad Request response
      // }
      // return res.json(await ApplyforvolunteerSchema.find({}));
      const volunteers = await ApplyforvolunteerSchema.find(); // Only retrieve email field, exclude _id field

    const emailList = volunteers.map(volunteer => volunteer.email);
    return res.json(emailList);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' }); // Return a 500 Internal Server Error response
    }
  });
  app.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        let exist_via_email=await Registeruser.findOne({email:email});
        
        // if(exist_via_email && exist_via_email.password==password){
        //     return res.status(200).send('User  exists crct login!!');
            
        // }
        if(!exist_via_email ){
            return res.send('User does not exist!!');
        }
        if(exist_via_email.password!=password){
            return res.send('incorrect password!!');
        }
        let payload={
            user:{
                id:exist_via_email.id
            }
        }
        let key='jwtSecure'
        jwt.sign(payload,key,{expiresIn:20000000},
            (err,token)=>{
                if(err) throw err;
                return res.json({token})          
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).send('Internal Server Error!!')
    }
})





// mongoose.connect("mongodb+srv://mernproject:mernproject@cluster0.7mfw6to.mongodb.net/").then(() => {
  mongoose.connect(`${process.env.DATABASE_URL}`).then(() => {
  console.log("Connected to the database!!");
  // console.log();
});

app.listen(5000, () => {
  console.log("Server is running on port: 5000");
});