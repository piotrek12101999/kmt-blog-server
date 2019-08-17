import { User } from '../../prisma/generated/prisma-client';
import { PrismaOperations } from '../models/context.interface';
import { CustomError } from './customError';

interface UsersID {
  authorID: string;
  invokerID: string;
}

async function checkUserType(prisma: PrismaOperations, { authorID, invokerID }: UsersID): Promise<void> {
  // @ts-ignore
  const userInvokingAction: User = await prisma.query.user({ where: { id: invokerID } });

  if (userInvokingAction.id !== authorID && userInvokingAction.type !== 'ADMIN') {
    throw new CustomError(`User doesn't have required permission`);
  }
}

export { checkUserType };
