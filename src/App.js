// App.js

import React, { useState, useEffect } from 'react';
import DisplayResults from './DisplayResults';
import {
  analyzeImage,
  isConfigured as isVisionConfigured,
} from './azure-image-analysis';
import {
  generateImage,
  isConfigured as isOpenAIConfigured,
} from './azure-image-generation';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [results, setResults] = useState(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true); // State to track configuration

  useEffect(() => {
    // Check if both services are configured
    setIsConfigured(isVisionConfigured() && isOpenAIConfigured());
  }, []);

  const handleAnalyzeClick = async () => {
    // Continue with the analysis only if configured
    if (!isConfigured) {
      return;
    }

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

  const handleGenerateClick = async () => {
    // Continue with the generation only if configured
    if (!isConfigured) {
      return;
    }

    setLoading(true);
    try {
      const generatedImage = await generateImage(imageUrl); // Assuming imageUrl as the prompt
      setGeneratedImageUrl(generatedImage);
    } catch (error) {
      console.error('Error generating image:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Display a warning if not configured */}
      {!isConfigured && <p>Warning: The app is not properly configured.</p>}

      <h1>Computer Vision</h1>
      <p>
        Analyze an image using Azure Computer Vision or generate an image using
        OpenAI
      </p>

      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleAnalyzeClick} disabled={loading}>
        Analyze
      </button>

      <button onClick={handleGenerateClick} disabled={loading}>
        Generate
      </button>

      {loading && <p>Processing...</p>}
      {results && <DisplayResults results={results} imageUrl={imageUrl} />}
      {generatedImageUrl && (
        <DisplayResults
          results={{ generatedImageUrl }}
          imageUrl={generatedImageUrl}
        />
      )}
    </div>
  );
};

export default App;
