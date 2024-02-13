import { useQuery } from "@tanstack/react-query";
import { getPost, getPosts } from "../utils/api";

export const usePosts = (limit: number, start: number) => useQuery({
    queryKey: ['posts', {limit, start}],
    queryFn: () => getPosts(limit, start)
});

export const usePost = (id: number) => useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id)
});