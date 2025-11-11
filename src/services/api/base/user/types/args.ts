export interface CreateUserArgs {
  firstName: string; // Removed Required Key
  lastName: string; // Wrong Type
  email: string;
  hash: string;
}

export interface UpdateUserArgs extends Partial<CreateUserArgs> {}
