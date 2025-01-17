import { Session, User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useState } from "react";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

export interface AuthContextProps {
  session: Session | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  const login = async (email: string, password: string) => {
    const req = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (req.error) {
      throw req.error.message;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    router.push("/");
  };

  const logout = async (redirect: boolean = true) => {
    const req = await supabase.auth.signOut();
    if (req.error) {
      throw req.error.message;
    }
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
