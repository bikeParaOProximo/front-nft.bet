import UsePaginacao from '../../../hooks/usePaginacao';
import styles from './BotaoPaginacao.module.css';

export default function BotaoPaginacao(){

  const {indicePaginacao, setIndicePaginacao, posicaoIndice} = UsePaginacao();

  return(
    <>
      {
        (posicaoIndice.primeiro !== null && posicaoIndice.ultimo !== null) && (
          <div className={styles.containerPaginacao}>
            {
              !posicaoIndice.primeiro && (
                <button 
                  className={styles.botaoPaginacao}
                  onClick={() => setIndicePaginacao(indicePaginacao - 1)}
                >
                  {"<"}
                </button>
              )
            }
      
            <p className={styles.indicePaginacao}>
              {indicePaginacao+1}
            </p>
      
            {
              !posicaoIndice.ultimo && (
                <button
                className={styles.botaoPaginacao}
                onClick={() => setIndicePaginacao(indicePaginacao + 1)}
              >
                {">"}
              </button>
              )
            }
          </div>
        )
      }
    </>
  )
}