const axios = require('axios');

async function analyzeImage(imageUrl) {
  const endpoint = 'https://visaodeia.cognitiveservices.azure.com/';
  const params = {
    visualFeatures: 'Categories,Description,Tags',
    details: 'Landmarks',
    language: 'pt',
  };
  const headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '9cbef780337e459793f317d0ff64d544',
  };

  try {
    const response = await axios.post(
      endpoint,
      { url: imageUrl },
      { params, headers }
    );
    return response.data;
  } catch (error) {
    console.error('Error analyzing image:', error.message);
    throw error;
  }
}

module.exports = analyzeImage;
