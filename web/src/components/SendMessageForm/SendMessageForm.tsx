import React, { useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';

import styles from './SendMessageForm.module.scss';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';

export function SendMessageForm() {
  const { user, logOut } = useAuth();

  const [message, setMessage] = useState('');

  async function handleSendMessage(event: React.FormEvent) {
    event.preventDefault();

    if (!message.trim()) return;

    await api.post('/messages', { message });

    setMessage('');
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={logOut} className={styles.signOutButton}>
        <VscSignOut size='32' />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size='16' />
          {user?.login}
        </span>
      </header>

      <form
        onSubmit={(e) => handleSendMessage(e)}
        className={styles.sendMessageForm}>
        <label htmlFor='message'>Mensagem</label>
        <textarea
          name='message'
          id='message'
          placeholder='Qual sua expectativa para o evento?'
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />
        <button type='submit'>Enviar mensagem</button>
      </form>
    </div>
  );
}
