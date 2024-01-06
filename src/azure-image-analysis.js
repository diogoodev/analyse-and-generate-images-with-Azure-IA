import fetch from 'node-fetch';

const isConfigured = () => {
  const isApiKeyConfigured =
    process.env.REACT_APP_VISION_KEY &&
    process.env.REACT_APP_VISION_KEY.trim() !== '';

  const isEndpointConfigured =
    process.env.REACT_APP_VISION_ENDPOINT &&
    process.env.REACT_APP_VISION_ENDPOINT.trim() !== '';

  return isApiKeyConfigured && isEndpointConfigured;
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
    const AZURE_API_KEY = process.env.REACT_APP_VISION_KEY;
    const response = await fetch(
      `${AZURE_ENDPOINT}computervision/imageanalysis:analyze?api-version=2023-10-01&${new URLSearchParams(
        params
      )}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': AZURE_API_KEY,
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
    throw new Error(`${error.message}`);
  }
};

export { analyzeImage, isConfigured };
