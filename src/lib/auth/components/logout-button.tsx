"use client";
import { Button, ButtonProps } from "@mui/material";
import { useAuth } from "@/lib/auth/hooks/use-auth";

interface LogoutButtonProps extends Omit<ButtonProps, "onClick"> {
  redirectTo?: string;
  showMessage?: boolean;
  children?: React.ReactNode;
}

export function LogoutButton({
  redirectTo,
  showMessage,
  children = "Logout",
  disabled,
  ...buttonProps
}: LogoutButtonProps) {
  const { logout, isLoading } = useAuth();

  const handleLogout = () => {
    logout({ redirectTo, showMessage });
  };

  return (
    <Button
      {...buttonProps}
      disabled={disabled || isLoading}
      loading={isLoading}
      onClick={handleLogout}
    >
      {children}
    </Button>
  );
}
