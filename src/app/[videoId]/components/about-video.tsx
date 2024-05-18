import React, { useState } from 'react'

export default function VideoDesc({title, description}:any) {
    
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="flex flex-col gap-2 pb-4 border-b">
      <p className="text-lg font-semibold">{title}</p>
      <p className={`transition-all ${isExpanded ? "" : "line-clamp-2"}`}>
        {description}
      </p>
      <button
        onClick={toggleExpanded}
        className="text-blue-500 text-end text-sm"
      >
        {isExpanded ? "View Less" : "View More"}
      </button>
    </div>
  );
}
