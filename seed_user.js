import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID
};

const appId = process.env.VITE_CMS_APP_ID || 'haikal-portfolio-v1';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Default Admin Credentials
const ADMIN_EMAIL = "admin@ghiffa.dev";
const ADMIN_PASSWORD = "Secret123"; // Silakan ganti setelah login pertama

async function seed() {
    console.log("🚀 Seeding started...");

    try {
        // 1. Create Admin User
        console.log(`👤 Creating admin user: ${ADMIN_EMAIL}...`);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
            console.log("✅ Admin user created successfully!");
        } catch (authError) {
            if (authError.code === 'auth/email-already-in-use') {
                console.log("ℹ️ Admin user already exists, skipping creation.");
            } else if (authError.code === 'auth/operation-not-allowed') {
                console.error("❌ ERROR: Email/Password sign-in method is not enabled in Firebase Console.");
                console.error("Please go to Authentication > Sign-in method and enable 'Email/Password'.");
                process.exit(1);
            } else {
                throw authError;
            }
        }

        // 2. Seed Initial Portfolio Content
        const portPath = `artifacts/${appId}/public/data/cms/content`;
        const portfolio_data = {
            profile: {
                nameKo: "ハイカル",
                nameEn: "Haikal Jibran Al-Ghiffarry",
                brand: "Haikal Jibran A.",
                brandKanji: "個 人 ポ ー ト フ ォ リ オ",
                tel: "+62 85156958580",
                mail: "hello@ghiffa.dev",
                adr: "Kuningan, West Java, Indonesia",
                est: "2021"
            },
            // ... (data lainnya bisa diisi manual via CMS nanti)
            lastUpdated: new Date().toISOString()
        };

        console.log(`📝 Seeding portfolio data to: ${portPath}`);
        await setDoc(doc(db, portPath), portfolio_data);
        console.log("✅ Portfolio content seeded!");

        console.log("\n✨ SEEDING COMPLETE!");
        console.log("-----------------------------------");
        console.log(`Email:    ${ADMIN_EMAIL}`);
        console.log(`Password: ${ADMIN_PASSWORD}`);
        console.log("-----------------------------------");
        console.log("Gunakan kredensial di atas untuk login ke /admin/login");

        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}

seed();
