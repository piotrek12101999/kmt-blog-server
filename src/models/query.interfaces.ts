import { UserWhereInput, PostWhereInput, CommentWhereInput } from '../../prisma/generated/prisma-client';

export interface Pagination {
  first: number;
  skip: number;
  after: string;
}

export interface Query extends Pagination {
  query: string;
}

export interface OperationArguments extends Pagination {
  where: PostWhereInput | UserWhereInput | CommentWhereInput;
}
