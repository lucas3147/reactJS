import { Post } from "@/types/Post";

type add = {
    type: 'add',
    payload: {
        title: string,
        description: string
    }
}

export type postActions = add;

export const postReducer = (posts: Post[], action: postActions): Post[] => {
    switch (action.type) {
        case 'add':  
            return [...posts, {id: posts.length, title: action.payload.title, description: action.payload.description}];
        default:
            return posts
    }
}