import { UserUpdateInput, PostUpdateInput } from '../../prisma/generated/prisma-client';

interface LoginData {
  email: string;
  password: string;
}
export interface LoginArgs {
  data: LoginData;
}
export interface UpdateUserArgs {
  id: string;
  data: UserUpdateInput;
}
export interface UpdatePostArgs {
  id: string;
  data: PostUpdateInput;
}
