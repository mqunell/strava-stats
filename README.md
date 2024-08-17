## What this template includes

- App Router
- TypeScript
- Tailwind CSS
- Mongoose
- Vitest
- ESLint, Prettier, and some plugins
- Basic code stubs and examples

<br />

## How to use this template

`create-next-app` has an optional `--example` flag that will bootstrap a new project based on an existing GitHub repository. To create a new project from this template, run the following command:

```
pnpm create next-app name-goes-here --use-pnpm --example https://github.com/mqunell/nextjs-template
```

<br />

## Additional setup instructions and usage notes

### MongoDB

1. Set up the MongoDB Atlas project
   - Configure network access by allowing 0.0.0.0/0 if deploying to Vercel
   - Configure database access user credentials _(this will be a different password than the account password!)_
2. Create `.env.local` file with the URI string
   ```
   MONGODB_URI=<Atlas URI>
   ```

### Deployment

[Vercel](https://vercel.com/) is recommended for deploying Next.js applications. Simply follow the steps, which include connecting to a GitHub repository and entering environment variables (ex. MONGODB_URI), to host the app online.

### VS Code Plugins

Some plugins that are specifically relevant to this template include:

- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- Tailwind Fold
- Vitest
