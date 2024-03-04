import { Post } from "@/src/types/Post";
import { User } from "@/src/types/User";
import axios from "axios";

const req = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

export const getPosts = async (): Promise<Post[]> => {
    const result = await req.get(`/posts`);
    return result.data;
}

export const getPost = async (id: number): Promise<Post> => {
    const result = await req.get(`/posts/${id}`);
    return result.data;
}

export const getUsers = async (): Promise<User[]> => {
    const result = await req.get('/users');
    return result.data;
}

export const addPost = async (data: Omit<Post, "id">): Promise<Post> => {
    const result = await req.post('/posts', data);
    return result.data;
}