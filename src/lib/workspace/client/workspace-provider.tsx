// providers/WorkspaceProvider.tsx
"use client";
import {
  currentWorkspaceAtom,
  workspaceIdAtom,
} from "@/lib/jotai/atoms/workspace";
import { BE_WorkspaceWithOwner } from "@/types/api/base/workspace";
import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

export default function WorkspaceHydrator({
  workspaceId,
  workspace,
  children,
}: {
  workspaceId: string | null;
  workspace: BE_WorkspaceWithOwner | null;
  children: React.ReactNode;
}) {
  useHydrateAtoms([
    [workspaceIdAtom, workspaceId],
    [currentWorkspaceAtom, workspace],
  ]);
  return <>{children}</>;
}

export function WorkspaceProvider({
  workspaceId,
  workspace,
  children,
}: {
  workspaceId: string | null;
  workspace: BE_WorkspaceWithOwner | null;
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <WorkspaceHydrator workspaceId={workspaceId} workspace={workspace}>
        {children}
      </WorkspaceHydrator>
    </Provider>
  );
}
