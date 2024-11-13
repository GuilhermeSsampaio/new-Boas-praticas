import { useRouter } from "next/router";
import { Navbar } from "./Navbar";
import { NavbarCapitulos } from "../Capitulos/NavbarCapitulos";
import { Footer } from "./Footer";
import { FooterCapitulos } from "../Capitulos/FooterCapitulos";
import { useEffect, useState } from "react";
import useFetchCapitulos from "../../hooks/useFetchCapitulos";
import { SidebarCapitulos } from "../Capitulos/SidebarCapitulos";
import useFetchCollections from "@/hooks/useFetchCollections";
// Componente que renderiza o layout da aplicação
export const Layout = ({ children }) => {
  const router = useRouter();
  const isEdicaoCompleta = router.pathname === "/edicao-completa";
  const { asPath } = router;
  const [results, setResults] = useState([]);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [currentCollection, setCurrentCollection] = useState(null);
  const { collections, activeCollection, setActiveCollection } =
    useFetchCollections();
  const [activeTitle, setActiveTitle] = useState(null);
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

  const handleSelectCollection = (collectionId) => {
    const collectionsMap = {
      1: "pesticida-abelhas",
      2: "boa-pratica-agroes",
      3: "boa-pratica-apicolas",
      4: "boa-pratica-comunicacaos",
    };
    setCurrentCollection(collectionsMap[collectionId]);
    setActiveTitle(null);
    setActiveCollection(collectionId);
  };

  return (
    <>
      {isEdicaoCompleta ? (
        <>
          <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
            <div className="flex-grow-1">{children}</div>
            <FooterCapitulos />
          </div>
        </>
      ) : (
        <>
          <Navbar
            collections={collections}
            handleSelectCollection={handleSelectCollection}
            isOffcanvasOpen={isOffcanvasOpen}
            setIsOffcanvasOpen={setIsOffcanvasOpen}
          />
          <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
            <div className="flex-grow-1">{children}</div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};
