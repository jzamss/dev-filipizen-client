import React from "react";
import Button from "./Button";

const BackLink = ({ caption, children, variant = "text", size = "medium" }) => {
  return (
    <Button size={size} variant={variant}>
      {caption || children || "Back"}
    </Button>
  );
};

export default BackLink;
