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
  const [inputContent, setInputContent] = useState('');
  const [analyzeResults, setAnalyzeResults] = useState(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [generateResults, setGenerateResults] = useState(null);
  const [displayImageUrl, setDisplayImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    setIsConfigured(isVisionConfigured() && isOpenAIConfigured());
  }, []);

  if (!isConfigured) {
    return (
      <p>
        O aplicativo não está configurado corretamente. Por favor, verifique
        suas variáveis de ambiente.
      </p>
    );
  }

  const isUrl = (input) => {
    try {
      new URL(input);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleAnalyzeClick = async () => {
    if (!isConfigured) {
      return;
    }

    setLoading(true);
    try {
      const response = await analyzeImage(inputContent);
      setAnalyzeResults(response);

      // Set the display image URL to the URL that was sent as a request to the API
      setDisplayImageUrl(inputContent);

      // Clear the generated image URL and results
      setGeneratedImageUrl(null);
      setGenerateResults(null);
    } catch (error) {
      console.error('Error analyzing image:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateClick = async () => {
    if (!isConfigured) {
      return;
    }

    setLoading(true);
    try {
      const generatedImage = await generateImage(inputContent);
      setGeneratedImageUrl(generatedImage.generatedImageUrl);

      setGenerateResults({
        prompt: inputContent,
        generatedImageUrl: generatedImage.generatedImageUrl,
      });

      // Clear the analyze results
      setAnalyzeResults(null);

      if (!isUrl(inputContent) && generatedImage.generatedImageUrl) {
        setDisplayImageUrl(generatedImage.generatedImageUrl);
      }
    } catch (error) {
      console.error('Error generating image:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearResultsClick = () => {
    setInputContent('');
    setAnalyzeResults(null);
    setGeneratedImageUrl(null);
    setGenerateResults(null);
  };

  return (
    <div>
      {!isConfigured && <p>Warning: The app is not properly configured.</p>}

      <h1>Computer Vision</h1>
      <p>
        Analyze an image using Azure Computer Vision or generate an image using
        OpenAI
      </p>

      {/* Input for Content (URL or Prompt) */}
      <label>
        <input
          placeholder="Enter a URL or prompt"
          type="text"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
        />
      </label>

      {/* Analyze Button */}
      <button onClick={handleAnalyzeClick} disabled={loading}>
        Analyze
      </button>

      {/* Generate Button */}
      <button onClick={handleGenerateClick} disabled={loading}>
        Generate
      </button>

      {/* Clear Results Button */}
      <button onClick={handleClearResultsClick} disabled={loading}>
        Clear Results
      </button>

      {loading && <p>Processing...</p>}

      {/* Displaying Results */}
      {(analyzeResults || generatedImageUrl) && (
        <DisplayResults
          results={analyzeResults || { generatedImageUrl }}
          displayImageUrl={displayImageUrl}
          isGenerated={!!generatedImageUrl}
          inputContent={inputContent}
        />
      )}
    </div>
  );
};

export default App;
