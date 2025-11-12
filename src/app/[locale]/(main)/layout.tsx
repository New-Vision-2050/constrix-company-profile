import { MainLayout } from "@/layouts/main";
import { PropsWithChildren } from "react";

async function MainRootLayout({ children }: PropsWithChildren) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}

export default MainRootLayout;
