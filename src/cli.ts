#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { diffSurfaces, loadSpec } from './openapi.js';

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
    if (opts.json) {
      console.log(JSON.stringify({ old: oldS.title, new: newS.title, changes }, null, 2));
      return;
    }
    console.log(chalk.bold(`${oldS.title}@${oldS.version} → ${newS.title}@${newS.version}\n`));
    for (const c of changes) {
      const color =
        c.kind === 'breaking' ? chalk.red : c.kind === 'security' ? chalk.yellow : chalk.green;
      console.log(color(`[${c.kind}] ${c.method ?? ''} ${c.path ?? ''} — ${c.message}`));
    }
    process.exit(changes.some((c) => c.kind === 'breaking') ? 2 : 0);
  });

program.parse();
