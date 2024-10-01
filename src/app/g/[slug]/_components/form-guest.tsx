"use client";
import { simpanDataGuest } from "@/actions/guest";
//import SelectKegiatan from "@/components/form/select-kegiatan";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Guest, guestSchema } from "@/zod/schemas/guest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormGuestProps {
  onCancel?: () => void;
  handleFormSubmitComplete?: (isSuccess: Boolean) => void;
  className?: string;
  guest?: Partial<Guest> | null;
}
const FormGuest = ({
  onCancel,
  handleFormSubmitComplete,
  className,
  guest,
}: FormGuestProps) => {
  console.log("guest passed from props", guest);
  const form = useForm<Guest>({
    resolver: zodResolver(guestSchema),
    defaultValues: guest
      ? guest
      : {
          prefix: "",
          firstName: "",
          lastName: "",
          profession: "",
          institution: "",
          email: "",
        },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = async (data: Guest) => {
    try {
      const guest = await simpanDataGuest(data);
      if (guest.success) {
        toast.success(`Berhasil menyimpan data guest ${guest.data?.name}`);
        form.reset();
        handleFormSubmitComplete?.(guest.success);
      } else {
        toast.error("Gagal menyimpan data guest");
      }
    } catch (error) {
      toast.error("Gagal menyimpan data guest");
    }
    console.log(data);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="prefix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prefix</FormLabel>
                  <FormControl>
                    <Input placeholder="S.M.E./MMe." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="fulan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="FULAN" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jabatan</FormLabel>
                  <FormControl>
                    <Input placeholder="Ambassador..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institusi</FormLabel>
                  <FormControl>
                    <Input placeholder="Ambassador..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="nama@contoh.com" {...field} 
                    value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {hasErrors && (
              <div className="bg-red-500 text-white mt-10 p-2">
              {Object.keys(errors).map((key) => (
                <p key={key} >
                  {errors[key as keyof typeof errors]?.message}
                </p>
              ))}
            </div>
            )}
            

            <div
              className={cn(
                "flex flex-col sm:flex-row  sm:justify-end gap-2 mt-6"
              )}
            >
              <Button type="submit">Simpan</Button>
              <Button type="button" variant={"outline"} onClick={onCancel}>
                Batal
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormGuest;
