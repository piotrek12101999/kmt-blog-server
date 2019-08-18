import { Context } from 'graphql-yoga/dist/types';
import { Tag } from '../../prisma/generated/prisma-client';

async function createTag(prisma: Context, name: string) {
  // @ts-ignore
  const tag: Tag = await prisma.createTag({ data: { name } });
  return tag.id;
}

export { createTag };
