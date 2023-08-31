import { Post } from "@/types/Post";

type add = {
    type: 'add',
    payload: {
        title: string,
        description: string
    }
}

type remove = {
    type: 'delete',
    payload: {
        id: number
    }
}

export type postActions = add | remove;

export const postReducer = (posts: Post[], action: postActions): Post[] => {
    switch (action.type) {
        case 'add':  
            return [...posts, {id: posts.length, title: action.payload.title, description: action.payload.description}];
        case 'delete':
            return posts.filter(item => item.id !== action.payload.id);
        default:
            return posts
    }
}