import { useState } from "react";

export default function MetabaseEmbed() {
  const [inputUrl, setInputUrl] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");

  const handleLoadDashboard = () => {
    if (!inputUrl) return;
    setIframeUrl(inputUrl);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ padding: "12px", display: "flex", gap: "8px" }}>
        <input
          type="text"
          placeholder="Cole aqui o link do dashboard do Metabase"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />

        <button onClick={handleLoadDashboard}>
          Carregar dashboard
        </button>
      </div>

      {iframeUrl && (
        <iframe
          src={iframeUrl}
          frameBorder="0"
          style={{ width: "100%", height: "100%" }}
          allowTransparency
        />
      )}
    </div>
  );
}
