import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useSessao from "./useSessao";
import { rotasPublicas } from "../constants/rotasPublicas";
import useFormularios from '../hooks/useFormularios';
import { rotasAdmin } from "../constants/rotasAdmin";
import useAdminSessao from "./useAdminSessao";

const useRotas = () => {

  const {sessao} = useSessao();
  const {role} = useAdminSessao();
  const location = useLocation();
  const {exibirFormularioLogin} = useFormularios();
  const navigate = useNavigate();

  const verificarSeRotaEPublica = () => {
    return rotasPublicas.includes(location.pathname);
  }  

  const verificarSeRotaEAdministrativa = () => {
    let pathSemParametros = "/"+location.pathname.split("/")[1]+"/"+location.pathname.split("/")[2];
    return rotasAdmin.includes(pathSemParametros);
  }  

  const bloquearRotaPublica = () => {
    useEffect(() => {
      if(sessao) {
        navigate("/");
      }
    }, [sessao])
  }

  const bloquearRotaLoginAdmin = () => {
    useEffect(() => {
      if(role) {
        navigate("/adm/menuAdmin");
      }
    }, [role])
  }

  const bloquearRotaPrivada = () => {
    useEffect(() => {
      if(!sessao) {
        navigate("/");
        exibirFormularioLogin();
      }
    }, [sessao])
  }

  const bloquearRotaAdmin = () => {
    useEffect(() => {
      if(role != "ROLE_ADMIN" && location.pathname != "/adm/login") navigate("/");
    }, [role])
  }


  return {
          verificarSeRotaEPublica, verificarSeRotaEAdministrativa,
          bloquearRotaPublica, bloquearRotaLoginAdmin, bloquearRotaPrivada, bloquearRotaAdmin
        };
}

export default useRotas;