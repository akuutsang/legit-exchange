"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: "ADMIN" | "LAWYER" | "SELLER" | "BUYER";
  redirectTo?: string;
};

export function ProtectedRoute({
  children,
  requiredRole,
  redirectTo = "/auth/signin",
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, status, isLoading, isAdmin, isLawyer, isSeller, isBuyer } =
    useAuth(requiredRole);

  const hasRequiredRole = () => {
    if (!requiredRole) return true;
    return (
      (requiredRole === "ADMIN" && isAdmin) ||
      (requiredRole === "LAWYER" && isLawyer) ||
      (requiredRole === "SELLER" && isSeller) ||
      (requiredRole === "BUYER" && isBuyer)
    );
  };

  useEffect(() => {
    if (status === "unauthenticated" && !isLoading) {
      // Redirect to signin with callback URL
      const callbackUrl = encodeURIComponent(pathname);
      router.push(`${redirectTo}?callbackUrl=${callbackUrl}`);
    } else if (status === "authenticated" && !isLoading && !hasRequiredRole()) {
      // Redirect to unauthorized page or home if user doesn't have required role
      router.push("/unauthorized");
    }
  }, [status, isLoading, router, pathname, redirectTo]);

  if (isLoading || status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Will be redirected by the useEffect
  }

  if (!hasRequiredRole()) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
          <p>You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Helper components for specific roles
export const AdminRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRole="ADMIN">{children}</ProtectedRoute>
);

export const LawyerRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRole="LAWYER">{children}</ProtectedRoute>
);

export const SellerRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRole="SELLER">{children}</ProtectedRoute>
);

export const BuyerRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRole="BUYER">{children}</ProtectedRoute>
);
