import React from "react";
import { useNavigate } from "react-router-dom";

interface TabProps {
  label: string;
  to: string;
  isActive?: boolean;
  className?: string;
}

const Tab: React.FC<TabProps> = ({ label, to, isActive, className }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`relative rounded-sm text-[12px] xl:text-[16px] font-medium h-[40px] transition-colors cursor-pointer" px-4 py-2 rounded-t ${isActive ? "bg-primary text-white" : "bg-transparent text-[#121826] cursor-pointer hover:bg-gray-100 border"}  ${className || ""}`}
      onClick={() => navigate(to)}
      type="button"
    >
      {label} 
    </button>
  );
};

export default Tab;