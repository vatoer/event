"use server";
import nodemailer from "nodemailer";
import path from "path";
import { Logger } from "tslog";
import fs from "fs";
import { RsvpGuest } from "@/data/guest";
import { generateUndangan } from "@/lib/generate-undangan";

const logger = new Logger();

async function sendHtmlEmailWithAttachment(
  smtpServer: string,
  port: number,
  senderEmail: string,
  senderPassword: string,
  recipientEmail: string,
  subject: string,
  htmlContent: string,
  attachmentPath: string,
  bcc?: string,
  filename?: string
): Promise<boolean> {
  // Setup the transport
  const transporter = nodemailer.createTransport({
    host: smtpServer,
    port: port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });

  // Prepare email options
  const mailOptions = {
    from: senderEmail,
    to: recipientEmail,
    subject: subject,
    html: htmlContent,
    bcc: bcc,
    attachments: [
      {
        filename: filename || path.basename(attachmentPath),
        path: attachmentPath,
      },
    ],
    headers: {
      "Disposition-Notification-To": senderEmail,
      "Return-Receipt-To": senderEmail,
      "Return-Path": "paris.kbri@kemlu.go.id", // Replace with an address you control
    },
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent successfully to ${recipientEmail}`);
    return true;
  } catch (error) {
    logger.error(`Failed to send email to ${recipientEmail}: ${error}`);
    return false;
  }
}

// Example usage

const smtpServer = "mail.ambassade-indonesie.fr";
const port = 587;
const senderEmail = "rsvp@ambassade-indonesie.fr";
const senderPassword = process.env.EMAIL_PASSWORD || "your-email-password";

export const sendEmailInvitation = async (rsvpGuest: RsvpGuest) => {
  try {
    const guestFullname = `${rsvpGuest.guest.prefix} ${rsvpGuest.guest.firstName} ${rsvpGuest.guest.lastName}`;
    const recipientEmail = "vatoer.ckplus@gmail.com";
    const subject = `Invitation à une réception diplomatique pour ${guestFullname}`;
    //const attachmentPath = "path/to/your/file.txt";
    const bcc = "komparis.subscription@gmail.com";
    const undangan = `output/${rsvpGuest.eventId}/${rsvpGuest.id}.pdf`;
    const attachmentPath = path.resolve(process.cwd(), undangan);
    const filename = "invitation.pdf";

    if (!fs.existsSync(attachmentPath)) {
      logger.error(`File not found: ${attachmentPath}`);
      logger.info(`Try to Generate invitation for ${guestFullname}`);
      // try to generate the invitation
      const pdfBuffer = await generateUndangan(rsvpGuest);
      if (!pdfBuffer) {
        logger.error(`Failed to generate invitation for ${guestFullname}`);
        return false;
      }
    }

    const qrcode = rsvpGuest.id;
    // Read HTML content from file
    const htmlFilePath = path.resolve(
      process.cwd(),
      `upload-files/templates-html/${rsvpGuest.eventId}.html`
    );
    const htmlTemplate = fs.readFileSync(htmlFilePath, "utf-8");
    // Use template literals to include variables in the HTML content
    let htmlContent = htmlTemplate
      .replace(/\${guestFullname}/g, guestFullname)
      .replace(/\${qrcode}/g, qrcode);

    const x = await sendHtmlEmailWithAttachment(
      smtpServer,
      port,
      senderEmail,
      senderPassword,
      recipientEmail,
      subject,
      htmlContent,
      attachmentPath,
      bcc,
      filename
    );
    return x;
  } catch (error) {
    return false;
  }
};
