import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import path from "path";
import * as XLSX from "xlsx";
import fs from "fs";
import dotenv from 'dotenv';


const seedGuests = async (): Promise<void> => {
  console.log("Seeding guests");

  const csvPath = "data-seeder/undangan-updated.xlsx";
  const provinsiDataPath = path.resolve(process.cwd(), csvPath);

  // Check if the file exists
  if (!fs.existsSync(provinsiDataPath)) {
    console.error(`File not found: ${provinsiDataPath}`);
    return;
  }

  const workbook = XLSX.readFile(provinsiDataPath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data: (string | number)[][] = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
  });
  const [headers, ...rows] = data;
  // Extract column names from the first row

  const date = new Date();

  try {
    // Iterate over each row in the Excel file
    for (const row of rows) {
      const rowData = headers.reduce((acc, header, index) => {
        acc[header] = row[index];
        return acc;
      }, {} as Record<string, any>);

      const guestId = `${rowData.fungsi}_${rowData.id}`;
      const guest = await prisma.guest.create({
        data: {
          id: guestId,
          prefix: rowData.prefix,
          firstName: rowData.firstname,
          lastName: rowData.lastname,
          profession: rowData.jabatan,
          institution: rowData.instansi,
          email: rowData.email,
          createdAt: date,
        },
      });

      console.log(guest);

      const rsvp = await prisma.rsvp.create({
        data: {
          id: rowData.id,
          eventId: "resdip79",
          guestId: guest.id,
          createdAt: date,
        },
      });

      console.log(rsvp);
    }
  } catch (error) {
    throw new Error(`Error seeding guests: ${error}`);
  }
};

async function main() {
  //await prisma.rsvp.deleteMany();
  //await prisma.guest.deleteMany();
  //await prisma.event.deleteMany();
  //await prisma.user.deleteMany();

  const date = new Date();

  const password = await hash(process.env.INIT_ADMIN_PASSWORD || "defaultPassword", 10);
  const user: User = await prisma.user.upsert({
    where: { email: "paris.kbri@kemlu.go.id" },
    create: {
      email: "paris.kbri@kemlu.go.id",
      name: "Paris KBRI",
      password: password,
      roles: ["ADMIN","USER","SCANNER" ],
    },
    update: {
      updatedAt: date,
      password: password,
      roles: ["ADMIN","USER","SCANNER" ],
    },
  });
  console.log(user);

  const password2 = await hash(process.env.INIT_SCANNER_PASSWORD || "defaultPassword", 10);
  const userScanner: User = await prisma.user.upsert({
    where: { email: "scanner@ambassade-indonesie.fr" },
    create: {
      email: "scanner@ambassade-indonesie.fr",
      name: "Scanner Event",
      password: password2,
      roles: ["USER","SCANNER" ],
    },
    update: {
      updatedAt: date,
      password: password2,
      roles: ["USER","SCANNER" ],      
    },
  });
  console.log(userScanner);


  const event = await prisma.event.upsert({
    where: { id: "resdip79" },
    update: {
      updatedAt: date,
    },
    create: {
      id: "resdip79",
      title: "Resepsi Diplomatik",
      description: "Resepsi Diplomatik",
      location: "InterContinental Paris Le Grand Hotel",
      date: new Date("2024-10-03T19:00:00.000Z"),
      todate: new Date("2024-10-03T21:00:00.000Z"),
      userId: user.id,
    },
  });

  await seedGuests();
}

main();
