"use client";
import { simpanDataGuest, RsvpGuest, deleteGuest } from "@/actions/guest";

import ConfirmDialog from "@/components/confirm-dialog";
import {
  KolomPilihanAksi,
  TabelGenericWithoutInlineEdit,
} from "@/components/tabel-generic-without-inline-edit";
import { useSearchTerm } from "@/hooks/use-search-term";
import { guestSchema, Guest as Zguest } from "@/zod/schemas/guest";
import { Guest } from "@prisma/client";

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ZodError } from "zod";

interface TabelGuestProps {
  data: RsvpGuest[];
  onEdit: (row: RsvpGuest) => void;
}
export const TabelGuest = ({
  data: initialData,
  onEdit = () => {},
}: TabelGuestProps) => {
  const [data, setData] = useState<RsvpGuest[]>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [editableRowId, setEditableRowIndex] = useState<string | null>(null);
  const [originalData, setOriginalData] = useState<RsvpGuest | null>(null);

  const { searchTerm } = useSearchTerm();

  const filteredData = data.filter((row) => {
    if (!searchTerm || searchTerm === "") return true;
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    //const searchWords = lowercasedSearchTerm.split(" ").filter(Boolean);
    const searchWords =
      lowercasedSearchTerm
        .match(/"[^"]+"|\S+/g)
        ?.map((word) => word.replace(/"/g, "")) || [];

    return searchWords.every(
      (word) =>
        row.guest.name?.toLowerCase().includes(word) ||
        row.guest.email?.toLowerCase().includes(word) ||
        row.guest.firstName?.toLowerCase().includes(word) ||
        row.guest.lastName?.toLowerCase().includes(word) ||
        row.guest.profession?.toLowerCase().includes(word) ||
        row.guest.institution?.toLowerCase().includes(word)
    );
  });

  const columns: ColumnDef<RsvpGuest>[] = [
    {
      id: "rowNumber",
      header: "#",
      // cell: (info) => info.row.index + 1, // Display row number (1-based index)
      footer: "#",
    },
    {
        accessorKey: "id",
        header: "id",
        cell: (info) => info.getValue(),
        footer: "id",
        meta: { isCellEditable: false },
      },
    {
      accessorKey: "guest.prefix",
      header: "Prefix",
      cell: (info) => info.getValue(),
      footer: "Prefix",
    },
    {
      accessorKey: "guest.firstName",
      header: "firstName",
      cell: (info) => info.getValue(),
      footer: "firstName",
    },
    {
      accessorKey: "guest.lastName",
      header: "lastName",
      cell: (info) => info.getValue(),
      footer: "lastName",
    },
    {
      accessorKey: "guest.profession",
      header: "Profession",
      cell: (info) => info.getValue(),
      footer: "Profession",
    },
    {
        accessorKey: "guest.institution",
        header: "Institution",
        cell: (info) => info.getValue(),
        footer: "Institution",
      },
      {
        accessorKey: "guest.email",
        header: "email",
        cell: (info) => info.getValue(),
        footer: "email",
      },
      {
        accessorKey: "rsvpResponse",
        header: "response",
        cell: (info) => info.getValue(),
        footer: "response",
      },
    {
      accessorKey: "_additionalKolomAksi",
      header: "Aksi",
      cell: (info) =>
        KolomPilihanAksi<RsvpGuest>(
          info,
          ["delete", "edit","print"],
          isEditing,
          {
            onDelete: handleDelete,
            onEdit: handleEdit,
            onPrint: handlePrint
          }
        ),
      meta: { isKolomAksi: true, className: "w-[100px]" },
      enableSorting: false, // Disable sorting for this column
    },
  ];

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleDelete = async (row: RsvpGuest) => {
    setIsConfirmDialogOpen(true);
    setOriginalData(row);
  };

  const handleConfirm = async () => {
    if (!originalData) {
      toast.error("Data tidak ditemukan");
      return;
    }
    const deleted = await deleteGuest(originalData.id);
    if (deleted.success) {
      //alert("Data berhasil dihapus");
      toast.success(`Data ${originalData.guest.firstName} berhasil dihapus`);
      setIsConfirmDialogOpen(false);
      console.log("Data dihapus");
    } else {
      console.log("Data tidak dihapus");
      toast.error(`Data ${originalData.guest.firstName} gagal dihapus ${deleted.message}`);
    }
  };

  const handlePrint = (row: RsvpGuest) => {
    //console.log("View row:", row);
    // Implement your view logic here
    // view pdf
    // link to pdf url
    const url = `/undangan/${row.id}`;
    window.open(url, "_blank");
  };

  const handleEdit = (row: Row<RsvpGuest>) => {
    //console.log("Edit row:", row);
    // Implement your edit logic here
    setOriginalData(row.original); // Store the original data

    onEdit(row.original);
    // setIsEditing(true);
    // setEditableRowIndex(row.id);
  };

  const handleCancel = () => {
    setIsConfirmDialogOpen(false);
    console.log("Cancelled!");
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);
  return (
    <div>
      <TabelGenericWithoutInlineEdit
        data={filteredData}
        columns={columns}
        frozenColumnCount={1}
        isEditing={isEditing}
        editableRowId={editableRowId}
      />
      <ConfirmDialog
        message={`Apakah anda yakin menghapus data ${originalData?.guest.firstName} ?`}
        isOpen={isConfirmDialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TabelGuest;
