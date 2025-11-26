import { useEffect, useState } from "react";

export default function MetabaseEmbed() {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://localhost:7292/api/metabase/signed-url")
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar URL do Metabase");
        return res.json();
      })
      .then(data => setUrl(data.url))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <p>Erro: {error}</p>;
  if (!url) return <p>Carregando...</p>;

  return (
    <iframe
      src={url}
      frameBorder="0"
      style={{ width: "100vw", height: "100vh" }}
      allowTransparency
    />
  );
}
