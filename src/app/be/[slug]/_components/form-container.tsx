"use client";
import { OptionRsvp } from "@/actions/guest";
import { SelectRsvp } from "./select-rsvp";
import { useState } from "react";
import { Rsvp } from "@prisma/client";
import RsvpResponseWrapperBackEnd from "@/components/rsvp-response-wrapper-be";

interface FormContainerProps {
    rsvpOptions: OptionRsvp[];
}
const FormContainer = ({
    rsvpOptions
}: FormContainerProps) => {
    const [selectedOption, setSelectedOption] = useState<OptionRsvp | null>(null);
    const onChange = (value: OptionRsvp | null) => {
        console.log("Selected option:", value);
        setSelectedOption(value);
    }
    return ( 
        <div className="p-2">
            <SelectRsvp initialOption={null} optionsRsvp={rsvpOptions} onChange={onChange} />

            { selectedOption && <RsvpResponseWrapperBackEnd rsvp={selectedOption} /> }

        </div>
     );
}
 
export default FormContainer;