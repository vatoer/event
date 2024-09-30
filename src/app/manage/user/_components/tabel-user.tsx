"use client";
import { User } from "@prisma/client";
import { DialogUpdateRole } from "./dialog-update-role";

interface TabelUserProps {
  data: User[];
}

const TabelUser = ({ data }: TabelUserProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
              Email
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
              Name
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
              Roles
            </th>
            <th>
                Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4 text-sm text-gray-700">{user.email}</td>
              <td className="py-2 px-4 text-sm text-gray-700">{user.name}</td>
              <td className="py-2 px-4 text-sm text-gray-700">
                {user.roles.join(", ")}
              </td>
              <td><ButtonAddRole user={user} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TabelUser;


const ButtonAddRole = ({ user }: { user: User }) => {
    return (
        <DialogUpdateRole user={user}/>
    );
};