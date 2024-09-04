import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import path from "path";
import * as XLSX from "xlsx";

const seedGuests = async (): Promise<void> => {
  console.log("Seeding guests");

  const csvPath = "data-seeder/undangan-updated.xlsx";
  const provinsiDataPath = path.resolve(process.cwd(), csvPath);

  const workbook = XLSX.readFile(provinsiDataPath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data: (string | number)[][] = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
  });
  const [headers, ...rows] = data;
  // Extract column names from the first row

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
          },
        });

        console.log(guest);

        const rsvp = await prisma.rsvp.create({
          data: {
            id: rowData.id,
            eventId: "resdip79",
            guestId: guest.id,
          },
        });

        console.log(rsvp);

      }
     
    } catch (error) {
      throw new Error(`Error seeding guests: ${error}`);
    }
}


async function main() {
  await prisma.rsvp.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  const password = await hash("password", 10);
  const user: User = await prisma.user.create({
    data: {
      email: "paris.kbri@kemlu.go.id",
      name: "Paris KBRI",
      password: password,
    },
  });
  console.log(user);

  const event = await prisma.event.create({
    data: {
      id: "resdip79",
      title: "Resepsi Diplomatik",
      description: "Resepsi Diplomatik",
      location: "InterContinental Paris Le Grand Hotel",
      date: new Date(),
      userId: user.id,
    },
  });

    await seedGuests();
}

main();
