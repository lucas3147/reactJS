import { useMutation } from "@tanstack/react-query"
import { addPost } from "./api"

export const useAddPost = () => {
    const mutation = useMutation({
        mutationFn: addPost
    });

    return mutation;
}