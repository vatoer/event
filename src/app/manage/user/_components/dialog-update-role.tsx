"use client";
import update from "@/actions/user";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { useState } from "react";

interface DialogUpdateRoleProps {
  user: User;
}

export function DialogUpdateRole({ user }: DialogUpdateRoleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [roles, setRoles] = useState(user.roles);

  const updateRole = async () => {
    const updated = await update({ id: user.id, roles });
    console.log(updated);
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Update User Roles</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Roles</AlertDialogTitle>
          <AlertDialogDescription>
            Update ROLES [ADMIN, USER,SCANNER]
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Roles
          </label>
          <input
            type="text"
            value={roles.join(",")}
            onChange={(e) => setRoles(e.target.value.split(","))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <AlertDialogFooter>
          <Button variant="outline" onClick={updateRole}>
            Simpan
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
