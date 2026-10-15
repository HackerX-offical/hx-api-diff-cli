# hx-api-diff-cli

OpenAPI 3 **breaking-change intelligence** for API attack surface drift between
releases.

## Why this exists

API gateways and mobile clients hide behind versioned specs. During authorized
assessments, you need a fast diff of what disappeared, what was added, and whether auth
schemes moved — not a generic JSON diff. This CLI normalizes two OpenAPI 3 documents and
reports operation-level changes with CI-friendly exit codes.

## Features

- Compare JSON or YAML OpenAPI 3 specs side by side
- Detect removed paths, new operations, and security scheme changes
- Human-readable table output or `--json` for pipelines
- Non-zero exit when breaking changes are present

## Install

```bash
git clone https://github.com/HackerX-official/hx-api-diff-cli.git
cd hx-api-diff-cli
npm install
npm run build
npm link   # optional: global hx-api-diff
```

## Quick start

```bash
hx-api-diff diff openapi-v1.yaml openapi-v2.yaml
hx-api-diff diff baseline.json candidate.yaml --json
```

## Output

| Mode     | Description                                                         |
| -------- | ------------------------------------------------------------------- |
| Default  | Chalk table: change type, method, path, summary per line            |
| `--json` | `DiffReport` with titles, versions, `changes[]`, and summary counts |
| Exit `0` | No breaking removals detected                                       |
| Exit `2` | Breaking change (e.g. removed operation)                            |

## Develop

```bash
npm run format
npm run build
npm test
npm run format:check
```

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for module layout and extension points.

## Ethics

Use only on systems and content you are **authorized** to test. See
[SECURITY.md](./SECURITY.md).

## License

Licensed under the [HackerX License](./LICENSE). Redistributions must retain copyright,
license text, and [NOTICE](./NOTICE) attribution per the license terms.
