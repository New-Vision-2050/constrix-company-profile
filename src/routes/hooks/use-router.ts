import { useRouter as useNextRouter } from "@/i18n/navigation";

// ----------------------------------------------------------------------

export function useRouter() {
  const router = useNextRouter();
  return {
    back: () => router.back(),
    forward: () => router.forward && router.forward(), // Next.js router does not have forward()
    refresh: () => router.refresh(),
    push: (href: string) => router.push(href),
    replace: (href: string) => router.replace(href),
  };
}
