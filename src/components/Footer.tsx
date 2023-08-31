import { usePost } from "@/Contexts/postContext"

export const Footer = () => {

    const postCtx = usePost();

    return (
        <footer className="text-center text-1xl my-4">
            Quantidade de posts: {postCtx?.posts.length}
        </footer>
    )
}