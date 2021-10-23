import { VscGithubInverted } from 'react-icons/vsc';
import { useAuth } from '../../hooks/useAuth';

import styles from './LoginBox.module.scss';

export function LoginBox() {
  const { signInUrl } = useAuth();

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size='24' />
        Entrar com GitHub
      </a>
    </div>
  );
}
