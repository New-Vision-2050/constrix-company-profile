// Next.js uses file-based routing, so this file now just exports components
// that can be used in pages or other components

import { lazy, Suspense } from "react";
import { varAlpha } from "minimal-shared/utils";

import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { AuthLayout } from "@/layouts/auth";
import { MainLayout } from "@/layouts/dashboard";

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import("@/demo-pages/dashboard"));
export const BlogPage = lazy(() => import("@/demo-pages/blog"));
export const UserPage = lazy(() => import("@/demo-pages/user"));
export const SignInPage = lazy(() => import("@/demo-pages/sign-in"));
export const ProductsPage = lazy(() => import("@/demo-pages/products"));
export const Page404 = lazy(() => import("@/demo-pages/page-not-found"));

const renderFallback = () => (
  <Box
    sx={{
      display: "flex",
      flex: "1 1 auto",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) =>
          varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: "text.primary" },
      }}
    />
  </Box>
);

// Helper components that can be used in Next.js pages
export const DashboardPageWithLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <MainLayout>
    <Suspense fallback={renderFallback()}>{children}</Suspense>
  </MainLayout>
);

export const AuthPageWithLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => <AuthLayout>{children}</AuthLayout>;
