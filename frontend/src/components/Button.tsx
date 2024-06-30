import React from "react";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  primary?: boolean;
  disabled?: boolean;
};

export function Button({
  onClick,
  children,
  primary = false,
  disabled = false,
}: Props) {
  const classNames = `w-fit-content rounded px-3 px-4 py-2 rounded-md shadow-sm ${
    primary
      ? "bg-indigo-600 text-white"
      : "bg-slate-100 border border-solid border-black"
  }`;
  return (
    <button disabled={disabled} className={classNames} onClick={onClick}>
      {children}
    </button>
  );
}
