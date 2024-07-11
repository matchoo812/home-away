"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { actionFunction } from "@/utils/types";

const initialState = {
  message: "",
};

type FormContainerProps = {
  action: actionFunction;
  children: React.ReactNode;
};

function FormContainer(props: FormContainerProps) {
  const { action, children } = props;
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
    }
  }, [state]);

  return <form action={formAction}>{children}</form>;
}

export default FormContainer;
