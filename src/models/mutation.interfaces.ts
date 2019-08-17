import { UserUpdateInput } from '../../prisma/generated/prisma-client';

export interface UpdateUserArgs {
  id: string;
  data: UserUpdateInput;
}
