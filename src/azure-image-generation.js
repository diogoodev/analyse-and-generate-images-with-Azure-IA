import OpenAI from 'openai';

const isConfigured = () => {
  const isApiKeyConfigured =
    process.env.REACT_APP_OPENAI_API_KEY &&
    process.env.REACT_APP_OPENAI_API_KEY.trim() !== '';

  return isApiKeyConfigured;
};

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const generateImage = async (prompt) => {
  if (!isConfigured()) {
    throw new Error('OpenAI is not properly configured.');
  }

  try {
    const headers = {
      Authorization: `Bearer ${openai.apiKey}`,
    };

    const image = await openai.images.generate(
      {
        model: 'dall-e-2',
        prompt: prompt,
      },
      { headers }
    );

    console.log(image.data); // Log the entire OpenAI response

    const generatedImageUrl = image.data[0]?.url;

    if (!generatedImageUrl) {
      throw new Error('Generated image URL not found in the response.');
    }

    return {
      generatedImageUrl,
      prompt: image.data[0]?.prompt,
      openaiResponse: image.data,
    };
  } catch (error) {
    throw new Error(`Error generating image: ${error.code}`);
  }
};

export { generateImage, isConfigured };
