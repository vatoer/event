import { auth } from "@/app/(auth)/auth";
import EventWrapper from "@/components/event-wrapper";
import GuestWrapper from "@/components/guest";
import RsvpResponseWrapper from "@/components/rsvp-response-wrapper";
import { getRsvp } from "@/data/rsvp";
import { UserButton } from "@/components/user/user-button";
import path from "path";
import fs from "fs";
import { PDFDocument, PDFFont, PDFForm, rgb, StandardFonts } from "pdf-lib";
import pdfParse from "pdf-parse";
import QRCode from "qrcode";
import fontkit from '@pdf-lib/fontkit';


const UndanganPage = async ({ params }: { params: { slug: string } }) => {
  // check data from database

  // if data exists, return the data
  const eventId = "resdip79";
  const rsvpId = params.slug;
  const rsvp = await getRsvp(eventId, rsvpId);
  console.log(rsvp);
  let user = null;
  const session = await auth();
  if (session) {
    user = session.user;
    console.log(user?.email);
  }

  if (!rsvp) {
    return (
      <div>
        <h1>RSVP Page</h1>
        <div>NOT FOUND</div>
      </div>
    );
  }

  const guest = rsvp.guest;
  const event = rsvp.event;

  const pdfTemplate = "upload-files/templates-undangan/resdip79.pdf";
  const pdfFullPath = path.resolve(process.cwd(), pdfTemplate);

  const outputPdfPath = "output/resdip79/modified_undangan.pdf";

  // Check if the file exists
  if (!fs.existsSync(pdfFullPath)) {
    console.error(`File not found: ${pdfFullPath}`);
    return;
  }

  const customFont = "fonts/georgia/georgiab.ttf";
  const customFontFullPath = path.resolve(process.cwd(), customFont);
  console.log(customFontFullPath);

  const x = await addTextAndQRCode(
    pdfFullPath,
    outputPdfPath,
    "Mohomad OEMAR",
    "https://event.ambassade-indonesie.fr/r/MKYZF",
    customFontFullPath
  );
  console.log(x);

  return <div className="flex flex-col w-full">{rsvpId}</div>;
};

export default UndanganPage;

async function addTextAndQRCode(
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
    const textWidth = font.widthOfTextAtSize(text, 12);
    const textHeight = font.heightAtSize(12);

    const textOptions = {
      x: (page.getWidth() - textWidth) / 2, // Center the text horizontally
      y: page.getHeight() / 2 - 25, // Adjust y-coordinate as needed
      size: 11,
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

    console.log(
      `Text and QR code added successfully! Saved as ${outputPdfPath}`
    );
  } catch (error) {
    console.error(`Error adding text and QR code: ${error}`);
    console.error(`Error adding text and QR code:`);
  }
}
