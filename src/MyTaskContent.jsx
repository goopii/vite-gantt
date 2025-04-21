import React, { useState } from "react";

export default function MyTaskContent({ data, onAction }) {
  const [clicked, setClicked] = useState(data.clicked);

  function doClick(ev) {
    ev.stopPropagation();
    setClicked(!clicked);
    // Handle custom dispatch logic here
    // Example: props.onAction({ action: "custom-click", data: { clicked: !clicked, id: data.id } });
    onAction({
      action: "custom-click",
      data: { clicked: !clicked, id: data.id },
    });
  }

  return (
    <>
      {data.type !== "milestone" ? (
        <>
          <div className="absolute left-full -top-0.5 px-0.5 text-xs font-[var(--wx-gantt-bar-font)]">{data.text || ""}</div>
          <button 
            onClick={doClick}
            className="relative z-10 px-0.5 text-xs font-[var(--wx-gantt-bar-font)]"
          >
            {clicked ? "Was clicked" : "Click Me"}
          </button>
        </>
      ) : (
        <div className="absolute right-full -top-0.5 px-0.5 text-xs font-[var(--wx-gantt-bar-font)]">{data.text || ""}</div>
      )}
    </>
  );
}
