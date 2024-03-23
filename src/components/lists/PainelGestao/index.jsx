
import styles from './PainelGestao.module.css';
import Loader from '../../utils/Loader';
import BotaoLink from '../../utils/BotaoLink';
import { useLocation } from 'react-router-dom';
import useLoader from '../../../hooks/useLoader';


export default function PainelGestao({destino, placeholder, nomeEntidade, entidade, setFiltro, setData, setOrdenar, children}){

  const location = useLocation();
  const {visibilidadeLoader} = useLoader();

  return(
    <>
      <div className={styles.headerJogos}>
        {
          location.pathname != "/adm/bonus" ? (
            <input type="text" className={styles.inputFiltro}
              readOnly={(entidade.length) ? false : true}
              placeholder={'Pesquisar '.concat(placeholder)}
              onChange={(e) => setFiltro(e.target.value)}
            />
          ) : (
            <input type='date' className={styles.inputData}
              onChange={(e) => setData(e.target.value)}
            />
          )
        }

        {['/adm/bonus', '/adm/jogos', '/adm/imagens'].includes(location.pathname) && (
          <BotaoLink
            estilizacao={"criar"}
            destino={destino}
          >
            Criar
          </BotaoLink>
        )}

        {['/adm/depositos', '/adm/saques'].includes(location.pathname) && (
          <select className={styles.selectOrdem}
            onClick={(e) => setOrdenar(e.target.value)}
          >
            <option value="Solicitado">Solicitados</option>
            <option value="Concluído">Concluídos</option>
            <option value="Recusado">Recusados</option>
          </select>
        )}
      </div>

      {
        entidade.length ? (
          <div className={styles.painelGestao}>
            <div className={styles.margemPainelJogos}>
              {children}
            </div>
          </div>
        ) : visibilidadeLoader ? <Loader/>
          : <p className='avisoADM'>Sem {nomeEntidade} até o momento</p>
      }
    </>
  )
}