// Utility to strip MongoDB _id field from documents
export function stripMongoId<T extends { _id?: unknown }>(document: T): Omit<T, '_id'> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...rest } = document
  return rest as Omit<T, '_id'>
}


