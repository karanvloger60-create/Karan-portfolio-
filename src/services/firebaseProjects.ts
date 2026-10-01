import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Project } from '../types';
import { projectsData as defaultProjects } from '../data/projectsData';

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
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
    },
    operationType,
    path
  };
  console.warn('Firestore Error Handled:', JSON.stringify(errInfo));
}

const PROJECTS_COLLECTION = 'projects';
const CONFIG_COLLECTION = 'config';

/**
 * Seed initial sample projects if database is newly provisioned
 */
export async function seedInitialProjectsIfEmpty(): Promise<void> {
  try {
    const snap = await getDocs(collection(db, PROJECTS_COLLECTION));
    if (snap.empty) {
      console.log('Seeding initial portfolio projects to Firestore...');
      for (const p of defaultProjects) {
        await setDoc(doc(db, PROJECTS_COLLECTION, p.id), {
          ...p,
          createdAt: new Date().toISOString()
        });
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, PROJECTS_COLLECTION);
  }
}

/**
 * Real-time listener for portfolio projects
 */
export function subscribeToFirestoreProjects(
  onUpdate: (projects: Project[]) => void
): () => void {
  const colRef = collection(db, PROJECTS_COLLECTION);

  const unsubscribe = onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const loaded: Project[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as Project;
          loaded.push({
            ...data,
            id: docSnap.id
          });
        });
        // Sort by order/number
        loaded.sort((a, b) => (a.number || '').localeCompare(b.number || ''));
        onUpdate(loaded);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, PROJECTS_COLLECTION);
    }
  );

  return unsubscribe;
}

/**
 * Save single project to Cloud Firestore
 */
export async function saveProjectToFirestore(project: Project): Promise<void> {
  const path = `${PROJECTS_COLLECTION}/${project.id}`;
  try {
    await setDoc(doc(db, PROJECTS_COLLECTION, project.id), {
      ...project,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    throw error;
  }
}

/**
 * Delete project from Cloud Firestore
 */
export async function deleteProjectFromFirestore(projectId: string): Promise<void> {
  const path = `${PROJECTS_COLLECTION}/${projectId}`;
  try {
    await deleteDoc(doc(db, PROJECTS_COLLECTION, projectId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    throw error;
  }
}

/**
 * Save profile avatar to Cloud Firestore
 */
export async function saveAvatarToFirestore(avatarUrl: string): Promise<void> {
  const path = `${CONFIG_COLLECTION}/profile`;
  try {
    await setDoc(doc(db, CONFIG_COLLECTION, 'profile'), {
      avatarUrl,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Real-time listener for profile avatar
 */
export function subscribeToFirestoreAvatar(
  onUpdate: (url: string) => void
): () => void {
  const docRef = doc(db, CONFIG_COLLECTION, 'profile');
  return onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data && data.avatarUrl) {
          onUpdate(data.avatarUrl);
        }
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, `${CONFIG_COLLECTION}/profile`);
    }
  );
}
