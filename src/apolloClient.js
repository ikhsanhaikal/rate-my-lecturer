import { ApolloClient, InMemoryCache } from "@apollo/client";

function offsetFromCursor(items, cursor, readField) {
  for (let i = items.length - 1; i >= 0; --i) {
    const item = items[i];
    if (readField("id", item) === cursor) {
      return i + 1;
    }
  }
  return -1;
}

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_API
    : process.env.REACT_APP_PROD_API;

export const apolloClient = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          lecturers: {
            keyArgs: false,
            merge(existing, incoming, { args: { cursorId }, readField }) {
              console.log(`merge function cursorId: `, cursorId);
              const merged = existing ? existing.slice(0) : [];
              let offset = offsetFromCursor(merged, cursorId, readField);
              if (offset < 0) offset = merged.length;
              for (let i = 0; i < incoming.length; ++i) {
                merged[offset + i] = incoming[i];
              }
              return merged;
            },
          },
        },
      },
    },
  }),
});
