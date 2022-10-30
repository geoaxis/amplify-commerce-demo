import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

type BookLikesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BookMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerBookLikes = {
  readonly id: string;
  readonly userid?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBookLikes = {
  readonly id: string;
  readonly userid?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type BookLikes = LazyLoading extends LazyLoadingDisabled ? EagerBookLikes : LazyBookLikes

export declare const BookLikes: (new (init: ModelInit<BookLikes, BookLikesMetaData>) => BookLikes) & {
  copyOf(source: BookLikes, mutator: (draft: MutableModel<BookLikes, BookLikesMetaData>) => MutableModel<BookLikes, BookLikesMetaData> | void): BookLikes;
}

type EagerBook = {
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly price?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBook = {
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly price?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Book = LazyLoading extends LazyLoadingDisabled ? EagerBook : LazyBook

export declare const Book: (new (init: ModelInit<Book, BookMetaData>) => Book) & {
  copyOf(source: Book, mutator: (draft: MutableModel<Book, BookMetaData>) => MutableModel<Book, BookMetaData> | void): Book;
}