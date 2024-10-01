"use client";
import { GuestWithRsvp, OptionRsvp } from "@/actions/guest";
import { useState } from "react";
import TabelGuest from "./tabel-guest";
import { Guest as ZGuest } from "@/zod/schemas/guest";
import { DialogFormGuest } from "./dialog-form-guest";
import FormGuest from "./form-guest";
import { RsvpGuest } from "@/data/guest";

interface GuestContainerProps {
  data: RsvpGuest[];
  eventId: string;
}

const GuestContainer = ({ data,eventId }: GuestContainerProps) => {
  const [selectedOption, setSelectedOption] = useState<OptionRsvp | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editableRow, setEditableRow] = useState<ZGuest | null>(null);
  const onChange = (value: OptionRsvp | null) => {
    console.log("Selected option:", value);
    setSelectedOption(value);
  };

  const handleOnClose = () => {
    setIsOpen(false);
    setEditableRow(null);
  };

  const onEdit = (row: RsvpGuest) => {
    //const { createdAt, updatedAt, ...omittedData } = row;
    //console.log("onEdit form-role-container", row);
    setIsOpen(true);
    setEditableRow(row as ZGuest);
    //console.log("onEdit form-narasumber-container", row);
  };

  const handleFormSubmitComplete = () => {
    setIsOpen(false);
    setEditableRow(null);
  };

  return (
    <div className="flex flex-col p-2 gap-2">
      <DialogFormGuest open={isOpen} setOpen={setIsOpen}>
        <FormGuest
          onCancel={handleOnClose}
          handleFormSubmitComplete={handleFormSubmitComplete}
          guest={editableRow}
          eventId={eventId}
        />
      </DialogFormGuest>
      <TabelGuest data={data} onEdit={onEdit} />
    </div>
  );
};

export default GuestContainer;
