"use server";

import { dbEvent } from "@/lib/db-event";
import { revalidatePath } from "next/cache";

interface User {
    id: string;
    roles: string[];
}

const update = async (data:User) => {
    const updated = await dbEvent.user.update({
        where: { id: data.id },
        data: {
            roles: data.roles,
        },
    });
    revalidatePath("/manage/user");
    console.log(data);
    return data;
}
 
export default update;