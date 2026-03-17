import { useState } from "react";

export type UseDrawerStateOptions = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const useDrawerState = ({ defaultOpen = false, onOpenChange, open }: UseDrawerStateOptions) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const currentOpen = open ?? internalOpen;

  const setOpen = (value: boolean) => {
    if (open === undefined) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  };

  return {
    open: currentOpen,
    openDrawer: () => setOpen(true),
    closeDrawer: () => setOpen(false)
  };
};
