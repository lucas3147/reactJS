import { useQuery } from "@tanstack/react-query";
import { getPost, getPosts } from "../utils/api";

export const usePosts = (enabled?: boolean) => useQuery({ 
    networkMode: 'online',
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 2 * 1000,
    enabled
});

export const usePost = (id: number) => useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id)
});