import { useEffect, useState } from "react";

export default function useLog() {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    console.log(value);
  }, [value]);

  return setValue;
}
