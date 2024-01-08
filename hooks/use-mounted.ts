import * as React from "react";

/***
 * React hook to check the dom is mounted or not
 */
export function useMounted() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
