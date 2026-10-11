# npm Publishing Guide

This guide prepares and publishes `dslearn`. The package is authored by `imowaix`; publishing requires an npm account that owns or has publish access to the package name. No publish command is run as part of normal validation.

## Before Publishing

1. Confirm that `dslearn` is available or that your npm account has access:

   ```sh
   npm view dslearn version
   ```

   A `404 Not Found` means no public package currently resolves under that name. Availability can change before publication.

2. Use Node.js 20 or newer for the development scripts. The published library itself supports Node.js 18 or newer.

3. Install the locked dependencies and run all release checks:

   ```sh
   npm ci
   npm run validate
   npm pack --dry-run
   ```

   The `prepublishOnly` lifecycle also runs `npm run validate` before a publish.

4. Review the tarball contents. It should contain compiled files in `dist/`, package metadata, README, license, changelog, and the guides under `docs/`; it should not contain tests, development dependencies, or credentials.

5. Check the version in `package.json`. npm does not allow publishing a version that is already present. Update it before release and commit the version change through your usual Git review process.

## Authenticate and Publish

Authenticate interactively so credentials stay in npm's own prompt:

```sh
npm login
npm whoami
```

When the account, name, version, and packed contents are confirmed, publish the public package:

```sh
npm publish --access public
```

This command publishes externally. Run it only when the release is approved. For a scoped public package, `--access public` is required; it is also safe to include for this unscoped package.

Verify the published version and package metadata afterward:

```sh
npm view dslearn version
npm view dslearn dist.tarball
```

## Release Notes

- The package exports native ESM from `dist/index.js` and declarations from `dist/index.d.ts`.
- `files` in `package.json` controls the package allowlist.
- `npm pack --dry-run` previews the archive; `npm pack` creates a local archive but does not publish it.
- Never commit npm tokens or place them in the repository. Use npm's login flow and account-level two-factor authentication.
- If publication fails because the name is claimed or access is denied, do not change the package identity silently. Resolve ownership or choose a scoped name, then update imports and metadata consistently.
