// lib/firebase-admin.ts
import admin from 'firebase-admin';

// Check if the admin app is already initialized to prevent errors.
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Replace escaped newlines with actual newlines
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  });
}

// Export the initialized admin instance.
// We specifically export the auth part for our use case.
export const adminAuth = admin.auth();
