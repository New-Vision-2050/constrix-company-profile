import { BE_Workspace } from "../workspace";

// Working hours time slot
export interface BE_TimeSlot {
  startTime: string; // HH:MM format
  durationMs: number; // Duration in milliseconds
}

// Working hours for all days
export interface BE_WorkingHours {
  mon?: BE_TimeSlot[];
  tue?: BE_TimeSlot[];
  wed?: BE_TimeSlot[];
  thu?: BE_TimeSlot[];
  fri?: BE_TimeSlot[];
  sat?: BE_TimeSlot[];
  sun?: BE_TimeSlot[];
}

export interface BE_Branch {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  slug?: string;
  address: string;
  city: string;
  country?: string;
  phone: string;
  email?: string;
  workingHours?: BE_WorkingHours;
  logoUrl?: string;
  workspaceId: string;
}

export interface BE_BranchWithWorkspace extends BE_Branch {
  workspace?: BE_Workspace;
}
