import { useEffect, useState } from "react";

export function useOverflowGuard() {
  const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const html = document.documentElement;
      const body = document.body;
      const overflow =
        html.scrollWidth > html.clientWidth + 1 ||
        body.scrollWidth > body.clientWidth + 1;
      setHasHorizontalOverflow(overflow);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  return hasHorizontalOverflow;
}
