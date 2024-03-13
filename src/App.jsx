//Components
import Header from "./components/layout/Header";
import MenuBar from "./components/layout/MenuBar";
import Footer from "./components/layout/Footer";
import MessageBox from './components/MessageBox';
import CardLoader from './components/CardLoader';

//Hooks
import useRotas from "./hooks/useRotas";

//pages
import { Outlet } from "react-router-dom";
import PrivatePage from './pages/privadas/PrivatePage';
import AdminPage from "./pages/privadas/AdminPage";
import GamePage from "./pages/privadas/GamePage";


function App() {

  const {verificarSeRotaEPublica, verificarSeRotaEPrivada, verificarSeRotaEDeGames, verificarSeRotaEAdministrativa} = useRotas();

  return (
    <>
      {
        verificarSeRotaEAdministrativa() ? (
          <AdminPage>
            <Outlet/>
          </AdminPage>
        ) : (
          <>
            <MenuBar/>
            <Header/> 
            {
              verificarSeRotaEPublica() ? (
                <Outlet/>
              ) : verificarSeRotaEPrivada() ? (
                <PrivatePage>
                  <Outlet/>
                </PrivatePage>
              ) : verificarSeRotaEDeGames() && (
                <GamePage>
                  <Outlet/>
                </GamePage>
              )
            }
            <Footer/>
          </>
        )
      }
    
      <MessageBox/>
      <CardLoader/>
    </>
  )
}

export default App;
