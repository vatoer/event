import { auth } from "@/app/(auth)/auth";
import { dbEvent } from "@/lib/db-event";
import TabelUser from "./_components/tabel-user";
import { UserButton } from "@/components/user/user-button";

const ManageUserPage = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return <div>Not authenticated</div>;
  }

  // check roles
  console.log(session.user.roles);
  if (!session.user.roles?.includes("ADMIN")) {
    return <div>Not authorized</div>;
  }

  const daftarUser = await dbEvent.user.findMany();

  return (
    <div className="p-2 sm:px-10 w-full flex flex-col h-full gap-2">
      <div className="flex flex-row w-full justify-end">
        <UserButton />
      </div>
      <h1>Manage User</h1>
      <TabelUser data={daftarUser} />
    </div>
  );
};

export default ManageUserPage;
