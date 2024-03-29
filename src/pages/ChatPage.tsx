import { Input, Button, Skeleton } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Comment, Avatar } from 'antd';
import {
    ChatMessageType,
    sendMessage,
    startMessagesListening,
    stopMessagesListening
} from '../redux/chat-reducer';
import { AppStateType } from '../redux/redux-store';
import { useIsAuth } from '../Hooks/useIsAuth';
import { Redirect } from 'react-router-dom';

const { TextArea } = Input;

const ChatPage: React.FC = () => {
    const isAuth = useIsAuth();

    if (!isAuth) {
        return <Redirect to={'/login'} />;
    }
    return <Chat />;
};

const Chat: React.FC = () => {
    const dispatch = useDispatch();
    const status = useSelector((state: AppStateType) => state.chat.status);
    const isAuth = useIsAuth();

    useEffect(() => {
        if (isAuth) dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        };
    }, [dispatch, isAuth]);

    return (
        <div>
            {status === 'error' && <div>Disconnect, restart page</div>}
            <div>
                <Messages />
                <AddMessageForm />
            </div>
        </div>
    );
};

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const messageAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true);

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget;
        if (element.scrollHeight - element.scrollTop !== element.clientHeight) {
            setIsAutoScroll(false);
        } else {
            setIsAutoScroll(true);
        }
    };

    useEffect(() => {
        if (isAutoScroll) {
            messageAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isAutoScroll, messages]);

    if (!messages.length) {
        return (
            <>
                {Array.from(Array(3)).map((a, i) => (
                    <Skeleton active avatar key={i} />
                ))}
            </>
        );
    }

    return (
        <div style={{ height: '400px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messages.map((m: ChatMessageType) => (
                <Message message={m} key={m.id} />
            ))}
            <div ref={messageAnchorRef}></div>
        </div>
    );
};

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
    return (
        <Comment
            author={message.userName}
            avatar={<Avatar src={message.photo} alt="photo" />}
            content={<p>{message.message}</p>}
        />
    );
});

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const status = useSelector((state: AppStateType) => state.chat.status);
    const dispatch = useDispatch();

    const sendMessageHendler = () => {
        if (message.length) {
            dispatch(sendMessage(message));
            setMessage('');
        }
    };

    return (
        <div>
            <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
            <Button disabled={status !== 'ready' || !message.length} onClick={sendMessageHendler}>
                Send
            </Button>
        </div>
    );
};

export default ChatPage;
