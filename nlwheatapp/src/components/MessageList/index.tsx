import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { api } from '../../services/api';
import { io } from 'socket.io-client';

import { MESSAGES_EXAMPLE } from '../../utils/messages';

import { Message, MessageProp } from '../Message';
import { styles } from './styles';

let messagesQueue: MessageProp[] = MESSAGES_EXAMPLE;

const socket = io(String(api.defaults.baseURL));
socket.on('new_message', (newMessage) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProp[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<MessageProp[]>('/messages/last3');
      setCurrentMessages(messagesResponse.data);
    }
    fetchMessages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages((prev) =>
          [messagesQueue[0], prev[0], prev[1]].filter(Boolean),
        );
        messagesQueue.shift();
      }
    }, 3000);

    return function cleanUp() {
      clearInterval(timer);
    };
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps='never'>
      {currentMessages.map((message) => (
        <Message key={message.id} data={message} />
      ))}
    </ScrollView>
  );
}
