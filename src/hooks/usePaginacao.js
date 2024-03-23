import { useContext } from "react";
import { PaginacaoContext } from "../contexts/PaginacaoContext";

const UsePaginacao = () => {

  const {indicePaginacao, setIndicePaginacao, posicaoIndice, setPosicaoIndice} = useContext(PaginacaoContext);
  
  return{indicePaginacao, setIndicePaginacao, posicaoIndice, setPosicaoIndice};
}

export default UsePaginacao;