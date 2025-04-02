
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://be2-fe-task-us-east-1-staging.dcsdevelopment.me/graphql",
  generates: {
    "src/app/lib/graphql-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo"
      ],
    },
  }
};

export default config;
