import { atom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import z from "zod";

const workspaceStateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  logo: z
    .object({
      id: z.string(),
      original_url: z.string(),
    })
    .optional(),
});

type WorkspaceState = z.infer<typeof workspaceStateSchema> | null;

// Workspace atom with localStorage persistence
export const currentWorkspaceAtom = atomWithStorage<WorkspaceState>(
  "current-workspace", // localStorage key
  null, // initial value
  {
    getItem: (key: string) => {
      if (typeof window === "undefined") return null;
      const stored = localStorage.getItem(key);
      if (!stored) return null;
      try {
        const parsed = JSON.parse(stored);
        return workspaceStateSchema.parse(parsed);
      } catch {
        localStorage.removeItem(key);
        return null;
      }
    },
    setItem: (key: string, value: WorkspaceState) => {
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

// Workspace ID atom - runtime only (not persisted)
export const workspaceIdAtom = atom<string | null>(null);

export const useCurrentWorkspace = () => {
  const workspace = useAtomValue(currentWorkspaceAtom);
  if (!workspace) {
    throw new Error(`
Using useCurrentWorkspace outside of WorkspaceProvider, is that component wrapped in <WorkspaceProvider> ?
If you are using the useCurrentWorkspace hook in a component that is not a child of WorkspaceProvider, it will not have access to the workspace state.
Mixed logic for workspaced and non-workspaced users? Consider using useAtomValue(currentWorkspaceAtom).      
`);
  }
  return workspace;
};

// Clear workspace atom - write-only atom that clears workspace state
export const clearWorkspaceAtom = atom(null, (get, set) => {
  set(currentWorkspaceAtom, null);
  set(workspaceIdAtom, null);
});

// Derived atom for workspace context status
export const hasWorkspaceAtom = atom((get) => {
  const workspace = get(currentWorkspaceAtom);
  return !!workspace;
});
