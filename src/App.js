import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');

  const handleImageAnalysis = () => {
    // Aqui você pode adicionar a lógica para a análise de imagem
    console.log('Analisando a imagem: ', url);
  };

  const handleImageGeneration = () => {
    // Aqui você pode adicionar a lógica para a geração de imagem
    console.log('Gerando a imagem para a URL: ', url);
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
      <button onClick={handleImageAnalysis}>Analisar Imagem</button>
      <button onClick={handleImageGeneration}>Gerar Imagem</button>
    </div>
  );
}

export default App;
