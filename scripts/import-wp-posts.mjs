/**
 * One-time script to import WordPress blog posts into Astro markdown files.
 * Reads wp_posts.json, converts HTML content to Markdown, writes to src/content/blog/
 *
 * Usage: node scripts/import-wp-posts.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ── Post IDs to import (skip 420 = "Principles for Studying Math" — already a standalone page)
const TARGET_IDS = new Set([160, 390, 400, 410, 430, 467, 652]);

// ── Simple HTML → Markdown converter
function htmlToMarkdown(html) {
  if (!html) return '';

  let md = html;

  // Remove Gutenberg block comments
  md = md.replace(/<!-- \/?wp:[^>]*-->/g, '');

  // Unescape doubled quotes from CSV/JSON encoding
  md = md.replace(/""/g, '"');

  // Headings
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n');
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n');
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n');

  // Bold / italic
  md = md.replace(/<strong>(.*?)<\/strong>/gi, '**$1**');
  md = md.replace(/<b>(.*?)<\/b>/gi, '**$1**');
  md = md.replace(/<em>(.*?)<\/em>/gi, '*$1*');
  md = md.replace(/<i>(.*?)<\/i>/gi, '*$1*');

  // Links
  md = md.replace(/<a[^>]+href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

  // Lists — process list items before stripping ul/ol tags
  // Convert <li> inside <ol> to numbered items
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, inner) => {
    let i = 0;
    return inner.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (__, item) => {
      i++;
      return `\n${i}. ${stripTags(item).trim()}`;
    }) + '\n';
  });

  // Convert <li> inside <ul> to bullet items
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, inner) => {
    return inner.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (__, item) => {
      return `\n- ${stripTags(item).trim()}`;
    }) + '\n';
  });

  // Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n$1\n');

  // Line breaks
  md = md.replace(/<br\s*\/?>/gi, '\n');

  // Strip any remaining HTML tags
  md = stripTags(md);

  // Clean up whitespace: collapse 3+ blank lines to 2
  md = md.replace(/\n{3,}/g, '\n\n');

  return md.trim();
}

function stripTags(str) {
  return str.replace(/<[^>]+>/g, '');
}

// ── Build a safe excerpt from content (first ~160 chars of plain text)
function makeExcerpt(wpExcerpt, content) {
  if (wpExcerpt && wpExcerpt.trim()) {
    return stripTags(wpExcerpt).replace(/""/g, '"').trim().slice(0, 200);
  }
  const plain = stripTags(content.replace(/<!-- \/?wp:[^>]*-->/g, '')).replace(/""/g, '"').trim();
  const sentence = plain.split(/[.!?]/)[0];
  return sentence ? sentence.trim().slice(0, 200) : plain.slice(0, 160);
}

// ── Read and parse wp_posts.json
const jsonPath = path.join(ROOT, 'wp_posts.json');
const raw = fs.readFileSync(jsonPath, 'utf8');
const data = JSON.parse(raw);

// PHPMyAdmin JSON export: top-level array of [{type:"header"}, {type:"database"}, {type:"table", data:[...]}]
let rows = [];
if (Array.isArray(data)) {
  // Find the table entry that has a "data" array of post objects
  const tableEntry = data.find(entry => entry.type === 'table' && Array.isArray(entry.data));
  if (tableEntry) {
    rows = tableEntry.data;
  } else {
    // Fallback: find any entry with a data array
    const anyEntry = data.find(entry => Array.isArray(entry.data));
    if (anyEntry) rows = anyEntry.data;
    else rows = data; // last resort
  }
} else if (data.data && Array.isArray(data.data)) {
  rows = data.data;
}

if (rows.length === 0) {
  console.error('Could not find post rows in wp_posts.json. Keys:', Object.keys(data));
  process.exit(1);
}

console.log(`Total rows in JSON: ${rows.length}`);

// ── Filter to target posts
const posts = rows.filter(row => {
  const id = parseInt(row.ID ?? row.id ?? 0);
  return TARGET_IDS.has(id);
});

console.log(`Found ${posts.length} target posts`);

if (posts.length === 0) {
  console.error('No matching posts found. Check the JSON structure.');
  console.log('Sample row keys:', Object.keys(rows[0] || {}));
  process.exit(1);
}

// ── Output directory
const outDir = path.join(ROOT, 'src/content/blog');
fs.mkdirSync(outDir, { recursive: true });

// ── Generate .md files
for (const post of posts) {
  const id = parseInt(post.ID ?? post.id);
  const title = (post.post_title ?? '').replace(/""/g, '"');
  const date = (post.post_date ?? '').slice(0, 10); // YYYY-MM-DD
  const slug = post.post_name ?? title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const rawContent = post.post_content ?? '';
  const rawExcerpt = post.post_excerpt ?? '';

  const excerpt = makeExcerpt(rawExcerpt, rawContent);
  const body = htmlToMarkdown(rawContent);

  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: ${date}`,
    `slug: "${slug}"`,
    `excerpt: "${excerpt.replace(/"/g, '\\"')}"`,
    '---',
  ].join('\n');

  const fileContent = `${frontmatter}\n\n${body}\n`;
  const filename = `${slug}.md`;
  const outPath = path.join(outDir, filename);

  fs.writeFileSync(outPath, fileContent, 'utf8');
  console.log(`  ✓ ${filename} (ID ${id})`);
}

console.log('\nDone! Check src/content/blog/ for the generated files.');
