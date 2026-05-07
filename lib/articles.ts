import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const ARTICLES_DIR = path.join(process.cwd(), "content", "insights");

export interface ArticleMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readMinutes: number;
}

export interface Article extends ArticleMeta {
  html: string;
}

async function readArticleFile(filename: string): Promise<Article> {
  const slug = filename.replace(/\.md$/, "");
  const raw = await fs.readFile(path.join(ARTICLES_DIR, filename), "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Omit<ArticleMeta, "slug">;
  const rendered = await remark().use(html).process(parsed.content);
  return {
    slug,
    title: data.title,
    summary: data.summary,
    date: data.date,
    readMinutes: data.readMinutes,
    html: String(rendered),
  };
}

export async function listArticles(): Promise<ArticleMeta[]> {
  const files = await fs.readdir(ARTICLES_DIR);
  const articles = await Promise.all(
    files.filter((f) => f.endsWith(".md")).map(readArticleFile)
  );
  return articles
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ html: _html, ...meta }) => meta);
}

export async function getArticle(slug: string): Promise<Article | null> {
  try {
    return await readArticleFile(`${slug}.md`);
  } catch {
    return null;
  }
}
