"use client";
import { OptionRsvp } from "@/actions/guest";
import { useState } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";
import FilterOptionOption from "react-select";

// Define custom styles for react-select
const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#e0e0e0" : "#ffffff", // Change background color on hover
    color: "#000000", // Option text color
    padding: 10,
    cursor: "pointer", // Change cursor on hover
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 9999, // Ensure the menu appears above other elements
  }),
};

export const SelectRsvp = ({
  optionsRsvp,
  initialOption,
  onChange,
}: {
  optionsRsvp: OptionRsvp[];
  initialOption: OptionRsvp | null;
  onChange: (value: OptionRsvp | null) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<OptionRsvp | null>(
    initialOption
  );

  const handleChange = (
    newValue: SingleValue<OptionRsvp>,
    actionMeta: ActionMeta<OptionRsvp>
  ) => {
    console.log("Selected option:", newValue);
    // You can access extra attributes here
    if (newValue) {
      console.log("Selected besaran:", newValue.label);
      console.log("Selected id:", newValue.value);
    }
    setSelectedOption(newValue);
    onChange(newValue);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={optionsRsvp}
      formatOptionLabel={(option: OptionRsvp) => (
        <div className="flex flex-col">
          <span className="font-semibold">{option.label}</span>
          <div className="flex flex-col sm:flex-row w-full">
            <span className="font-semibold text-gray-600">
              {option.id?.toString()}
            </span>    
            <span style={{ color: "gray", marginLeft: "5px" }} className="hidden sm:block">
              {option.guest.profession?.toString()}
            </span>            
            <span style={{ color: "gray", marginLeft: "5px" }} >
              {option.guest.institution?.toString()}
            </span>
            <span style={{ color: "blue", marginLeft: "5px" }}>
            {option.guest.email?.toString()}
          </span>
          </div>
          
        </div>
      )}
      getOptionValue={(option: OptionRsvp) => option.value.toString()}
      filterOption={customFilterOption} // Add the custom filter function here
      className="w-full"
      styles={customStyles} // Apply custom styles here
    />
  );
};

// Define the custom filter option function with proper TypeScript types
const customFilterOption = (
  option: { data: OptionRsvp }, // Adjust this type based on your setup
  rawInput: string
): boolean => {
  const searchTerm = rawInput.toLowerCase();
  const { label, guest } = option.data;
  const { profession, institution, email } = guest;

  // Return true if any field matches the search term, otherwise false
  // Return true if any field matches the search term, otherwise false
  return (
    label.toLowerCase().includes(searchTerm) ||
    (profession?.toLowerCase().includes(searchTerm) ?? false) ||
    (institution?.toLowerCase().includes(searchTerm) ?? false) ||
    (email?.toLowerCase().includes(searchTerm) ?? false)
  );
};
