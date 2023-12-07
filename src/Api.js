import 'firebase/auth';
import 'firebase/firestore';
import {app, auth} from './firebase.config';
import { GithubAuthProvider, signInWithPopup, getAuth, updateCurrentUser } from "firebase/auth";
import { getFirestore, collection, addDoc, onSnapshot, query, where, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';

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
        const q = query(collection(db, "users"), where("uid", "==", user.id));
        const docSnap = await getDocs(q);
        if (docSnap.docs.length == 0) {
            const docRef = await addDoc(collection(db, 'users'), {
                uid: user.id,
                name: user.displayName,
                photoUrl: user.photoURL
            });

            user.codeDataBase = docRef.id;
        } else {
            user.codeDataBase = docSnap.docs[0].id;
        }
    },
    getContactList: async (myUserId) => {
        let list = [];

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "!=", myUserId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            list.push({
                id: doc.data().uid,
                photoURL: doc.data().photoUrl,
                displayName: doc.data().name,
                codeDataBase: doc.id
            });
        });

        return list;
    },
    addNewChat: async (user, otherUser) => {
        let newChat = await addDoc(collection(db, 'chats'), {
            messages: [],
            users: [user.id, otherUser.id]
        });

        let docRef = doc(db, 'users', user.codeDataBase);

        await updateDoc(docRef, {
            chats: arrayUnion({
                chatId: newChat.id,
                title: otherUser.displayName,
                image: otherUser.photoURL,
                with: otherUser.id
            })
        });

        docRef = doc(db, 'users', otherUser.codeDataBase);

        await updateDoc(docRef, {
            chats: arrayUnion({
                chatId: newChat.id,
                title: user.displayName,
                image: user.photoURL,
                with: user.id
            })
        });
    },
    onChatList: (codeUser, setChatList) => {
        return onSnapshot(doc(db, 'chats', codeUser), (doc) => {
            if (doc.exists) {
                let data = doc.data();
                if (data.chats) {
                    setChatList(data.chats);
                }
            }
        });
    }
};