import { useEffect, useState } from "react";

function useTest() {
  const [val, setVal] = useState(0);
  console.log("useTest rendered");

  useEffect(() => {
    console.log("useTest useEffect Ran");

    return () => console.log("useTest useEffect return ran");
  }, []);
  return { val, setVal };
}

export default useTest;
