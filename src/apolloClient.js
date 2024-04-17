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
  credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      lecturer: ["id", "email", "name"],
      Query: {
        fields: {
          lecturers: {
            keyArgs: (args, context) => {
              //console.log(`args: `, args);
              //console.log(
              //`gender:${args.gender}:subjects:${JSON.stringify(
              //args.subjects
              //)}`
              //);
              //console.log(`args: `, args);
              return `gender:${args.filter.gender}:subjects:${JSON.stringify(
                args.filter.subjects
              )}characters:${args.filter.characters}`;
            },
            merge(existing, incoming, { args: { cursorId }, readField }) {
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
