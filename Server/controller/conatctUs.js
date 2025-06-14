
const mailSender = require("../utils/mailSender");

 exports.contactUs = async(req,res)=>{

    const {firstname,lastname ,email,message,phonenumber}=req.body;

         if(!firstname||  !email|| !message||!phonenumber){
            return res.status(403).send({
                success:false,
                message: "all fields are required"
            });
         }
   try{
    const data={
        firstname,
        lastname: `${lastname?lastname:null}`,
        email,
        message,
        phonenumber
    }

    const info =await mailSender(
         process.env.MAIL_USER,
         "Enquiry",
         `<html>
         <body>
         ${Object.keys(data)
            .map((key) => `<p><strong>${key}</strong>: ${data[key]}</p>`)
            .join("")}
         }
         </body>
         </html>
         `

    );  
    if(info){
        return res.status(200).send({
            success:true,
            message:"your message has been sent sucessfully"
        });
    } 
    else{
        return res.status(403).send({
            success: false,
            message: "Something went wrong",
          }); 
    }  
   }
   catch(error){
    return res.status(403).send({
        success: false,
        message: "Something went wrong",
      });
   }
}