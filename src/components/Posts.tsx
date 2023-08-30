import { PostsContext } from "@/Contexts/postContext"
import { useContext } from "react"

export const Posts = () => {

    const PostContext = useContext(PostsContext);

    console.log(PostContext?.posts);

    return (
        <ul>
            {PostContext?.posts.map(p => 
                <li key={p.id}>
                    <h1 className="text-center text-2xl p-3">{p.title}</h1> 
                    <p className="text-center">{p.description}</p>
                    <hr />
                </li>
            )}
        </ul>
    )
}