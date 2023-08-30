import { PostsContext } from "@/Contexts/postContext"
import { useContext } from "react";

export const Footer = () => {

    const postCtx = useContext(PostsContext);

    return (
        <footer className="text-center text-1xl my-4">
            Quantidade de posts: {postCtx?.posts.length}
        </footer>
    )
}