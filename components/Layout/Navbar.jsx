import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { SearchResultsList } from "../../components/SearchBar/SearchResultsList";
import { useState } from "react";

export const Navbar = () => {
  //Importação das Imagens
  var LogoIF = require("../../public/ifms-dr-marca-2015.png");
  var LogoEmbrapa = require("../../public/logo-embrapa-400.png");
  var LogoIFEmbrapa = require("../../public/logo-if-embrapa.png");

  const [results, setResults] = useState([]);
  const handleCloseResults = () => {
    setResults([]); // Limpa os resultados
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      {/* Código Navbar Offcanvas */}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
        aria-label="Offcanvas navbar large"
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar2"
              aria-controls="offcanvasNavbar2"
            >
              <i className="fas fa-bars"></i>
            </button>
            {/* Logo Navbar */}
            <Link className="navbar-brand" href="/home">
              <Image
                src={Logo}
                width={350}
                height={54}
                alt="logo Embrapa com letras em azul com um simbolo verde, sendo que as letras em cima do simbolo são brancas"
              />
            </Link>
          </div>
          {/* Input Search para tela menor que 992px */}
          <div className="search-container first-form-search p-1">
            <div className="search-bar-container">
              <SearchBar setResults={setResults} />
              {results && results.length > 0 && (
                <SearchResultsList
                  results={results}
                  handleCloseResults={handleCloseResults}
                />
              )}
            </div>
          </div>

          {/* Código dos Itens Exibidos no Navbar */}
          <div
            className="offcanvas offcanvas-start text-bg-light"
            tabIndex="-1"
            id="offcanvasNavbar2"
            aria-labelledby="offcanvasNavbar2Label"
          >
            <div className="offcanvas-header">
              <ul className="navbar-nav d-flex links-logo-ifembrapa flex-row mx-1">
                {/* Logo IF / Embrapa Dentro do Menu */}
                <li className="nav-item">
                  <Link href="/home">
                    <Image
                      src={LogoIFEmbrapa}
                      className="img-navbar-menu me-3"
                      width="100%"
                      height={46}
                      alt="logo Embrapa com letras em azul com um simbolo verde, sendo que as letras em cima do simbolo são brancas"
                      priority
                    />
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                className="btn-close btn-close-dark"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <hr className="featurette-divider"></hr>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 center-itens">
                <li className="nav-item">
                  <Link
                    className="nav-link back-item-link"
                    href="/edicao-completa"
                    aria-current="page"
                  >
                    <span className="link-text">Edição Completa</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link back-item-link"
                    href="/autores"
                    aria-current="page"
                    onClick={(e) => {
                      if (router.pathname === "/autores") {
                        e.preventDefault();
                        window.location.reload();
                      }
                    }}
                  >
                    <span className="link-text">Autores</span>
                  </Link>
                </li>
              </ul>
              {/* Input Search para tela maior que 992px */}
              <div id="searchForm" className="search-container">
                <div className="d-flex position-relative p-1 search-bar-container">
                  <SearchBar setResults={setResults} />
                  {results && results.length > 0 && (
                    <SearchResultsList
                      results={results}
                      handleCloseResults={handleCloseResults}
                    />
                  )}
                </div>
              </div>
              <ul className="navbar-nav d-flex links-logo flex-row">
                <li className="nav-item second-logo-inst">
                  <Image
                    src={LogoIF}
                    className="logotipo"
                    width={130}
                    height={35}
                    alt="Logotiopo do IFMS Campus Dourados"
                    priority
                  />
                </li>
                <li className="nav-item second-logo-inst">
                  <Image
                    src={LogoEmbrapa}
                    className="logotipo"
                    width={70}
                    height={48}
                    alt="Logotiopo da Embrapa"
                    priority
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
