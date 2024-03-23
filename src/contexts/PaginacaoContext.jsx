import { createContext, useState } from "react";

export const PaginacaoContext = createContext();

export const PaginacaoProvider = ({children}) => {

  const [indicePaginacao, setIndicePaginacao] = useState(0);
  const [posicaoIndice, setPosicaoIndice] = useState({
    primeiro: null,
    ultimo: null
  });

  return(
    <PaginacaoContext.Provider value={{
      indicePaginacao, setIndicePaginacao, 
      posicaoIndice, setPosicaoIndice
    }}>
      {children}
    </PaginacaoContext.Provider>
  )
}