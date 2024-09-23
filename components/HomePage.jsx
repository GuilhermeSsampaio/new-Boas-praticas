import Image from "next/image";
import Link from "next/link";
import InstallButton from "./InstallButton/InstallButton";
import InstallButtonIos from "./InstallButton/InstallButtonIos";
import { isDesktop, isAndroid, isIOS } from "react-device-detect";

export const HomePage = () => {
  //Importação das Imagens
  var LogoCartilha = require("../public/logo-cartilha.svg");
  var Harley = require("../public/harley.png");

  return (
    <>
      {/* Conteúdos da Página Principal */}
      <div className="px-4 py-5 text-center hero content-after-navbar">
        <div className="messagem">
          <Image
            className="d-block mx-auto mb-2"
            src={LogoCartilha}
            alt="Logo da cartilha"
            width="100%"
            height="128"
          />
          <h1 className="display-5 fw-bold">
            Tecnologias para a Agricultura Familiar
          </h1>
        </div>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            4<sup>a</sup> edição revista e atualizada
          </p>
          <div className="d-grid container-botoes">
            <Link href="/edicao-completa" type="button" className="btn">
              Acessar a edição completa
            </Link>

            {isDesktop && <InstallButton />}
            {isAndroid && <InstallButton />}
            {isIOS && <InstallButtonIos />}
          </div>
        </div>
      </div>

      <div className="apresentacao">
        <div className="titulo">
          <p>
            Você sabia que boa parte das publicações das minibibliotecas da
            Embrapa estão disponíveis em formato digital? Conheça a quarta
            edição revista e atualizada da publicação Tecnologias para a
            Agricultura Familiar.
          </p>
        </div>
        <div className="texto-container">
          <h1>Apresentação</h1>
          <div className="texto">
            <p>
              Em 2014, a Embrapa lançou a publicação “Tecnologias para a
              Agricultura Familiar”, a qual reuniu diversas tecnologias voltadas
              ao agricultor familiar, em um formato simples e objetivo. Os
              capítulos continham informações básicas, mas também apresentavam
              sugestões bibliográficas e links de acesso, onde o leitor poderia
              se aprofundar nos temas de interesse.
            </p>
            <p>
              O sucesso da publicação foi tal que, de lá para cá, em função de
              demandas, foram realizadas revisões com incrementos de
              tecnologias. Esta quarta edição, além de ter sido revisada,
              ampliada e editada em forma de e-book, também está disponível por
              meio de aplicativo, fruto de uma parceria com o Instituto Federal
              de Mato Grosso do Sul (IFMS) – Campus de Dourados, o qual, depois
              de instalado, trabalha offline. Assim, informações mais detalhadas
              poderão ser facilmente acessadas por meio dos links
              disponibilizados pelos autores no final de cada capítulo. A ideia
              é conectar o produtor ao cenário de inovação tecnológica, para
              expandir a disseminação da informação e do acesso ao conhecimento.
            </p>
            <p>
              A Embrapa está constantemente trabalhando para viabilizar soluções
              de pesquisa, desenvolvimento e inovação para a sustentabilidade da
              agricultura, em benefício da sociedade brasileira. Entregamos esta
              publicação, junto com nossos parceiros, especialmente para os
              produtores familiares, buscando propiciar cada vez mais o acesso a
              essas soluções, de forma que elas sejam propulsoras de uma
              agricultura pujante, forte e cheia de oportunidades.
            </p>
          </div>
          <div className="autor">
            <Image
              src={Harley}
              alt="Foto do Harley"
              className="img"
              width="100%"
              height={100}
            />
            <p className="nome">Harley Nonato de Oliveira</p>
            <p className="cargo">Chefe Geral</p>
            <p className="cargo">Embrapa Agropecuária Oeste</p>
          </div>
        </div>
      </div>
    </>
  );
};
