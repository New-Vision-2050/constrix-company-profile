import { atom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import z from "zod";

const userStateSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  emailVerifiedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  profileImage: z.string().nullable(),
});
type UserState = z.infer<typeof userStateSchema> | null;

// Method 1: Using atomWithStorage (Recommended)
export const userAtom = atomWithStorage<UserState>(
  "user", // localStorage key
  null, // initial value
  {
    getItem: (key: string) => {
      if (typeof window === "undefined") return null;
      const stored = localStorage.getItem(key);
      if (!stored) return null;
      try {
        const parsed = JSON.parse(stored);
        return userStateSchema.parse(parsed);
      } catch {
        localStorage.removeItem(key);
        return null;
      }
    },
    setItem: (key: string, value: UserState) => {
      if (typeof window === "undefined") return;
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    removeItem: (key: string) => {
      if (typeof window === "undefined") return;
      localStorage.removeItem(key);
    },
  }
);

export const useUser = () => {
  const user = useAtomValue(userAtom);
  if (!user) {
    throw new Error(`
Using useUser outside of AuthProvider, is that component wrapped in <AuthProvider> ?
If you are using the useUser hook in a component that is not a child of AuthProvider, it will not have access to the user state.
Mixed logic for authenticated and unauthenticated users? Consider using useAtomValue(userAtom).      
`);
  }
  return user;
};

export const tokenAtom = atom<string | null>(null);

// Logout atom - write-only atom that clears user state
export const logoutAtom = atom(null, (get, set) => {
  set(userAtom, null);
  set(tokenAtom, null);
});

// Derived atom for authentication status
export const isAuthenticatedAtom = atom((get) => {
  const user = get(userAtom);
  return !!user;
});
