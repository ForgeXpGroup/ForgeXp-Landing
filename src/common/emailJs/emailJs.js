import emailjs from "emailjs-com";

export const sendEmail = (templateParams) => {
  emailjs.send("service_1dzn933", "template_dlls3yv", templateParams, "2pQl5B17RC2W2kLzx").then(
    (result) => {
     
    },
    (error) => {
     
    }
  );
};
