import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

async function main() {
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
        date: new Date(),
        userId: user.id,
        },
    });

    const guest = await prisma.guest.create({
        data: {
        name: "Guest Name",
        email: "guest@gmail.com",
        },
    });

    const rsvp = await prisma.rsvp.create({
        data: {
        id: "BBBBB",
        eventId: event.id,
        guestId: guest.id,
        },
    });
}

main()