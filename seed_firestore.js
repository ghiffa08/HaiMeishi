import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import * as dotenv from 'dotenv';

// Memuat variabel lingkungan dari .env
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

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

import { LOCAL_TRANSLATIONS as translations } from './src/data/translations.js';

// ==========================================
// DATA PORTFOLIO (CMS CONTENT)
// ==========================================
const portfolioContent = {
    profile: {
        nameKo: "ハイカル",
        nameEn: "Haikal Jibran Al-Ghiffarry",
        role: "Informatics Student | Full Stack Developer & IoT Engineer",
        tagline: "Building Digital Solutions from Software to Hardware",
        brand: "Haikal Jibran A.",
        brandKanji: "個 人 ポ ー ト フ ォ リ オ",
        tel: "+62 85156958580",
        mail: "hello@ghiffa.dev",
        adr: "Kuningan, West Java, Indonesia",
        est: "2021",
        bio1: "An Informatics Engineering student focusing on developing comprehensive technological solutions bridging Web Development, the Internet of Things (IoT), and Robotics.",
        bio2: "Experienced in application development and technology-based innovation. Best graduate in Software Engineering, certified Junior Web Developer, and actively involved in academic research and intellectual property development.",
        bioJp: "Web開発、IoT、ロボティクス分野における包括的な技術ソリューションの開発に注力する情報工学の学生。アプリケーション開発と技術革新の経験があり、ソフトウェア工学の首席卒業生でもあります。"
    },
    links: [
        { name: "Portfolio", sub: "www.ghiffa.dev", href: "https://www.ghiffa.dev" },
        { name: "GitHub", sub: "@ghiffa08", href: "https://github.com/ghiffa08" },
        { name: "LinkedIn", sub: "Haikal Jibran A.", href: "https://www.linkedin.com/in/haikal-jibran-al-ghiffarry" },
        { name: "Instagram", sub: "@haikaljibraan", href: "https://www.instagram.com/haikaljibraan/" }
    ],
    experience: [
        {
            year: "Oct 2024 - Feb 2025",
            role: "Web Developer",
            org: "PT. Bengkel Aplikasi Nusantara",
            desc: "Developed EduDikti (School Management System) and Hijarah Corebanking (Web-based core banking system)."
        },
        {
            year: "May - Jun 2024",
            role: "Web Developer",
            org: "LSP-P1 SMKN 2 Kuningan",
            desc: "Designed and built a web application for managing professional certifications and online assessments."
        },
        {
            year: "Oct - Dec 2023",
            role: "Web Developer",
            org: "PT. BPR Raksa Wacana Agri Purnama",
            desc: "Developed 'E-Digital Bank Raksa' and 'Kredit Raksa Analytica' for credit analysis management."
        }
    ],
    education: [
        { year: "2024 - Present", degree: "Informatics Engineering", org: "Universitas Kuningan", note: "Current GPA: 3.90" },
        { year: "2021 - 2024", degree: "Software Engineering", org: "SMKN 2 Kuningan", note: "Best Graduate / GPA: 3.90" }
    ],
    awards: [
        { year: "2025", title: "1st Place - Outstanding Student (Pilmapres)", org: "Universitas Kuningan" },
        { year: "2025", title: "2nd Place Winner - Int. Digital Math Game Competition", org: "Universitas Syiah Kuala" },
        { year: "2024", title: "Highest Vocational Competency Score (UKK)", org: "SMKN 2 Kuningan" },
        { year: "2023", title: "1st Place - Business Plan Competition", org: "Uniku Business Community" },
        { year: "2023", title: "Finalist - Astra Vocapreneur Program", org: "PT Astra International Tbk" }
    ],
    works: [
        {
            id: "bank-raksa",
            year: "2023",
            title: "Digital Bank Raksa & Kredit Analytica",
            titleJp: "デジタル銀行・クレジット分析システム",
            shortDesc: "Comprehensive digital banking and credit analysis platform.",
            fullDesc: "E-Digital Bank Raksa and Kredit Raksa Analytica are comprehensive banking platforms designed to streamline credit analysis and digital transactions for PT. BPR Raksa Wacana Agri Purnama. The system integrates advanced analytical tools to evaluate credit risks efficiently while providing a seamless user experience for both administrators and clients. Built with a robust full-stack architecture, it ensures high security, real-time data processing, and scalable infrastructure to meet the growing demands of modern financial services.",
            fullDescJp: "E-Digital Bank RaksaとKredit Raksa Analyticaは、PT. BPR Raksa Wacana Agri Purnama向けの包括的なバンキングプラットフォームです。このシステムは、クレジットリスクを効率的に評価するための高度な分析ツールを統合し、管理者と顧客の双方にシームレスなユーザーエクスペリエンスを提供します。堅牢なフルスタックアーキテクチャで構築されており、高いセキュリティ、リアルタイムデータ処理、スケーラブルなインフラストラクチャを保証します。",
            tags: ["Web Development", "Fintech", "Banking"],
            role: "Full Stack Developer",
            link: "https://e-digital-bank.rwap.co.id/"
        },
        {
            id: "lsp-scada",
            year: "2024",
            title: "LSP SCADA APP",
            titleJp: "プロフェッショナル認定プラットフォーム",
            shortDesc: "Management app for professional certification and online competency testing.",
            fullDesc: "LSP SCADA APP is a specialized web application developed for LSP-P1 SMKN 2 Kuningan to manage professional certifications and online competency assessments. The platform digitalizes the entire certification workflow, from candidate registration and document verification to the execution of online exams and real-time grading. It features a secure testing environment and comprehensive reporting tools, significantly improving the efficiency and transparency of the vocational assessment process.",
            fullDescJp: "LSP SCADA APPは、LSP-P1 SMKN 2 Kuningan向けに開発された専門的なWebアプリケーションであり、専門資格の認定とオンラインコンピテンシー評価を管理します。候補者の登録からオンライン試験の実施、リアルタイムの採点まで、認定ワークフロー全体をデジタル化します。安全なテスト環境と包括的なレポート機能を備えており、職業評価プロセスの効率と透明性を大幅に向上させます。",
            tags: ["Web App", "Education", "Assessment"],
            role: "Web Developer",
            link: "http://lsp.apps.smkn2-kng.sch.id/"
        }
    ],
    organizations: [
        { year: "2025", role: "Head of Science & Tech Division", org: "HIMA TI UNIKU" },
        { year: "2025", role: "Secretary General", org: "UKM Pencak Silat UNIKU" },
        { year: "2025", role: "Academic & Science Division", org: "Paguyuban Barudak Komputer UNIKU" }
    ],
    publications: [
        { year: "2025", title: "International Journal Publication", org: "Scopus/Sinta Indexed", note: "Ongoing research paper." }
    ],
    intellectual_property: [
        { year: "2024", title: "Software Copyright (HaKI)", org: "Kemenkumham RI", note: "Registered technology innovation." }
    ]
};

// ==========================================
// SEEDING LOGIC
// ==========================================
async function seed() {
    console.log("🚀 Seeding process started...");

    try {
        // Autentikasi terlebih dahulu agar memiliki izin tulis
        await signInAnonymously(auth);
        console.log("🔑 Authenticated as Anonymous Admin");

        // 1. Simpan semua bahasa ke koleksi translations
        const langKeys = Object.keys(translations);
        for (const lang of langKeys) {
            const transPath = `artifacts/${appId}/public/data/translations/${lang}`;
            await setDoc(doc(db, transPath), translations[lang]);
            console.log(`✅ Translation for [${lang}] pushed.`);
        }

        // 2. Simpan konten portofolio utama
        const portPath = `artifacts/${appId}/public/data/cms/content`;
        await setDoc(doc(db, portPath), portfolioContent);
        console.log(`✅ Main Portfolio Content pushed to: ${portPath}`);

        console.log("\n✨ Seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("\n❌ Seeding failed:", error);
        if (error.code === 'permission-denied') {
            console.error("💡 TIP: Check your Firestore Rules. Make sure 'allow write' is permitted.");
        }
        process.exit(1);
    }
}

seed();