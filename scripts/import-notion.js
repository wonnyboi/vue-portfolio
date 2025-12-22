import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CHANGED: Target specific subdirectory "My Tech 이모저모"
const DATA_DIR = path.resolve(
  __dirname,
  "../resources/notion-data/정휘원의 Tech Blog/My Tech 이모저모"
);
const PUBLIC_IMG_DIR = path.resolve(__dirname, "../public/images/blog");
const OUTPUT_FILE = path.resolve(__dirname, "../src/data/blog-posts.json");

if (!fs.existsSync(PUBLIC_IMG_DIR)) {
  fs.mkdirSync(PUBLIC_IMG_DIR, { recursive: true });
}
if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
}

function parseNotionHTML(content) {
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : "Untitled";

  const dateMatch = content.match(
    /<tr class="property-row property-row-created_time">.*?<time>(.*?)<\/time>/s
  );
  let createdAt = new Date().toISOString();

  if (dateMatch) {
    const dateStr = dateMatch[1].replace("@", "").trim();
    // Parse "2025년 2월 6일 오후 2:30"
    try {
      const parts = dateStr.match(
        /(\d+)년 (\d+)월 (\d+)일 (오전|오후) (\d+):(\d+)/
      );
      if (parts) {
        let year = parseInt(parts[1]);
        let month = parseInt(parts[2]) - 1;
        let day = parseInt(parts[3]);
        let meridiem = parts[4];
        let hour = parseInt(parts[5]);
        let minute = parseInt(parts[6]);

        if (meridiem === "오후" && hour < 12) hour += 12;
        if (meridiem === "오전" && hour === 12) hour = 0;

        createdAt = new Date(year, month, day, hour, minute).toISOString();
      }
    } catch (e) {
      console.warn("Date parse error:", dateStr);
    }
  }

  const tags = [];
  const tagMatches = content.matchAll(
    /<span class="selected-value.*?">(.*?)<\/span>/g
  );
  for (const match of tagMatches) {
    if (match[1] !== "아티클") {
      tags.push(match[1]);
    }
  }

  const bodyMatch = content.match(
    /<div class="page-body">(.*?)<\/div><\/article>/s
  );
  let body = bodyMatch ? bodyMatch[1] : "";

  return { title, createdAt, tags, body };
}

function getAllFiles(dirPath, arrayOfFiles) {
  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory not found: ${dirPath}`);
    return [];
  }

  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function (file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (file.endsWith(".html")) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

const posts = [];
const allHtmlFiles = getAllFiles(DATA_DIR);

console.log(`Found ${allHtmlFiles.length} HTML files in ${DATA_DIR}`);

allHtmlFiles.forEach((filePath, index) => {
  const content = fs.readFileSync(filePath, "utf-8");
  const { title, createdAt, tags, body } = parseNotionHTML(content);
  const id = path
    .basename(filePath, ".html")
    .replace(/ /g, "-")
    .replace(/[^\w-]/g, "");

  // CHANGED: Use first tag as category, fallback to 'General'
  const category = tags.length > 0 ? tags[0] : "General";

  let processedBody = body;
  processedBody = processedBody.replace(/src="([^"]+)"/g, (match, src) => {
    if (src.startsWith("http")) return match;

    try {
      const decodedSrc = decodeURIComponent(src);
      const imageSourcePath = path.join(path.dirname(filePath), decodedSrc);

      if (fs.existsSync(imageSourcePath)) {
        const newImageName = `${id}-${path.basename(decodedSrc)}`;
        const destPath = path.join(PUBLIC_IMG_DIR, newImageName);
        fs.copyFileSync(imageSourcePath, destPath);
        return `src="/images/blog/${newImageName}"`;
      }
    } catch (e) {
      console.warn("Image processing error:", src);
    }
    return match;
  });

  posts.push({
    id,
    title,
    summary: body.substring(0, 150).replace(/<[^>]*>/g, "") + "...",
    content: processedBody,
    category,
    tags,
    isPublished: true,
    createdAt,
    updatedAt: new Date().toISOString(),
  });
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
console.log(`Successfully migrated ${posts.length} posts.`);
