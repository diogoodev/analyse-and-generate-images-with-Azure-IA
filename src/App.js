import React, { useState } from 'react';
import analyzeImage from './azure-image-analysis';

function App() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageAnalysis = async () => {
    setLoading(true);
    const data = await analyzeImage(url);
    setResults(data);
    setLoading(false);
  };

  const DisplayResults = () => {
    if (!results) return null;
    return (
      <div>
        <h2>Resultados:</h2>
        <img src={url} alt="Analyzed" />
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div>
      <h1>Título</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Insira a URL da imagem"
      />
      <button onClick={handleImageAnalysis} disabled={loading}>
        {loading ? 'Analisando...' : 'Analisar Imagem'}
      </button>
      <DisplayResults />
    </div>
  );
}

export default App;
