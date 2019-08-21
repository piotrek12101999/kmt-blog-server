import { UserUpdateInput, PostUpdateInput, PostCreateInput } from '../../prisma/generated/prisma-client';

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

export interface CreateTagArgs {
  name: string;
}

interface UpdateTagData extends CreateTagArgs {
  posts: string[];
}

export interface UpdateTagArgs {
  id: string;
  data: UpdateTagData;
}
export interface CreatePostArgs {
  data: PostCreateInput;
}
export interface UpdatePostArgs {
  id: string;
  data: PostUpdateInput;
}
export interface CreateCommentArgs {
  text: string;
  post: string;
}
