import React from "react";

type Props = {
  children: React.ReactNode;
};

export function ErrorMessage({ children }: Props) {
  return <p className="mt-2 text-sm text-red-600">{children}</p>;
}
