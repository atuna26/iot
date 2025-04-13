import { useState } from "react";

const iconOptions = [
    { value: "fa-solid fa-faucet", icon: "fa-solid fa-faucet" },
    { value: "fa-solid fa-lightbulb", icon: "fa-solid fa-lightbulb" },
    { value: "fa-solid fa-fan", icon: "fa-solid fa-fan" }
];
  
const IconSelection = ({ field, form }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = iconOptions.find(opt => opt.value === field.value);
  
    return (
      <div className="relative w-[50%]">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="border p-2 rounded cursor-pointer flex items-center justify-center"
        >
          <i className={`${selectedOption?.icon} mr-2`}></i>
          <span>{selectedOption?.label}</span>
        </div>
        {isOpen && (
          <div className="absolute w-full mt-2 bg-white border rounded shadow-lg z-10">
            {iconOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  form.setFieldValue(field.name, option.value);
                  setIsOpen(false);
                }}
                className="p-2 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
              ><i className={`${option.icon} mr-2`}></i>
              </div>
            ))}
          </div>
        )}
      </div>
    );
};

export default IconSelection;
  