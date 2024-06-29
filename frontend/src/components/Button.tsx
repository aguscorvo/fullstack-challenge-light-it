import React from "react";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
};

export function Button({ onClick, children }: Props) {
  return (
    <button
      className="w-fit-content rounded px-3 px-4 py-2 bg-slate-100 rounded-md shadow-sm border border-solid border-black"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
