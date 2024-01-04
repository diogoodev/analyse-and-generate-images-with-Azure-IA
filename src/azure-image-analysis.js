const analyzeImage = async (imageUrl) => {
  const params = {
    features: ['tags'],
    'model-version': 'latest',
    language: 'en',
    'gender-neutral-caption': 'False',
  };

  try {
    const response = await fetch(
      `https://visaodeia.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2023-10-01&${new URLSearchParams(
        params
      )}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': '9cbef780337e459793f317d0ff64d544',
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

export default analyzeImage;
