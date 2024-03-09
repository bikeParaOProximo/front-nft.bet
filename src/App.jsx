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


function App() {

  const {verificarSeRotaEPublica, verificarSeRotaEAdministrativa} = useRotas();

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
            {verificarSeRotaEPublica() ? <Outlet/> 
              : (
                <PrivatePage>
                  <Outlet/>
                </PrivatePage>
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

export default App
