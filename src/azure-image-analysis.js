// azure-image-analysis.js

import fetch from 'node-fetch';

const isConfigured = () => {
  // Check if environment variables for Azure Computer Vision are set
  return (
    process.env.REACT_APP_VISION_ENDPOINT && process.env.REACT_APP_VISION_KEY
  );
};

const analyzeImage = async (imageUrl) => {
  if (!isConfigured()) {
    throw new Error('Azure Computer Vision is not properly configured.');
  }
  try {
    const params = {
      features: ['tags'],
      'model-version': 'latest',
      language: 'en',
      'gender-neutral-caption': 'False',
    };

    const AZURE_ENDPOINT = process.env.REACT_APP_VISION_ENDPOINT;
    const AZURE_API = process.env.REACT_APP_VISION_KEY;
    const response = await fetch(
      `${AZURE_ENDPOINT}${new URLSearchParams(params)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': AZURE_API,
        },
        body: JSON.stringify({ url: imageUrl }),
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(`Error analyzing image: ${errorData.error.message}`);
    }
  } catch (error) {
    throw error;
  }
};

export { analyzeImage, isConfigured };
