import { usePost } from "@/Contexts/postContext"

export const Posts = () => {

    const PostContext = usePost();

    const handleDeletePost = (id: number) => {
        PostContext?.dispatch({
            type: 'delete',
            payload: {
                id
            }
        })
    }

    return (
        <div className="p-3 max-w-2xl mx-auto">
            {PostContext?.posts.map(p => (
                <div key={p.id} className="flex flex-col justify-center items-center py-3 my-2 border rounded-md bg-zinc-700">
                    <h1 className="text-center text-2xl">{p.title}</h1> 
                    <p className="text-center my-2">{p.description}</p>
                    <button 
                        onClick={() => handleDeletePost(p.id)}
                        className="rounded-md border border-white p-2 bg-zinc-900">
                        Remover
                </button>
                </div>
            ))}
        </div>
    )
}