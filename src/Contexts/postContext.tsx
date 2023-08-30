import { postActions, postReducer } from "@/Reducer/PostReducer"
import { Post } from "@/types/Post"
import { createContext, Dispatch, ReactNode, useReducer } from "react"

type PostsContextType = {
    posts: Post[],
    dispatch: Dispatch<postActions>
}

export const PostsContext = createContext<PostsContextType | null>(null)

export const PostProvider = ({children} : {children: ReactNode}) => {

    const [posts, dispatch] = useReducer(postReducer, []);

    return (
        <PostsContext.Provider value={{posts, dispatch}}>
            {children}
        </PostsContext.Provider>
    )
}