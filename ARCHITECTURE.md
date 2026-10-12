# hx-api-diff-cli architecture

OpenAPI 3 breaking-change intelligence for API attack surface drift.

## Layout

```
src/
  cli.ts                    # Commander `diff` command
  types.ts                  # ApiSurface, ApiChange, DiffReport
  openapi.ts                # Back-compat re-exports
  loaders/load-spec.ts      # Read JSON/YAML → ApiSurface
  core/
    extract-operations.ts   # paths → OpRef[]
    diff-surfaces.ts        # Compare two surfaces
  analysis/summarize-changes.ts
  reporters/json.ts         # JSON output
  reporters/table.ts        # Chalk table lines
  utils/                    # op-key, is-http-method, spec-format

tests/
  diff.test.ts              # Legacy import path smoke test
```

## Develop

```bash
npm install
npm run build
npm test
```

See [SECURITY.md](./SECURITY.md) for authorized use.
