import styles from './Header.module.css';

//Assets
import iconMenu from '../../../assets/icons/iconMenu.png';
import logo from '../../../assets/imagens/logo.png';

//Components
import Saldo from '../../../components/Saldo';

//Hooks
import useSessao from '../../../hooks/useSessao';
import { Link } from 'react-router-dom';


export default function Header(){

  const {sessao} = useSessao();

  return(
    <header className={styles.header}>
      <div className={styles.margemHeader}>
        <Link to={"/"} className={styles.linkLogo}>
         <img src={logo} className={styles.logo} />
        </Link>

        <div className={styles.sessao}>
          {sessao ? <Saldo/>
          : (
              <>
                <Link 
                  className={styles.btnSessao}
                  to={"/login"}
                >
                  Login
                </Link>

                <Link 
                  className={styles.btnSessao}
                  to={"/cadastro"}
                >
                  cadastro
                </Link>
            </>
          )}
        </div>

        <label htmlFor="check">
          <img src={iconMenu} className={styles.iconMenu} />
        </label>
      </div>
    </header>
  )
}

//<img src={logoPatosBet} className={styles.logo} alt='logo' />