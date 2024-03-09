import styles from './FormularioLogin.module.css';

import useLogin from '../../../hooks/useUsuario';
import { Link } from 'react-router-dom';
import InputSenha from '../../InputSenha';


export default function FormularioLogin(){

  const {usuario, preencherUsuario, enviarFormularioLogin} = useLogin();

  return(
    <form
      onSubmit={enviarFormularioLogin}
    >
      <input 
        type="text"
        placeholder='Email'
        name='email'
        onChange={(e) => preencherUsuario(e)}
        value={usuario.email || ""}
      />

      <InputSenha
        dica={"Senha"}
        nomeEntidade={"senha"}
        entidade={usuario.senha}
        preencherEntidade={preencherUsuario}
      />

      <button 
        className={[(!usuario.email || !usuario.senha) && "desativado"]}
        disabled={(usuario.email && usuario.senha) ? false : true}
      >
        Login
      </button>

      <Link className={styles.textoRodapeFormularioLogin} to={"/recuperarSenha"}>Recuperar senha</Link>
      <Link className={styles.textoRodapeFormularioLogin} to={"/cadastro"}>Não possui conta?</Link>
    </form>
  );
}