import { useEffect, useState } from "react";
import api from "../services/api";
import useSessao from "./useSessao";
import useMessageBox from "./useMessageBox";
import useValidacoes from "./useValidacoes";
import { useLocation, useParams } from "react-router-dom";
import useLoader from "./useLoader";
import useFormularios from "./useFormularios";
import useErros from './useErros';
import useSaldo from "./useSaldo";

const useSaque = () => {

  //Global
  const {identificador} = useParams();
  const location = useLocation();
  const {alterarVisibilidadeLoader, exibirCardLoader, esconderCardLoader} = useLoader();
  const {esconderFormularioRejeicao} = useFormularios();
  const {tratarErro} = useErros();
  const {atualizarSaldo} = useSaldo();

  //Saques (*)
  const [saques, setSaques] = useState([]);

  if(location.pathname == "/adm/saques"){
    useEffect(() => {
      api.get("/saques")
      .then((resp) => {
        setSaques(resp.data);
        alterarVisibilidadeLoader(resp.data);
      })
      .catch((error) => {
        tratarErro('', error);
      })
    }, []);
  }

  //SAQUE (1)
  const [saque, setSaque] = useState({
    chaveDestinatario: "escolha"
  });
  const {validarFormularioSaque} = useValidacoes();
  const {codigo} = useSessao();
  const {exibirMessageBox} = useMessageBox();

  const escolherValor = (e) => setSaque({...saque, ['valorSaque'] : e.target.id});

  const preencherSaque = (e) => setSaque({...saque, [e.target.name] : e.target.value});

  const solicitarSaque = () => {
    if(validarFormularioSaque(saque)){
      exibirCardLoader();
      api.post("/saques",{
        codigoUsuario: codigo,
        ...saque
      })
      .then((resp) => {
        setSaque({...saque, valorSaque: '', chaveDestinatario: "escolha"});
        exibirMessageBox(
          "",
          "Solicitação de saque realizada com sucesso!",
          true
        );
        esconderCardLoader();
        atualizarSaldo(resp.data.saldo)
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }
  }

  const autorizarSaque = () => {
    exibirCardLoader();
    api.post("/saques/autorizar", {...detalhesSaque})
    .then((resp) => {
      setDetalhesSaque(resp.data);
      exibirMessageBox(
        "",
        "Saque autorizado com sucesso!",
        true
      );
      esconderCardLoader();
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const recusarSaque = (e) => {
    e.preventDefault();
    exibirCardLoader();
    api.post("/saques/recusar", {
      ...detalhesSaque,
      motivoRejeicao: detalhesSaque.motivoRejeicao
    })
    .then((resp) => {
      esconderFormularioRejeicao();
      setDetalhesSaque(resp.data);
      exibirMessageBox(
        "",
        "Saque recusado com sucesso!",
        true
      );
      esconderCardLoader();
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  //Detalhes Saque (1)
  const [detalhesSaque, setDetalhesSaque] = useState({});

  const buscarSaque = (codigoSaque) => {
    exibirCardLoader();
    api.get("/saques/".concat(codigoSaque))
    .then((resp) => {
      setDetalhesSaque(resp.data);
      alterarVisibilidadeLoader(resp.data);
      esconderCardLoader();
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const removerDetalhesSaque = () => setDetalhesSaque({});

  if(identificador && location.pathname == "/adm/saque/".concat(identificador)){
    useEffect(() => {
      buscarSaque(identificador);
    }, [identificador])
  }

  const preencherDetalhesSaque = (e) => setDetalhesSaque({...detalhesSaque, [e.target.name] : e.target.value});

  return {saques,
          saque, escolherValor, preencherSaque, solicitarSaque, buscarSaque, autorizarSaque, recusarSaque,
          detalhesSaque, removerDetalhesSaque, preencherDetalhesSaque};
}

export default useSaque;