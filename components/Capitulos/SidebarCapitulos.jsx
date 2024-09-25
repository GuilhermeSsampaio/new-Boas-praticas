import React, { useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export const SidebarCapitulos = ({
  isOffcanvasOpen,
  setIsOffcanvasOpen,
  onSelectCollection,
  activeCollection,
  collections,
}) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeChapter, setActiveChapter] = useState(null);
  const [showSummary, setShowSummary] = useState(true);
  var LogoIFEmbrapa = require("../../public/logo-if-embrapa.png");

  const handleToggle = useCallback(
    (collectionId) => {
      onSelectCollection(collectionId);
      setActiveChapter(null);
    },
    [onSelectCollection],
  );

  const handleChapterClick = useCallback(
    (collectionId, chapterId) => {
      onSelectCollection(collectionId);
      setActiveChapter(chapterId);
      router.push(
        `#collection_${collectionId}#capitulo_${chapterId}`,
        undefined,
        { shallow: true },
      );
      setIsOffcanvasOpen(false);
    },
    [onSelectCollection, router, setIsOffcanvasOpen],
  );

  const sortedCollections = useMemo(() => {
    return collections.map((collection) => ({
      ...collection,
      data: {
        ...collection.data,
        data: collection.data.data.sort((a, b) => a.id - b.id),
      },
    }));
  }, [collections]);

  return (
    <div>
      <nav
        id="sidebarMenu"
        className={`collapse d-lg-block sidebar bg-white thin-scrollbar ${
          isOffcanvasOpen ? "show" : ""
        }`}
        tabIndex="-1"
      >
        <div className="position-sticky">
          <div></div>
          <div
            id="summary"
            className="list-group list-group-flush mt-2 py-2 menu_SIkG"
            style={{ display: showSummary ? "block" : "none" }}
          >
            <div className="logo-container-fixed">
              <div className="logo-container d-flex align-items-center justify-content-between">
                <Link href="/home">
                  <Image
                    className="img-sidebar-top mx-3"
                    src={LogoIFEmbrapa}
                    alt="logo Embrapa com letras em azul com um símbolo verde, sendo que as letras em cima do símbolo são brancas"
                    width="45%"
                    height={46}
                    priority
                  />
                </Link>
                <button
                  id="btn-close-sidebar"
                  type="button"
                  className="btn-close btn-close-dark btn-close-cap"
                  aria-label="Close"
                  onClick={() => {
                    setIsOffcanvasOpen(false);
                    setShowSummary(true);
                  }}
                ></button>
              </div>
            </div>
            <hr className="featurette-divider line-menu"></hr>
            <button
              type="button"
              className="clean-btn navbar-sidebar__back"
              id="back-button"
              onClick={() => setShowSummary(false)}
            >
              ← Voltar para o menu principal
            </button>

            <div>
              <a
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center dropdown-background ${
                  isCollapsed ? "collapsed" : ""
                }`}
                aria-current="true"
                onClick={handleToggle}
              >
                <span className="w-100 text-primary">Sumário</span>{" "}
                <i
                  className={`fas fa-chevron-${
                    isCollapsed ? "right" : "down"
                  } icon-deg`}
                ></i>
              </a>
              {sortedCollections.map((collection) => (
                <div key={collection.id}>
                  <p
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center dropdown-background ${
                      activeCollection === collection.id ? "" : "collapsed"
                    }`}
                    onClick={() => handleToggle(collection.id)}
                    style={{ cursor: "pointer", marginBottom: "10px" }}
                  >
                    <span
                      className="w-100 text-primary"
                      style={{ fontWeight: "500" }}
                    >
                      {collection.title}
                    </span>{" "}
                    <i
                      className={`fas fa-chevron-${
                        activeCollection === collection.id ? "down" : "right"
                      } ${
                        activeCollection === collection.id
                          ? "icon-deg-active"
                          : "icon-deg-right"
                      }`}
                    ></i>
                  </p>
                  {activeCollection === collection.id && (
                    <ul className="list-group list-group-flush mx-1">
                      {collection.data.data.map((item) => (
                        <li
                          key={item.id}
                          className={`list-group-item py-2 ${
                            item.attributes.subnivel &&
                            item.attributes.subnivel.length > 0
                              ? "chapter-with-subchapters"
                              : ""
                          }`}
                          style={{
                            cursor: "pointer",
                            marginBottom: "8px",
                            fontSize: "15px",
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <a
                              href={`#collection_${collection.id}#capitulo_${item.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleChapterClick(collection.id, item.id);
                              }}
                              className="d-flex align-items-center"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              {item.attributes.titulo}
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div
            id="main-navbar-options-menu"
            style={{ marginTop: 16, display: showSummary ? "none" : "block" }}
          >
            <div className="logo-container d-flex align-items-center justify-content-between">
              <Link href="/home">
                <Image
                  className="img-sidebar-top mx-3"
                  src={LogoIFEmbrapa}
                  alt="logo Embrapa com letras em azul com um símbolo verde, sendo que as letras em cima do símbolo são brancas"
                  width="45%"
                  height={46}
                  priority
                />
              </Link>
              <button
                id="btn-close-sidebar"
                type="button"
                className="btn-close btn-close-dark btn-close-cap"
                aria-label="Close"
                onClick={() => {
                  setIsOffcanvasOpen(false);
                  setShowSummary(true);
                }}
              ></button>
            </div>
            <hr className="featurette-divider line-menu"></hr>
            <button
              type="button"
              className="clean-btn navbar-sidebar__back"
              id="back-button"
              onClick={() => setShowSummary(true)}
            >
              ← Voltar para o Sumário
            </button>
            <ul className="navbar-nav ms-auto d-flex itens-menu-cap">
              <li className="nav-item mx-3">
                <Link
                  className="nav-link back-item-link py-2"
                  href="/edicao-completa"
                  aria-current="page"
                  onClick={() => setIsOffcanvasOpen(false)}
                >
                  <span className="link-text">Edição Completa</span>
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  className="nav-link back-item-link py-2"
                  href="/autores"
                  aria-current="page"
                  onClick={() => setIsOffcanvasOpen(false)}
                >
                  <span className="link-text">Autores</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {isOffcanvasOpen && (
        <div
          className="offcanvas-backdrop show"
          onClick={() => setIsOffcanvasOpen(false)}
        ></div>
      )}
    </div>
  );
};
