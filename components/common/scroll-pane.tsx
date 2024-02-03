import React from "react";

interface ScrollPaneProps {
  children?: React.ReactNode;
}

export const ScrollPane: React.FC<ScrollPaneProps> = ({ children }) => {
  return <div className="h-[680px] overflow-y-scroll">{children}</div>;
};
