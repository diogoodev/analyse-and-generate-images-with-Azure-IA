// DisplayResults.js

import React from 'react';

const DisplayResults = ({
  results,
  imageUrl,
  isGenerated,
  displayImageUrl,
  inputContent,
}) => {
  console.log('Results:', results);
  console.log('ImageUrl:', imageUrl);
  console.log('IsGenerated:', isGenerated);
  console.log('displayImageUrl', displayImageUrl);

  return (
    <div>
      <h2>Computer Vision Analysis</h2>
      <p>Computer Vision analyses:</p>

      {/* Displaying the analyzed or generated image */}
      {displayImageUrl && !isGenerated && (
        <div>
          <h3>Analyzed Image:</h3>
          <img
            src={displayImageUrl}
            alt="Analyzed"
            style={{ width: '200px', height: '200px' }}
          />
        </div>
      )}

      {results && results.generatedImageUrl && isGenerated && (
        <div>
          <h3>Generated Image:</h3>
          <img
            src={results.generatedImageUrl}
            alt="Generated"
            style={{ width: '200px', height: '200px' }}
          />
        </div>
      )}

      {/* Displaying Analysis or Generate Results based on the button clicked */}
      {results && (
        <div>
          <h3>{isGenerated ? 'Generate' : 'Analysis'} Results:</h3>
          {isGenerated ? (
            <div>
              <p>Prompt: {inputContent}</p>
              <p>Generated Image URL: {results.generatedImageUrl}</p>
            </div>
          ) : (
            <pre>{JSON.stringify(results, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayResults;
