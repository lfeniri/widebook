"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import userAuthService from "@/services/userAuthService";
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
    try {
      const profile = await userAuthService.getUserProfile();
      if (profile) {
        setUser({
          id: profile.userId || "",
          name: profile.name,
          email: profile.email,
          role: profile.role,
        });
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Unexpected error fetching user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) fetchUser();
    const { data: listener } = userAuthService.onAuthStateChange(() => {
      if (isMounted) fetchUser();
    });
    return () => {
      isMounted = false;
      listener?.subscription.unsubscribe();
    };
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
