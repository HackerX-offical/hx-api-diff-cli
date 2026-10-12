#!/usr/bin/env node
import { Command } from 'commander';
import { loadSpec } from './loaders/load-spec.js';
import { diffSurfaces } from './core/diff-surfaces.js';
import {
  buildDiffReport,
  exitCodeForChanges,
  summarizeChanges,
} from './analysis/summarize-changes.js';
import { toJsonDiff } from './reporters/json.js';
import { formatChangeLine, formatDiffHeader } from './reporters/table.js';

const program = new Command();
program.name('hx-api-diff').description('OpenAPI breaking-change engine').version('1.0.0');

program
  .command('diff')
  .description('Compare two OpenAPI 3 specs (JSON or YAML)')
  .argument('<old>', 'baseline spec')
  .argument('<new>', 'new spec')
  .option('--json', 'JSON output')
  .action((oldP: string, newP: string, opts: { json?: boolean }) => {
    const oldS = loadSpec(oldP);
    const newS = loadSpec(newP);
    const changes = diffSurfaces(oldS, newS);
    const summary = summarizeChanges(changes);
    if (opts.json) {
      const report = buildDiffReport(oldS.title, oldS.version, newS.title, newS.version, changes);
      console.log(toJsonDiff(report, summary));
      process.exit(exitCodeForChanges(changes));
      return;
    }
    console.log(formatDiffHeader(oldS.title, oldS.version, newS.title, newS.version));
    for (const c of changes) console.log(formatChangeLine(c));
    process.exit(exitCodeForChanges(changes));
  });

program.parse();
