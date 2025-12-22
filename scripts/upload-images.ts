import { listBlogPosts, updateBlogPost, connectorConfig } from '../src/dataconnect-generated/esm/index.esm.js';
import { getDataConnect } from 'firebase/data-connect';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mime from 'mime-types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_IMG_DIR = path.resolve(__dirname, '../public/images/blog');

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Use explicit config logic like before
const dc = getDataConnect(app, connectorConfig as any);

async function uploadImage(filename: string): Promise<string | null> {
    const filePath = path.join(PUBLIC_IMG_DIR, decodeURIComponent(filename));
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        return null;
    }

    const fileContent = fs.readFileSync(filePath);
    const contentType = mime.lookup(filePath) || 'application/octet-stream';
    
    const storageRef = ref(storage, `blog-images/${filename}`);
    
    try {
        const snapshot = await uploadBytes(storageRef, fileContent, { contentType });
        const url = await getDownloadURL(snapshot.ref);
        console.log(`Uploaded ${filename} -> ${url}`);
        return url;
    } catch (e) {
        console.error(`Failed to upload ${filename}:`, e);
        return null;
    }
}

async function start() {
    console.log('Fetching all blog posts...');
    const result = await listBlogPosts(dc);
    const posts = result.data.blogPosts;
    console.log(`Found ${posts.length} posts. Processing images...`);

    for (const post of posts) {
        let content = post.content || '';
        if (!content) continue;

        // Find all img src defined as /images/blog/...
        // Regex to capture the filename
        const imgRegex = /src="\/images\/blog\/([^"]+)"/g;
        let match;
        let modified = false;
        
        // We need to replace all occurrences.
        // It's async, so we can't easily use replace().
        // We'll collect replacements first.
        const replacements = [];
        
        // Reset lastIndex because we reuse regex
        imgRegex.lastIndex = 0;
        
        while ((match = imgRegex.exec(content)) !== null) {
            const originalSrc = match[0]; // src="/images/blog/foo.png"
            const filename = match[1];    // foo.png
            replacements.push({ originalSrc, filename });
        }

        // Unique Replacements to avoid re-uploading same image in same post
        // (Though across posts we might re-upload... ideally check if exists? 
        //  Storage overwrites are fine, but wasteful. For this task, simple is okay.)
        
        // Actually, let's keep a cache if we want, but unique per post is enough for now.
        
        for (const rep of replacements) {
            const newUrl = await uploadImage(rep.filename);
            if (newUrl) {
                // Global replace this specific src string
                // content = content.split(`src="/images/blog/${rep.filename}"`).join(`src="${newUrl}"`);
                // Be careful with exact matching.
                // The regex matched `src="/images/blog/..."`
                // Let's replace the whole match.
                // BUT, what if there are duplicates? regex loop handles it?
                // `content.replace` only replaces first occurrence unless regex global.
                // Simplest is replaceAll if supported or regex.
                // Escape filename for regex?
                
                // Let's just string replace the known path prefix
                // The match extracted filename.
                // We construct the target string: `/images/blog/${rep.filename}`
                // And replace valid occurrences.
                
                const targetPath = `/images/blog/${rep.filename}`;
                if (content.includes(targetPath)) {
                    content = content.replaceAll(targetPath, newUrl);
                    modified = true;
                }
            }
        }

        if (modified) {
            console.log(`Updating post: ${post.title}`);
            try {
                await updateBlogPost(dc, {
                    id: post.id,
                    content: content,
                    updatedAt: new Date().toISOString()
                });
                console.log('Update success.');
            } catch (e) {
                console.error(`Failed to update post ${post.id}:`, e);
            }
        }
    }
    console.log('All done!');
}

start();
