import { useRouter } from "next/router";
import { Navbar } from "./Navbar";
import { NavbarCapitulos } from "../Capitulos/NavbarCapitulos";
import { Footer } from "./Footer";
import { FooterCapitulos } from "../Capitulos/FooterCapitulos";
import { useEffect, useState } from "react";
import useFetchCapitulos from "../../hooks/useFetchCapitulos";
import { SidebarCapitulos } from "../Capitulos/SidebarCapitulos";

// Componente que renderiza o layout da aplicação
export const Layout = ({ children }) => {
  const router = useRouter();
  const isEdicaoCompleta = router.pathname === "/edicao-completa";
  const { asPath } = router;
  const [results, setResults] = useState([]);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const { data, activeTitle, setActiveTitle } = useFetchCapitulos(asPath);

  //Função para quando o usuário quiser fechar o sidebar
  const closeSidebar = () => {
    const sidebarMenu = document.getElementById("sidebarMenu");
    if (sidebarMenu) {
      sidebarMenu.classList.remove("show");
    }
    setIsOffcanvasOpen(false);
  };
  //faz aparecer o backdrop
  const handleToggleBackDrop = () => {
    //setIsOffcanvasOpen((prevState) => !prevState);
  };

  const handleCloseBackdrop = () => {
    setIsOffcanvasOpen(false);
    closeSidebar();
  };

  return (
    <>
      {isEdicaoCompleta ? (
        <>
          {/* <NavbarCapitulos
            results={results}
            setResults={setResults}
            handleToggleBackDrop={handleToggleBackDrop}
            handleCloseBackdrop={handleCloseBackdrop}
            isOffcanvasOpen={isOffcanvasOpen}
            setIsOffcanvasOpen={setIsOffcanvasOpen}
            closeSidebar={closeSidebar}
          /> */}
          {/* <SidebarCapitulos
            data={data}
            activeTitle={activeTitle}
            setActiveTitle={setActiveTitle}
            closeSidebar={closeSidebar}
            isOffcanvasOpen={isOffcanvasOpen}
            setIsOffcanvasOpen={setIsOffcanvasOpen}
          /> */}
          <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
            <div className="flex-grow-1">
              {children}
            </div>
            <FooterCapitulos />
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
            <div className="flex-grow-1">
              {children}
            </div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};
