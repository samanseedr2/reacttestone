import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

function getStorageValue(key: string, value: string) {
  if (localStorage.getItem(key)) {
    return localStorage.getItem(key) as string;
  }

  return value;
}

export default function useLocalStorage(
  key: string,
  initialValue: any
): [string, Dispatch<SetStateAction<string>>] {
  const [value, setValue] = useState<string>(
    getStorageValue(key, initialValue)
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue];
}
