import React from 'react';

const DisplayResults = ({
  results,
  isGenerated,
  displayImageUrl,
  inputContent,
}) => {
  console.log('Results:', results);

  const renderAnalyzedImage = () => (
    <>
      <h3>Analyzed Image:</h3>
      <img
        src={displayImageUrl}
        alt="Analyzed"
        style={{ width: '200px', height: '200px' }}
      />
    </>
  );

  const renderGeneratedImage = () => (
    <>
      <h3>Generated Image:</h3>
      <img
        src={results.generatedImageUrl}
        alt="Generated"
        style={{ width: '200px', height: '200px' }}
      />
    </>
  );

  const renderGenerateResults = () => (
    <>
      <h3>Generate Results:</h3>
      <div>
        <p>Prompt: {inputContent}</p>
        <p>Generated Image URL: {results.generatedImageUrl}</p>
      </div>
    </>
  );

  const renderAnalysisResults = () => (
    <>
      <h3>Analysis Results:</h3>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </>
  );

  return (
    <div>
      <h2>Computer Vision Analysis</h2>
      <p>Computer Vision analyses:</p>

      {displayImageUrl && !isGenerated && renderAnalyzedImage()}

      {results &&
        results.generatedImageUrl &&
        isGenerated &&
        renderGeneratedImage()}

      {results && (
        <>{isGenerated ? renderGenerateResults() : renderAnalysisResults()}</>
      )}
    </div>
  );
};

export default DisplayResults;
