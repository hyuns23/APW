import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp,
  Timestamp,
  setDoc
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  category: 'Video Content' | 'AI Visuals' | 'Brand Design';
  imageUrl: string;
  videoUrl?: string;
  createdAt: Timestamp | any;
  updatedAt?: Timestamp | any;
  order: number;
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  contactEmail: string;
  instagramUrl: string;
  youtubeUrl: string;
  logoUrl?: string;
}

const PROJECTS_COLLECTION = 'projects';
const SETTINGS_COLLECTION = 'settings';
const GLOBAL_SETTINGS_ID = 'global';

export const cmsService = {
  // Projects
  async getProjects(): Promise<Project[]> {
    try {
      const q = query(collection(db, PROJECTS_COLLECTION), orderBy('order', 'asc'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, PROJECTS_COLLECTION);
      return [];
    }
  },

  async addProject(project: Omit<Project, 'id' | 'createdAt'>) {
    try {
      const data = {
        ...project,
        createdAt: serverTimestamp(),
      };
      return await addDoc(collection(db, PROJECTS_COLLECTION), data);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, PROJECTS_COLLECTION);
    }
  },

  async updateProject(id: string, project: Partial<Project>) {
    try {
      const ref = doc(db, PROJECTS_COLLECTION, id);
      await updateDoc(ref, project);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${PROJECTS_COLLECTION}/${id}`);
    }
  },

  async deleteProject(id: string) {
    try {
      await deleteDoc(doc(db, PROJECTS_COLLECTION, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${PROJECTS_COLLECTION}/${id}`);
    }
  },

  // Settings
  async getSettings(): Promise<SiteSettings | null> {
    try {
      const ref = doc(db, SETTINGS_COLLECTION, GLOBAL_SETTINGS_ID);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        return snapshot.data() as SiteSettings;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${SETTINGS_COLLECTION}/${GLOBAL_SETTINGS_ID}`);
      return null;
    }
  },

  async updateSettings(settings: SiteSettings) {
    try {
      const ref = doc(db, SETTINGS_COLLECTION, GLOBAL_SETTINGS_ID);
      await setDoc(ref, settings as any, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${SETTINGS_COLLECTION}/${GLOBAL_SETTINGS_ID}`);
    }
  }
};
