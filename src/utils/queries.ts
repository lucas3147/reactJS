import { useQuery } from "@tanstack/react-query";
import { getPost, getPosts } from "../utils/api";

export const usePosts = () => useQuery({ 
    networkMode: 'online',
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 60 * 1000
});

export const usePost = (id: number) => useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id)
});