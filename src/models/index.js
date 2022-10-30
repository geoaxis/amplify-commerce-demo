// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { BookLikes, Book } = initSchema(schema);

export {
  BookLikes,
  Book
};