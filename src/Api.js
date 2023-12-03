import 'firebase/auth';
import 'firebase/firestore';
import {app, auth} from './firebase.config';
import { GithubAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, query, where, getDocs } from 'firebase/firestore';

const db = getFirestore(app);

export default {
    githubPopup: async () => {
        const provider = new GithubAuthProvider();

        return await signInWithPopup(auth, provider)
                                .then((result) => {
                                    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                                    const credential = GithubAuthProvider.credentialFromResult(result);
                                    const token = credential.accessToken;

                                    // The signed-in user info.
                                    const user = result.user;
                                    // IdP data available using getAdditionalUserInfo(result)
                                    return user;
                                }).catch((error) => {
                                    // Handle Errors here.
                                    const errorCode = error.code;
                                    const errorMessage = error.message;
                                    // The email of the user's account used.
                                    const email = error.customData.email;
                                    // The AuthCredential type that was used.
                                    const credential = GithubAuthProvider.credentialFromError(error);
                                    // ...
                                });
    },
    addUser: async (user) => {
        const q = query(collection(db, "users"), where("name", "==", user.displayName))
        const docSnap = await getDocs(q);
        if (docSnap.docs.length == 0) {
            await addDoc(collection(db, 'users'), {
                name: user.displayName,
                photoUrl: user.photoURL
            });
        }
    }
};