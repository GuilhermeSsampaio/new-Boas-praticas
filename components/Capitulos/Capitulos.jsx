import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "../../public/BASF-Logo.png";
import { TextCapitulos } from "./TextCapitulos";
import BreadcrumbsItem from "./BreadCrumbsItem.jsx";
import useFetchCollections from "@/hooks/useFetchCollections";
import { SidebarCapitulos } from "./SidebarCapitulos";
import { FooterCapitulos } from "./FooterCapitulos";
import { NavbarCapitulos } from "./NavbarCapitulos";
import Intro from "./Intro";

export const Capitulos = () => {
  const LogoIF = require("../../public/ifms-dr-marca-2015.png");
  const LogoEmbrapa = require("../../public/logo-embrapa-400.png");
  const router = useRouter();
  const { asPath } = router;
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [data, setData] = useState([]);
  const [activeTitle, setActiveTitle] = useState(null);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [isChapterLoading, setIsChapterLoading] = useState(false);
  const [collectionsData, setCollectionsData] = useState({});
  const { collections, activeCollection, setActiveCollection } =
    useFetchCollections();

  const handleToggleBackDrop = () => {
    setIsOffcanvasOpen((prevState) => !prevState);
  };

  const fetchCapitulosRef = useRef(null);

  useEffect(() => {
    return () => {
      if (fetchCapitulosRef.current) {
        fetchCapitulosRef.current.abort();
      }
    };
  }, []);

  const extractCollectionAndChapterFromAnchor = (path) => {
    const collectionMatch = path.match(/#collection_(\d+)/);
    const chapterMatch = path.match(/#capitulo_(\d+)/);
    const collectionId = collectionMatch ? parseInt(collectionMatch[1]) : null;
    const chapterId = chapterMatch ? parseInt(chapterMatch[1]) : null;
    return { collectionId, chapterId };
  };

  useEffect(() => {
    const { collectionId, chapterId } =
      extractCollectionAndChapterFromAnchor(asPath);

    if (collectionId && chapterId) {
      handleSelectCollection(collectionId, chapterId);
      setActiveCollection(collectionId);
    } else if (!collectionId && !chapterId && currentCollection !== "intro") {
      setCurrentCollection("intro");
      setActiveTitle(null);
      setActiveCollection(null);
    }
  }, [asPath]);

  const handleSelectCollection = (
    collectionId,
    chapterId = null,
    isFromSearch = false,
  ) => {
    const collectionsMap = {
      1: "pesticida-abelhas",
      2: "boa-pratica-agroes",
      3: "boa-pratica-apicolas",
      4: "boa-pratica-comunicacaos",
    };

    if (chapterId !== null || isFromSearch) {
      setCurrentCollection(collectionsMap[collectionId]);
      setActiveTitle(chapterId);
      setActiveCollection(collectionId);
    }
  };

  useEffect(() => {
    const loadCapitulos = async () => {
      if (!currentCollection || activeTitle === null) return;

      if (collectionsData[currentCollection]) {
        setData(collectionsData[currentCollection]);
        return;
      }

      setIsChapterLoading(true);
      fetchCapitulosRef.current = new AbortController();

      const url = `https://api-cartilha.squareweb.app/api/${currentCollection}?populate=*`;

      try {
        const response = await fetch(url, {
          signal: fetchCapitulosRef.current.signal,
        });
        if (response.ok) {
          const json = await response.json();
          const data = json.data;
          setData(data);

          setCollectionsData((prevData) => ({
            ...prevData,
            [currentCollection]: data,
          }));
        } else {
          throw new Error(
            "Falha na requisição. Código de status: " + response.status,
          );
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      } finally {
        setIsChapterLoading(false);
      }
    };

    loadCapitulos();
  }, [collectionsData, currentCollection, activeTitle]);

  useEffect(() => {
    if (data.length > 0 && activeTitle === null) {
      setActiveTitle(data[0].id);
    }
  }, [data, activeTitle]);

  useEffect(() => {
    if (activeTitle !== null) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [activeTitle]);

  useEffect(() => {
    if (!currentCollection && collections.length > 0) {
      setCurrentCollection("intro");
      setActiveTitle(null);
      setActiveCollection(null);
    }
  }, [collections, currentCollection]);

  const activeChapter = data.find((item) => item.id === activeTitle);
  const displayedTitle = activeChapter
    ? activeChapter.attributes.titulo
    : "Título do Capítulo";

  return (
    <>
      <Head>
        <meta name="referrer" content="no-referrer" />
        <title>Boas Práticas</title>
      </Head>

      <div className="container-wrapper">
        <SidebarCapitulos
          isOffcanvasOpen={isOffcanvasOpen}
          setIsOffcanvasOpen={setIsOffcanvasOpen}
          onSelectCollection={handleSelectCollection}
          activeCollection={activeCollection}
          collections={collections}
          activeTitle={activeTitle}
          setActiveTitle={setActiveTitle}
        />

        <NavbarCapitulos
          isOffcanvasOpen={isOffcanvasOpen}
          setIsOffcanvasOpen={setIsOffcanvasOpen}
          handleToggleBackDrop={handleToggleBackDrop}
          collections={collections}
          handleSelectCollection={handleSelectCollection}
          Logo={Logo}
          LogoIF={LogoIF}
          LogoEmbrapa={LogoEmbrapa}
          activeTitle={activeTitle}
          setActiveTitle={setActiveTitle}
        />

        <main className="docMainContainer_gTbr">
          <div className="container-fluid padding-bottom--lg">
            <div className="col">
              <nav
                className="home-section"
                aria-label="Breadcrumbs"
                style={{ marginTop: 120 }}
              >
                <ul className="breadcrumbs">
                  <li className="breadcrumbs__item">
                    <Link href="/home" className="breadcrumbs__link">
                      <i
                        className="fas fa-home"
                        style={{ fontSize: "13px" }}
                      ></i>
                    </Link>
                    <i
                      className="fas fa-chevron-right"
                      style={{ fontSize: "10px" }}
                    ></i>
                  </li>
                  <li className="breadcrumbs__item">
                    <span className="breadcrumbs__link">Sumário</span>
                    <meta itemProp="position" content="1" />
                    <i
                      className="fas fa-chevron-right"
                      style={{ fontSize: "10px" }}
                    ></i>
                  </li>
                  <BreadcrumbsItem displayedTitle={displayedTitle} />
                </ul>
              </nav>
              <section
                className="home-section right-sidebar"
                style={{ marginTop: "30px" }}
              >
                <div id="contents" className="bd-content ps-lg-2">
                  {isChapterLoading ? (
                    <p>Carregando...</p>
                  ) : currentCollection === "intro" ? (
                    <Intro />
                  ) : (
                    <TextCapitulos
                      lista={data}
                      activeTitle={activeTitle}
                      setActiveTitle={setActiveTitle}
                      currentCollection={activeCollection}
                    />
                  )}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
      {/* <FooterCapitulos /> */}
    </>
  );
};

export default Capitulos;
