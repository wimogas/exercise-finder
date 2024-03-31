import React, { createContext, useState } from "react";
import {setFirebasePersistenceOff, signInWithGooglePopup} from "../firebase";
import {Exercise} from "./exercise-context";

export type User = {
    email: string ,
    id: string,
    favorites: Exercise[]
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
    checkSession: any
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
        checkSession: () => {}
    },
);

export const UserContextProvider = (props: any) => {

    const [user, setUser] = useState<User>(initialUser)
    const [newFavorites, setNewFavorites] = useState<boolean>(false)

    const resetUser = () => {
        setUser(() => {
            return initialUser
        })
    }

    const addFavorite = async (favorite: any) => {
        await fetch(
            `${process.env.API_SERVER_URL}/users/${user.id}/favorites`,{
                method: "PATCH",
                credentials: "include",
                body: JSON.stringify({
                    favoriteId: favorite._id
                }),
                headers: {
                    'Content-Type' : 'application/json'
                }
            }
        )
        const favorites = user.favorites.length > 0 ? [...user.favorites, favorite] : [favorite]
        setUser((user) => {
            return {
                ...user,
                favorites
            }
        })
        setNewFavorites(true)
    }

    const removeFavorite = async (id: string) => {
        await fetch(
            `${process.env.API_SERVER_URL}/users/${user.id}/favorites/${id}`,{
                method: "DELETE",
                credentials: "include",
                headers: {
                    'Content-Type' : 'application/json'
                }
            }
        )
        setUser((user) => {
            return {
                ...user,
                favorites: user.favorites.filter((fav: any) => fav._id !== id)
            }
        })
    }

    const logout = async () => {
        try {
            const res = await fetch(
                `${process.env.API_SERVER_URL}/users/logout`,{
                    method: "POST",
                    credentials: "include",
                }
            )
            const data = await res.json()
            if (data.message.length > 0) {
                resetUser()
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    const loginWithGoogle = async () => {
        try {
            const response = await signInWithGooglePopup();
            const token = await response.user.getIdToken();
            console.log(token)
            if (token) {
                const res = await fetch(
                    `${process.env.API_SERVER_URL}/users/session`,{
                        method: "POST",
                        body: JSON.stringify({token}),
                        credentials: "include",
                        headers: {
                            'Content-Type' : 'application/json'
                        }
                    }
                )
                const currentUser = await res.json()
                await setFirebasePersistenceOff()
                setUser((user: User) => {
                    return {
                        ...user,
                        id: currentUser.id,
                        email: currentUser.email,
                        favorites: currentUser.favorites
                    }
                })
            }
        } catch (error) {
            console.error('Error setting cookie:', error);
        }
    };

    const checkSession = async () => {
        try {
            const res = await fetch(
                `${process.env.API_SERVER_URL}/users/session`,{
                    method: "GET",
                    credentials: "include",
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                }
            )
            const currentUser = await res.json()
            if (currentUser.email) {
                setUser((user: User) => {
                    return {
                        ...user,
                        id: currentUser.id,
                        email: currentUser.email,
                        favorites: currentUser.favorites
                    }
                })
            } else {
                logout().catch((err) => console.error(err))
            }
        } catch (error) {
            return error
        }
    }

    const context: UserCont = {
        user,
        newFavorites,
        setNewFavorites,
        resetUser,
        addFavorite,
        removeFavorite,
        logout,
        loginWithGoogle,
        checkSession
    }

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
