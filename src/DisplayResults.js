// DisplayResults.js

import React from 'react';

const DisplayResults = ({ results, imageUrl }) => {
  return (
    <div>
      <h2>Computer Vision Analysis</h2>
      <p>Computer Vision analyses:</p>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Analyzed Image"
          style={{ width: '200px', height: '200px' }}
        />
      )}

      <h3>Analysis Results:</h3>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
};

export default DisplayResults;
