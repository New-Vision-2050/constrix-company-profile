import { MainLayout } from "@/layouts/dashboard";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <MainLayout>{children}</MainLayout>;
}
