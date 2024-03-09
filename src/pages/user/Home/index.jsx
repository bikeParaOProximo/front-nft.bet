//Components
import Banner from '../../../components/Banner';
import Container from '../../../components/layout/Container';
import Jogos from '../../../components/Jogos';


export default function Home(){

  return(
    <Container estilizacao={"home"}>
      <Banner/>      

      <Jogos
        tituloJogos={"Da casa"}
        tipo={"casa"}
      />

      <Jogos
        tituloJogos={"Slots"}
        tipo={"slots"}
      />
    </Container>
  );
}