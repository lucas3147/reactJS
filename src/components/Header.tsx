import { PostsContext } from "@/Contexts/postContext";
import { useContext, useState } from "react";

export const Header = () => {

    const [titleField, setTitleField] = useState("");
    const [descriptionField, setDescriptionField] = useState("");
    const PostContext = useContext(PostsContext);

    const handleAddPost = () => {

        if (titleField && descriptionField){
            PostContext?.dispatch({
                type: "add", 
                payload: {
                    title: titleField, 
                    description: descriptionField
            }});
            setTitleField('');
            setDescriptionField('');
        }
    }

    return (
        <header>
            <h1 className="text-center text-4xl my-4">Meus Posts</h1>
            <div  className="max-w-2xl mx-auto flex flex-col items-center p-3">
                <input
                    type="text"
                    className="bg-zinc-700 w-full rounded-md border border-white p-3 outline-none"
                    placeholder="Título do Post"
                    value={titleField}
                    onChange={e => setTitleField(e.currentTarget.value)}
                />
                <textarea 
                    placeholder="Descrição" 
                    className="w-full my-4 p-3 outline-none 
                    bg-zinc-700 rounded-md 
                                border border-white"
                    value={descriptionField}
                    onChange={e => setDescriptionField(e.currentTarget.value)}>
                    

                </textarea>
                <button 
                    onClick={handleAddPost}
                    className="rounded-md border border-white p-3 bg-zinc-700">
                    Adicionar
                </button>
            </div>
            
        </header>
    )
}