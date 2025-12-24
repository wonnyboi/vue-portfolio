import { createBlogPost, connectorConfig } from '../src/dataconnect-generated';
import { getDataConnect } from 'firebase/data-connect';
import { initializeApp } from 'firebase/app';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Read JSON data
const blogData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/blog-posts.json'), 'utf-8'));

dotenv.config();

console.log('Project ID:', process.env.VITE_FIREBASE_PROJECT_ID);

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

console.log('SDK Connector Config:', connectorConfig);

let dc: any;
try {
    // Pass the config exactly as exported by the generated SDK
    dc = getDataConnect(app, connectorConfig as any);
    console.log('Successfully initialized DataConnect');
} catch (e: any) {
    console.error('Error initializing DataConnect:', e);
    process.exit(1);
}

async function migrate() {
    console.log(`Starting migration of ${blogData.length} posts...`);
    
    let successCount = 0;
    let failCount = 0;

    for (const post of blogData) {
        try {
            await createBlogPost(dc, {
                id: post.id,
                title: post.title,
                summary: post.summary,
                content: post.content,
                category: post.category,
                tags: post.tags,
                isPublished: post.isPublished,
                createdAt: typeof post.createdAt === 'string' ? post.createdAt : new Date(post.createdAt).toISOString(),
                updatedAt: typeof post.updatedAt === 'string' ? post.updatedAt : new Date(post.updatedAt).toISOString()
            });
            successCount++;
            if (successCount % 10 === 0) console.log(`Migrated ${successCount} posts...`);
        } catch (e: any) {
            console.error(`Failed to migrate post ${post.id}:`, e.message);
            failCount++;
        }
    }
    
    console.log(`Migration complete. Success: ${successCount}, Failed: ${failCount}`);
}

migrate();
