import { createProject, connectorConfig } from '../src/dataconnect-generated/esm/index.esm.js';
import { getDataConnect } from 'firebase/data-connect';
import { initializeApp } from 'firebase/app';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

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
const dc = getDataConnect(app, connectorConfig as any);

const MOCK_PROJECTS = [
    {
        id: '1',
        title: 'Vision AI Traffic Monitor',
        summary: 'Real-time traffic analysis using YOLOv8 and Python.',
        description: 'A comprehensive system for monitoring traffic flow using computer vision. Features vehicle counting, classification, and speed estimation.',
        techStack: ['Python', 'OpenCV', 'YOLO'],
        role: ['Lead AI Engineer'],
        periodStart: new Date('2023-01-01').toISOString(),
        periodEnd: new Date('2023-06-01').toISOString(),
        images: [],
        tags: ['Vision AI', 'Python'],
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '2',
        title: 'Flutter E-Commerce App',
        summary: 'Cross-platform mobile app with complex animations.',
        description: 'Built a high-performance shopping app with features like real-time inventory updates, smooth transitions, and secure checkout.',
        techStack: ['Flutter', 'Dart', 'Firebase'],
        role: ['Sole Developer'],
        periodStart: new Date('2023-07-01').toISOString(),
        periodEnd: null,
        images: [],
        tags: ['Flutter', 'Mobile'],
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

async function seed() {
    console.log('Seeding projects...');
    for (const project of MOCK_PROJECTS) {
        try {
            console.log(`Creating project: ${project.title}`);
            await createProject(dc, project);
            console.log('Success!');
        } catch (e: any) {
            console.error(`Failed to create ${project.title}:`, e);
        }
    }
    console.log('Done.');
    process.exit(0);
}

seed();
