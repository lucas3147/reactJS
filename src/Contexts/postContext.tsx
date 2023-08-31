import { postActions, postReducer } from "@/Reducer/PostReducer"
import { Post } from "@/types/Post"
import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from "react"

type PostsContextType = {
    posts: Post[],
    dispatch: Dispatch<postActions>
}

const STORAGE_KEY = 'postContextContent';

const PostsContext = createContext<PostsContextType | null>(null)

export const PostProvider = ({children} : {children: ReactNode}) => {

    const postStorage = localStorage.getItem(STORAGE_KEY);

    const [posts, dispatch] = useReducer(postReducer, JSON.parse(postStorage || "[]"));

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }, [posts]);

    return (
        <PostsContext.Provider value={{posts, dispatch}}>
            {children}
        </PostsContext.Provider>
    )
}

export const usePost = () => useContext(PostsContext);