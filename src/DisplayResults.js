// DisplayResults.js

import React from 'react';

const DisplayResults = ({ results, imageUrl }) => {
  return (
    <div>
      <h2>Computer Vision Analysis</h2>
      <p>Computer Vision analyses:</p>

      {/* Displaying the analyzed image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          style={{ width: '200px', height: '200px' }}
        />
      )}

      {/* Displaying the generated image */}
      {results && results.generatedImageUrl && (
        <div>
          <h3>Generated Image:</h3>
          <img
            src={results.generatedImageUrl}
            alt=""
            style={{ width: '200px', height: '200px' }}
          />
        </div>
      )}

      <h3>Analysis Results:</h3>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
};

export default DisplayResults;
