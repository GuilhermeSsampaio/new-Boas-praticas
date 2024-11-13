import { useState, useEffect, useRef } from "react";
const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://api-cartilha.squareweb.app";

const useFetchCollections = () => {
  const [collections, setCollections] = useState([]);
  const [activeCollection, setActiveCollection] = useState(null);
  const fetchCollectionsRef = useRef(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        fetchCollectionsRef.current = new AbortController();

        const urls = [
          `${baseUrl}/api/pesticida-abelhas?populate=*`,
          `${baseUrl}/api/boa-pratica-agroes?populate=*`,
          `${baseUrl}/api/boa-pratica-apicolas?populate=*`,
          `${baseUrl}/api/boa-pratica-comunicacaos?populate=*`,
        ];

        const responses = await Promise.all(
          urls.map((url) =>
            fetch(url, { signal: fetchCollectionsRef.current.signal }).then(
              (response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              },
            ),
          ),
        );

        const collectionsData = [
          { id: 1, title: "Pesticidas e abelhas", data: responses[0] },
          { id: 2, title: "Boas práticas agrícolas", data: responses[1] },
          { id: 3, title: "Boas práticas apícolas", data: responses[2] },
          { id: 4, title: "Boas práticas de comunicação", data: responses[3] },
        ];

        setCollections(collectionsData);

        if (collectionsData.length > 0 && !activeCollection) {
          setActiveCollection(collectionsData[0].id);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Erro ao buscar as coleções", error);
        }
      }
    };

    fetchCollections();

    return () => {
      if (fetchCollectionsRef.current) {
        fetchCollectionsRef.current.abort();
      }
    };
  }, []);

  return { collections, activeCollection, setActiveCollection };
};

export default useFetchCollections;
