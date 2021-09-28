import React, { FunctionComponent } from "react";
import { useFormikContext } from "formik";
import { Prompt } from "react-router-dom";

const PromptIfDirty: FunctionComponent = () => {
  const formik = useFormikContext();
  return (
    <Prompt
      when={formik.dirty}
      message="If you leave this page, your unsaved changes will be lost."
    />
  );
};

export default PromptIfDirty;
