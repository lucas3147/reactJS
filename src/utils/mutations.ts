import { useMutation } from "@tanstack/react-query"
import { addPost } from "./api"
import queryClient from "./queryClient";

export const useAddPost = () => {
    const mutation = useMutation({
        mutationFn: addPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts']
            });
        }
    });

    return mutation;
}