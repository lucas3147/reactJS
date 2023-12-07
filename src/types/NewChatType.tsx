import { ChatItem } from '@/types/ChatType';
import { UserType } from './UserType';

export type Props = {
    chatList: ChatItem[],
    user: UserType,
    show: boolean,
    setShow: (showNewChat: boolean) => void
}