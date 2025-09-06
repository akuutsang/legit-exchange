"use client";

import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

type UseAuthReturn = {
  user: Session["user"] | null;
  status: "loading" | "authenticated" | "unauthenticated";
  isAdmin: boolean;
  isLawyer: boolean;
  isSeller: boolean;
  isBuyer: boolean;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};

export function useAuth(requiredRole?: "ADMIN" | "LAWYER" | "SELLER" | "BUYER"): UseAuthReturn {
  const { data: session, status, update } = useSession();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const user = session?.user || null;
  const isAdmin = user?.role === "ADMIN";
  const isLawyer = user?.role === "LAWYER";
  const isSeller = user?.role === "SELLER";
  const isBuyer = user?.role === "BUYER";

  const checkRole = () => {
    if (!requiredRole) return true;
    return (
      (requiredRole === "ADMIN" && isAdmin) ||
      (requiredRole === "LAWYER" && isLawyer) ||
      (requiredRole === "SELLER" && isSeller) ||
      (requiredRole === "BUYER" && isBuyer)
    );
  };

  const hasRequiredRole = checkRole();

  useEffect(() => {
    const validateAuth = async () => {
      setIsLoading(true);
      try {
        if (status === "unauthenticated") {
          setError(new Error("Authentication required"));
        } else if (status === "authenticated" && !hasRequiredRole) {
          setError(new Error("Insufficient permissions"));
        } else {
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    };

    validateAuth();
  }, [status, hasRequiredRole]);

  const refetch = async () => {
    try {
      await update();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to refresh session"));
    }
  };

  return {
    user,
    status,
    isAdmin,
    isLawyer,
    isSeller,
    isBuyer,
    isLoading: status === "loading" || isLoading,
    error,
    refetch,
  };
}

// Helper hooks for specific roles
export const useAdminAuth = () => useAuth("ADMIN");
export const useLawyerAuth = () => useAuth("LAWYER");
export const useSellerAuth = () => useAuth("SELLER");
export const useBuyerAuth = () => useAuth("BUYER");
