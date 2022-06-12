const subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
};

let ws: WebSocket | null = null;

const closeHendler = () => {
    console.log('close WS');
    subscribers['status-changed'].forEach((s) => s('pending'));
    setTimeout(() => {
        connectWS();
    }, 3000);
};

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers['messages-received'].forEach((s) => s(newMessages));
};

const openHandler = () => {
    subscribers['status-changed'].forEach((s) => s('ready'));
};

const errorHandler = () => {
    subscribers['status-changed'].forEach((s) => s('error'));
    console.error('Restart page');
};

const cleanUp = () => {
    ws?.removeEventListener('close', closeHendler);
    ws?.removeEventListener('message', messageHandler);
    ws?.removeEventListener('open', openHandler);
    ws?.removeEventListener('error', errorHandler);
};

export function connectWS() {
    cleanUp();
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    subscribers['status-changed'].forEach((s) => s('pending'));
    ws.addEventListener('close', closeHendler);
    ws.addEventListener('message', messageHandler);
    ws.addEventListener('open', openHandler);
    ws.addEventListener('error', errorHandler);
}

export const chatAPI = {
    start() {
        connectWS();
    },
    stop() {
        subscribers['messages-received'] = [];
        subscribers['status-changed'] = [];
        cleanUp();
        ws?.close();
    },
    subscribe(
        eventName: EventsNamesType,
        callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
    ) {
        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
        };
    },
    unsubscribe(
        eventName: EventsNamesType,
        callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
    ) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message);
    }
};

type EventsNamesType = 'messages-received' | 'status-changed';
export type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void;
export type StatusChangedSubscriberType = (status: StatusType) => void;
export type StatusType = 'pending' | 'ready' | 'error';

export type ChatMessageAPIType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};
