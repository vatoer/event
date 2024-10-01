"use client";
import QRCode from "qrcode";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

async function generateQRCode(data: string): Promise<string> {
  try {
    const url = await QRCode.toDataURL(data);
    return url;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
}

const QR = () => {
  const [qr, setQr] = useState<string | null>(null);
  const newQr = async () => {
    console.log("Generate QR");
    const qr = await generateQRCode("https://event.ambassade-indonesie.fr/r/MKYZF");
    setQr(`${qr}`);
  };
  return <div className="flex flex-col gap-4 w-full">
    <Button onClick={newQr}>Generate QR</Button>
    <Image src={qr||"/none.jpg"} alt="QR Code" width={200} height={200} />
  </div>;
};

export default QR;
