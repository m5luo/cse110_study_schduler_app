import React from "react";
import "./notesPage.css";

interface LabelCardProps {
  label: {
    id: number;
    name: string;
    count: number;
  };
}

const LabelCard: React.FC<LabelCardProps> = ({ label }) => {
  return (
    <div className="label-card">
      <span>{label.name}</span>
      <span>{label.count} items</span>
      <button>...</button>
    </div>
  );
};

export default LabelCard;
