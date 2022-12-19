import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

import { getDatabasePages, getPage, getPageContent, articlesDatabaseId } from './notion';

export async function getSortedPostsMeta() {
  const pages = await getDatabasePages(articlesDatabaseId, {
    "and": [
      {
        "property": "Status",
        "status": {
          "equals": "Published",
        }
      }
    ]
  });
  return pages.map((page) => ({
    id: page.id,
    title: page.properties.Name.title[0].text.content,
    created: page.created_time,
    lastEdited: page.last_edited_time,
  }));
}

export async function getAllPostsId() {
  const pages = await getDatabasePages(articlesDatabaseId, {
    "and": [
      {
        "property": "Status",
        "status": {
          "equals": "Published",
        }
      }
    ]
  });
  return pages.map((page) => page.id);
}

export async function getPost(id) {
  const page = await getPage(id);
  const pageContent = await getPageContent(id);

  // Use matter to parse Markdown
  const matterResult = matter(pageContent);
  // Use remark to convert Markdown into HTML
  const convertedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const pageContentHtml = convertedContent.toString();

  return {
    id: page.id,
    title: page.properties.Name.title[0].text.content,
    created: page.created_time,
    lastEdited: page.last_edited_time,
    contentMd: pageContent,
    contentHtml: pageContentHtml,
  };
}