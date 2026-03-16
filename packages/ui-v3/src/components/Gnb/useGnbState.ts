import { useState } from "react";

export type UseGnbStateOptions = {
  activeId?: string;
  defaultActiveId?: string;
  onActiveIdChange?: (activeId: string) => void;
};

export const useGnbState = ({ activeId, defaultActiveId, onActiveIdChange }: UseGnbStateOptions) => {
  const [internalActiveId, setInternalActiveId] = useState(defaultActiveId ?? "");
  const currentActiveId = activeId ?? internalActiveId;

  const setActiveId = (value: string) => {
    if (activeId === undefined) {
      setInternalActiveId(value);
    }
    onActiveIdChange?.(value);
  };

  return { activeId: currentActiveId, setActiveId };
};
