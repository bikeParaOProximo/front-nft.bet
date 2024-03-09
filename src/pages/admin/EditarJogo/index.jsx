//Components
import Container from "../../../components/layout/Container";
import HeaderAdmin from "../../../components/layout/HeaderAdmin";
import FormularioJogo from '../../../components/formularios/FormularioJogo';
import useJogos from "../../../hooks/useJogos";

export default function EditarJogo(){

  const {jogo, preencherJogo, editarJogo} = useJogos();

  return(
    <Container estilizacao={"admin"}>
      <HeaderAdmin
        destino={"/adm/jogos"}
      />

      <FormularioJogo
        jogo={jogo}
        preencherJogo={preencherJogo}
        executarAcao={editarJogo}
        txtBotao={"Editar"}
      />
    </Container>
  )
}