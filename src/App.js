import React, { useState } from 'react';
import DisplayResults from './DisplayResults';
import analyzeImage from './azure-image-analysis';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyzeClick = async () => {
    setLoading(true);
    try {
      const response = await analyzeImage(imageUrl);
      setResults(response);
    } catch (error) {
      console.error('Error analyzing image:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Computer Vision</h1>
      <p>Analyze an image using Azure Computer Vision</p>

      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleAnalyzeClick} disabled={loading}>
        Analyze
      </button>
      {loading && <p>Processing...</p>}
      {results && <DisplayResults results={results} imageUrl={imageUrl} />}
    </div>
  );
};

export default App;
