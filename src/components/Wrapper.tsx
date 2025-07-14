import { createContext } from "react";

export const Context = createContext<string | null>(null);

function Wrapper() {
  return (
    <Context.Provider value={"Saman"}>
      <h2>Wrapper</h2>
    </Context.Provider>
  );
}

export default Wrapper;
