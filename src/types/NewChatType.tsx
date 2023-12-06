import { ChatItem } from '@/types/ChatType';
import { UserType } from './UserType';

export type Props = {
    chatList: ChatItem[],
    users: UserType[],
    show: boolean,
    setShow: (showNewChat: boolean) => void
}