import React, {createContext, useEffect, useState} from "react";
import {auth, firebaseApp, signInWithGooglePopup} from "../firebase";
import {onAuthStateChanged} from 'firebase/auth'
import {collection, doc, arrayUnion, arrayRemove, getDocs, getFirestore, query, where, updateDoc, addDoc} from "@firebase/firestore/lite";


export type User = {
    id: string,
    email: string ,
    favorites: string[]
}

type UserCont = {
    user: User,
    newFavorites: boolean,
    setNewFavorites: any,
    resetUser: any,
    addFavorite: any,
    removeFavorite: any,
    logout: any,
    loginWithGoogle: any,
}

const initialUser = {
    email: '',
    id: '',
    favorites: []
}

const UserContext = createContext<UserCont>(
    {
        user: initialUser,
        newFavorites: false,
        setNewFavorites: () => {},
        resetUser: () => {},
        addFavorite: (id: string) => {},
        removeFavorite: (id: string) => {},
        logout: () => {},
        loginWithGoogle: () => {},
    },
);

export const UserContextProvider = (props: any) => {

    const firestore = getFirestore(firebaseApp);

    const [user, setUser] = useState<any>(initialUser)
    const [newFavorites, setNewFavorites] = useState<boolean>(false)

    useEffect(() => {
        return onAuthStateChanged(auth, initUser)
    }, []);

    const initUser = async (authUser: any) => {
        if (authUser) {
            const user = await getUserByEmail(authUser.email)
            if (user) {
                setUser({
                    id: user.id,
                    email: user.email,
                    favorites: user.favorites
                })
            }
        } else {
            resetUser()
        }
    }
    const resetUser = () => {
        setUser(() => initialUser)
    }

    const addFavorite = async (id: string) => {
        const docRef = doc(firestore, `users/${user.id}`);
        await updateDoc(docRef, {
            favorites: arrayUnion(id)
        })
        const favorites = user.favorites.length > 0 ? [...user.favorites, id] : [id]
        setUser((user: any) => {
            return {
                ...user,
                favorites
            }
        })
        setNewFavorites(true)
    }

    const removeFavorite = async (id: string) => {
        const docRef = doc(firestore, `users/${user.id}`);
        await updateDoc(docRef, {
            favorites: arrayRemove(id)
        })
        setUser((user: any) => {
            return {
                ...user,
                favorites: user.favorites.filter((fav: any) => fav !== id)
            }
        })
    }

    const logout = async () => {
        resetUser()
        return await auth.signOut()
    }

    const getUserByEmail = async (email: string) => {
        const q = query(collection(firestore, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length === 0) {
            return
        } else {
            const id = querySnapshot.docs[0].id
            const data = querySnapshot.docs[0].data()
            return {
                id,
                email: data.email,
                favorites: data.favorites
            }
        }
    }

    const loginWithGoogle = async () => {
        try {
            const response = await signInWithGooglePopup();
            const token = await response.user.getIdToken();
            console.log(token, response.user)
            if (token && response.user && response.user.email) {
                const newUser = {
                    email: response.user.email,
                    favorites: []
                }
                const user = await getUserByEmail(response.user.email)
                if(!user) {
                    const savedUser = await addDoc(collection(firestore, "users"), newUser);
                    console.log(savedUser.id)
                    setUser({
                        email: newUser.email,
                        id: savedUser.id,
                        favorites: []
                    })
                } else {
                    setUser({
                        id: user.id,
                        email: user.email,
                        favorites: user.favorites
                    })
                }
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const context: UserCont = {
        user,
        newFavorites,
        setNewFavorites,
        resetUser,
        addFavorite,
        removeFavorite,
        logout,
        loginWithGoogle,
    }

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
