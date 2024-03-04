import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPost, getPosts, getUsers } from "../utils/api";
import { postsInitialData } from "../data/postsInitialData";
import queryClient from "./queryClient";

export const usePosts = () => useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
    placeholderData: postsInitialData
});

export const usePost = (id: number) => useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id)
});

export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers()
});

export const useUsersPrefetch = async () => {
    const queryClient = useQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['users'],
        queryFn: getUsers
    });
}

export const invalidatePosts = () => {
    queryClient.invalidateQueries({
        queryKey: ['posts'],
        exact: true
    })
}