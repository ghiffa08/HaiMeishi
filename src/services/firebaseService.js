import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInAnonymously, 
    signInWithCustomToken, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence 
} from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    collection 
} from 'firebase/firestore';
import { 
    getStorage, 
    ref, 
    uploadBytes, 
    getDownloadURL 
} from 'firebase/storage';

// Firebase configuration using Vite environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const appId = import.meta.env.VITE_CMS_APP_ID || 'haikal-portfolio-v1';
const initialAuthToken = import.meta.env.VITE_INITIAL_AUTH_TOKEN;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);

// Enable local persistence (session survives page refresh)
setPersistence(auth, browserLocalPersistence);

/**
 * Initialize Authentication.
 * This function waits for the auth state to be resolved.
 * If no user is found after resolution, it signs in anonymously as a fallback.
 */
export const initAuth = () => {
    return new Promise((resolve) => {
        // Safety timeout: resolve after 3s anyway
        const timeout = setTimeout(() => {
            console.warn("Auth initialization timed out.");
            resolve(auth.currentUser);
        }, 3000);

        // Wait for the first auth state check
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            clearTimeout(timeout);
            unsubscribe();
            if (user) {
                resolve(user);
            } else {
                // If no user found (not even an admin session), sign in anonymously
                try {
                    if (initialAuthToken) {
                        await signInWithCustomToken(auth, initialAuthToken);
                    } else {
                        await signInAnonymously(auth);
                    }
                    resolve(auth.currentUser);
                } catch (error) {
                    console.error("Auth initialization failed:", error);
                    resolve(null);
                }
            }
        });
    });
};

/**
 * Uploads an image to Firebase Storage and returns the download URL.
 */
export const uploadImage = async (file, folder = 'assets') => {
    if (!file) return null;
    const storageRef = ref(storage, `artifacts/${appId}/public/${folder}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
};

/**
 * Admin Authentication
 */
export const loginAdmin = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const logoutAdmin = async () => {
    await signOut(auth);
    // After logout, trigger an anonymous sign-in to keep public features working
    await signInAnonymously(auth);
};

/**
 * Strict Path Builder (Rule 1)
 */
const getPublicPath = (col) => `artifacts/${appId}/public/data/${col}`;

/**
 * Fetch localized UI strings
 */
export const fetchTranslation = async (lang) => {
    await initAuth();
    const docRef = doc(db, getPublicPath('translations'), lang);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    throw new Error(`Translation for "${lang}" not found.`);
};

export const fetchPortfolio = async () => {
    await initAuth();
    const docRef = doc(db, getPublicPath('cms'), 'content');
    
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            localStorage.setItem('cms_portfolio_data', JSON.stringify(data));
            return data;
        }
    } catch (error) {
        console.warn("Failed to fetch fresh portfolio data. Falling back to cache.", error);
    }

    // Fallback to cache if offline or fetch fails
    const cache = localStorage.getItem('cms_portfolio_data');
    if (cache) {
        try {
            return JSON.parse(cache);
        } catch (e) {
            localStorage.removeItem('cms_portfolio_data');
        }
    }
    
    throw new Error("Portfolio content not found and no cache available.");
};

/**
 * Admin: Publish Content (Phase 3)
 */
export const updateCmsContent = async (data) => {
    if (!auth.currentUser || auth.currentUser.isAnonymous) {
        throw new Error("Unauthorized: Admin access required.");
    }

    const payload = {
        ...data,
        lastUpdated: new Date().toISOString()
    };

    const docRef = doc(db, getPublicPath('cms'), 'content');
    await setDoc(docRef, payload);
    
    // Clear cache after update
    localStorage.setItem('cms_portfolio_data', JSON.stringify(payload));
    return payload;
};

export default {
    initAuth,
    loginAdmin,
    logoutAdmin,
    fetchTranslation,
    fetchPortfolio,
    updateCmsContent,
    uploadImage,
    storage
};
