import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY || '' });
const notion2md = new NotionToMarkdown({ notionClient: notion });

export const articlesDatabaseId = process.env.NOTION_DATABASE_ID || '';

export async function getDatabasePages(databaseId, filter, sorts) {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter,
  });
  return response.results;
}

export async function getPage(pageId) {
  return notion.pages.retrieve({
    page_id: pageId,
  });
}

export async function getPageContent(pageId) {
  const mdblocks = await notion2md.pageToMarkdown(pageId);
  return notion2md.toMarkdownString(mdblocks);
}