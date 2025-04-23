"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface AuthUser {
  id: string;
  name?: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    console.log(session);
    if (session?.user) {
      let name = `${session.user?.user_metadata?.first_name} ${session.user?.user_metadata?.last_name}` || "";
      setUser({
        id: session.user.id,
        name: name,
        email: session.user.email ?? "",
        // Prend le rôle à la racine, sinon dans user_metadata
        role: session.user.role || undefined,
      });
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
    const { data: listener } = supabase.auth.onAuthStateChange(() => fetchUser());
    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
