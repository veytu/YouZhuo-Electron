import fs from 'fs';
import path from 'path';
import htmlParser from 'node-html-parser';
import { ESLint } from 'eslint';

const SVG_COM_DIR = path.resolve(__dirname, '../src/components/svg-img');
const SVG_PATHS_DIR = path.resolve(__dirname, '../src/components/svg-img/paths');

function interpolateIcon(tag: string, viewBox: string, needWrap: boolean) {
  const template = `
    import React from 'react';
    
    import { PathOptions } from '../svg-dict';
    
    export const path = ({ iconPrimary }: PathOptions) => (
      ${needWrap ? '<g>' : ''}
      ${tag}
      ${needWrap ? '</g>' : ''}
    );
    export const viewBox = '${viewBox}';
    `;

  return template;
}

function interpolateType(content: string) {
  const template = `
  export enum SvgIconEnum {
  ${content}
  }
  `;
  return template;
}

function generateSvgTsx() {
  fs.readdirSync(SVG_PATHS_DIR).forEach((fn: string) => {
    if (!fn.toLowerCase().endsWith('.svg')) {
      return;
    }

    const content = fs.readFileSync(path.resolve(SVG_PATHS_DIR, fn), 'utf-8');

    const svgRoot = htmlParser.parse(content).querySelector('svg')!;

    const viewBox = svgRoot.getAttribute('viewBox')!;

    const inplate = interpolateIcon(svgRoot.innerHTML, viewBox, svgRoot.childNodes.length > 1);

    const fnSnakeCase = (path.basename(fn, '.svg') + '.tsx').replace(/-/g, '_');

    const outfile = path.resolve(SVG_PATHS_DIR, fnSnakeCase);

    if (!fs.existsSync(outfile)) {
      fs.writeFileSync(outfile, inplate);
      console.log(`${outfile} generated`);
    }

    fs.unlinkSync(path.resolve(SVG_PATHS_DIR, fn));
  });
}

function generateSvgEnumType() {
  const keys: string[] = [];
  fs.readdirSync(SVG_PATHS_DIR).forEach((fn) => {
    if (fn.toLowerCase().endsWith('.tsx')) {
      const fsn = path.basename(fn, '.tsx');
      keys.push(fsn.toUpperCase());
    }
  });
  const content = keys.map((k: string) => `\t${k} = '${k.toLowerCase()}',\n`).join('');

  const inplate = interpolateType(content);

  fs.writeFileSync(path.resolve(SVG_COM_DIR, 'type.ts'), inplate);
}

async function lintFiles(globs: string[]) {
  const eslint = new ESLint({ fix: true });
  await eslint.lintFiles(globs).then(async (results) => {
    ESLint.outputFixes(results);
  });
}

generateSvgTsx();

generateSvgEnumType();

lintFiles([path.resolve(SVG_PATHS_DIR, '*.tsx')]);
