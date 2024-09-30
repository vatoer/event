"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Guest as ZGuest } from "@/zod/schemas/guest";
import { BookOpen, GraduationCap, Grid, Plus } from "lucide-react";
import { Chicle } from "next/font/google";
import { Children, useEffect, useState } from "react";
import FormGuest from "./form-guest";

interface DialogFormGuestProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: React.ReactNode;
}
export const DialogFormGuest = ({
  open,
  setOpen,
  children,
}: DialogFormGuestProps) => {
  useEffect(() => {
    setOpen(open);
  }, [open, setOpen]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1 w-36">
          <Plus size={18} />
          <Grid size={18} />
          <span className="hidden sm:block">Guest</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:min-w-[500px]">
        <DialogHeader>
          <DialogTitle>Guest</DialogTitle>
          <DialogDescription>
            Isi form di bawah untuk menambahkan/memperbarui Guest
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
