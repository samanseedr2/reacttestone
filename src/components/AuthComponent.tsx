import { createContext, useContext, type PropsWithChildren } from "react";

type User = {
  name: string;
};

const AuthContext = createContext<User | null>(null);

function AuthComponent({ children }: PropsWithChildren) {
  return (
    <AuthContext.Provider value={{ name: "Saman" }}>
      <h1>Auth Component</h1>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const user = useContext(AuthContext);

  if (!user) throw new Error("Access in Auth Context");

  return user;
};

export default AuthComponent;
