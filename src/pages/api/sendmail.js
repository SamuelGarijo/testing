import formData from "form-data";
import Mailgun from "mailgun.js";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email(),
});

const sendMail = async (req, res) => {
  if (req.method === "POST") {
    // Initialize mailgun
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({ username: "api", key: process.env.MAILGUN_API_KEY });

    try {
      // Validate email address
      emailSchema.parse({ email: req.body.email });

      // Send email using Mailgun
      const data = {
        from: `${req.body.name} <${req.body.email}>`,
        to: "lvgl@lvgl.io",
        subject: req.body.subject,
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nCompany: ${req.body.company}\nCountry: ${req.body.country}\n\nMessage:\n${req.body.message}`,
        html: `<b>Name:</b> ${req.body.name}<br><b>Email:</b> ${req.body.email}<br><b>Company:</b> ${req.body.company}<br><b>Country:</b> ${req.body.country}<br><br><b>Message:</b><br>${req.body.message}`,
      };

      await mg.messages.create(process.env.MAILGUN_DOMAIN, data);

      console.log("Message sent via Mailgun");
      return res
        .status(200)
        .json({ message: "Thank you for reaching out! We typically respond within 24 hours on weekdays." });
    } catch (error) {
      console.error(error);
      // Handle Zod validation error
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid email address." });
      }

      // Handle Mailgun API error
      return res.status(500).json({ error: "Oops! Something went wrong. Please try again later." });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }
};

export default sendMail;
