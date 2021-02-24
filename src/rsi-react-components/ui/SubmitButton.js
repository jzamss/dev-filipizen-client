import React from "react";
import { useForm, useFormState } from "react-final-form";
import Button from "./Button";

const SubmitButton = ({
  caption = "Submit",
  variant = "contained",
  color = "primary",
  size = "small",
  children,
  visible = true,
  disabled = false,
}) => {
  const form = useForm();
  const formState = useFormState();

  return (
    <Button
      caption={caption}
      action={form.submit}
      variant={variant}
      color={color}
      size={size}
      children={children}
      visible={visible}
      disabled={disabled}
      submitting={formState.submitting}
    />
  );
};

export default SubmitButton;
