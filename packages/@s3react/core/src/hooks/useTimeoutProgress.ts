import { useCallback, useState } from "react";

export function useTimeoutProgress(state: boolean, timeout = 300) {
  const [isProgress, setIsProgress] = useState(false);

  const triggerProgress = useCallback(() => {
    if (state) {
      setIsProgress(true);
      setTimeout(() => setIsProgress(false), timeout);
    }
  }, [state, timeout]);

  return { isProgress, triggerProgress };
};