import { RsvpGuest } from "@/data/guest";
import QRCode from "qrcode";
import fontkit from "@pdf-lib/fontkit";
import path from "path";
import fs from "fs";
import { PDFDocument, PDFFont, PDFForm, rgb, StandardFonts } from "pdf-lib";

export const generateUndangan = async (rsvp: RsvpGuest) => {
  try {
    const pdfTemplate = `upload-files/templates-undangan/${rsvp.eventId}.pdf`;
    const pdfFullPath = path.resolve(process.cwd(), pdfTemplate);

    const outputPdfPath = `output/${rsvp.eventId}/${rsvp.id}.pdf`;

    // Check if the file exists
    if (!fs.existsSync(pdfFullPath)) {
      console.error(`File not found: ${pdfFullPath}`);
      return;
    }

    const customFont = "fonts/georgia/georgiab.ttf";
    const customFontFullPath = path.resolve(process.cwd(), customFont);
    console.log(customFontFullPath);

    const guestName = `${rsvp.guest.prefix} ${rsvp.guest.firstName} ${rsvp.guest.lastName}`;

    const qrText = `https://event.ambassade-indonesie.fr/r/${rsvp.id}`;
    const pdfBuffer = await addTextAndQRCode(
      rsvp.eventId,
      rsvp.id,
      pdfFullPath,
      outputPdfPath,
      guestName,
      qrText,
      customFontFullPath
    );

    return pdfBuffer;
  } catch (error) {
    console.error(`Error generating undangan: ${error}`);
    throw new Error(`Error generating undangan: ${error}`);
  }

  
};

async function addTextAndQRCode(
  eventId: string,
  rsvpId: string,
  templatePdfPath: string,
  outputPdfPath: string,
  text: string,
  qrCodeData: string,
  customFontPath?: string
) {
  try {
    // Read the template PDF
    const templatePdfBytes = await fs.promises.readFile(templatePdfPath);
    const templatePdf = await PDFDocument.load(templatePdfBytes);

    // Register fontkit with PDFDocument
    templatePdf.registerFontkit(fontkit);

    // Get the first page
    const page = templatePdf.getPage(0);

    let font: PDFFont;
    if (customFontPath) {
      // Embed the custom font
      const customFontBytes = await fs.promises.readFile(customFontPath);
      font = await templatePdf.embedFont(customFontBytes);
    } else {
      font = await templatePdf.embedFont(StandardFonts.Helvetica);
    }

    // Add text
    const fontSize = 9;
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const textHeight = font.heightAtSize(fontSize);

    const textOptions = {
      x: (page.getWidth() - textWidth) / 2, // Center the text horizontally
      y: page.getHeight() / 2 - 25, // Adjust y-coordinate as needed
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    };
    page.drawText(text, textOptions);

    // Generate QR code image
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);
    const qrCodeImageBytes = qrCodeImage.split(",")[1]; // Get base64 data
    const qrCodeBytes = Uint8Array.from(
      Buffer.from(qrCodeImageBytes, "base64")
    );

    // save the QR code image to a file if not exists
    //const qrcodePath = `output/${id}.png`;
    const qrcodePath = `upload-files/qrcodes/${rsvpId}.png`;
    const qrfullPath = path.resolve(process.cwd(), qrcodePath);
    if (!fs.existsSync(qrfullPath)) {
      await fs.promises.writeFile(qrcodePath, qrCodeBytes);
    }

    // Embed QR code image into the PDF
    const qrCodeImageEmbed = await templatePdf.embedPng(qrCodeBytes);
    const qrCodeImageWidth = 56; // Adjust width as needed
    const qrCodeImageHeight = 56; // Adjust height as needed

    page.drawImage(qrCodeImageEmbed, {
      x: page.getWidth() - qrCodeImageWidth - 10, // Adjust x-coordinate as needed
      y: 10, // Adjust y-coordinate as needed (placing near the bottom of the page)
      width: qrCodeImageWidth,
      height: qrCodeImageHeight,
    });

    // Save the modified PDF
    const modifiedPdfBytes = await templatePdf.save();
    await fs.promises.writeFile(outputPdfPath, modifiedPdfBytes);
    return modifiedPdfBytes;

    console.log(
      `Text and QR code added successfully! Saved as ${outputPdfPath}`
    );
  } catch (error) {
    console.error(`Error adding text and QR code: ${error}`);
    console.error(`Error adding text and QR code:`);
  }
}
