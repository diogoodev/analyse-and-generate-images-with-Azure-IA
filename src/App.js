import React, { useState } from 'react';
import './index.css';
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
  const [apiInput, setApiInput] = useState('');
  const [analyzeResults, setAnalyzeResults] = useState(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [displayImageUrl, setDisplayImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const visionConfigured = isVisionConfigured();
  const openAIConfigured = isOpenAIConfigured();

  const isUrl = (input) => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const resetStates = () => {
    setInputContent('');
    setAnalyzeResults(null);
    setGeneratedImageUrl(null);
    setErrorMessage('');
  };

  const handleAnalyzeClick = async () => {
    try {
      // Reset states
      resetStates();

      setLoading(true);
      const response = await analyzeImage(inputContent);
      setAnalyzeResults(response);
      setDisplayImageUrl(inputContent);
      setGeneratedImageUrl(null);
    } catch (error) {
      setAnalyzeResults(null); // Clear the analyze results
      // Set the error message in the state
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateClick = async () => {
    try {
      setApiInput(inputContent);
      resetStates();
      setLoading(true);
      const generatedImage = await generateImage(inputContent);

      setGeneratedImageUrl(generatedImage.generatedImageUrl);

      if (!isUrl(inputContent) && generatedImage.generatedImageUrl) {
        setDisplayImageUrl(generatedImage.generatedImageUrl);
      }
    } catch (error) {
      // Set the error message in he state
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }; // Remove the semicolon here

  const handleClearResultsClick = () => {
    resetStates();
  };

  return (
    <div>
      {!visionConfigured && !openAIConfigured && (
        <p>
          Both Vision and OpenAI Keys are not configured. Please check your
          environment variables and configuration.
        </p>
      )}

      {!visionConfigured && (
        <p>
          Vision Key or Endpoint is not configured for cognitive services.
          Please check your environment variables and configuration.
        </p>
      )}

      {!openAIConfigured && (
        <p>
          OpenAI Key is not configured. Please check your environment variables
          and configuration.
        </p>
      )}

      {visionConfigured && openAIConfigured && (
        <>
          <h1>Computer Vision</h1>
          <p>
            Analyze an image using Azure Computer Vision or generate an image
            using OpenAI
          </p>

          <label>
            <input
              placeholder="Enter a URL or prompt"
              type="text"
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
            />
          </label>

          <button onClick={handleAnalyzeClick} disabled={loading}>
            Analyze
          </button>

          <button onClick={handleGenerateClick} disabled={loading}>
            Generate
          </button>

          <button onClick={handleClearResultsClick}>Clear Results</button>

          {loading && <p>Processing...</p>}

          {errorMessage && <p>{errorMessage}</p>}

          {(analyzeResults || generatedImageUrl) && (
            <DisplayResults
              results={analyzeResults || { generatedImageUrl }}
              displayImageUrl={displayImageUrl}
              isGenerated={!!generatedImageUrl}
              inputContent={apiInput}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
