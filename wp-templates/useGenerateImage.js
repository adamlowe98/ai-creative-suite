import { useState, useCallback } from 'react';

const useGenerateImage = (replicateApiKey) => {
    const [imageResult, setImageResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const generateImage = useCallback(async (prompt) => {
        setLoading(true);
        setError(null); // Clear any previous errors

        try {
            const response = await fetch(
                "https://api.replicate.com/v1/predictions",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Token ${replicateApiKey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        version: "db21e45d3f7023abc2a46ee38a23973f6dce16bb082a931b0c7c683a31e5b983",  // Stable Diffusion v1.5
                        input: { prompt },
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Replicate API Error: ${response.status} - ${errorData.detail || response.statusText}`);
            }

            let prediction = await response.json();
            let imageUrl = null;

            // Poll the prediction until it's complete
            while (prediction.status !== "succeeded" && prediction.status !== "failed") {
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
                const getResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
                    headers: {
                        Authorization: `Token ${replicateApiKey}`,
                    },
                });
                prediction = await getResponse.json();
            }

            if (prediction.status === "succeeded") {
                imageUrl = prediction.output[0];  // Assuming the output is an array of image URLs
                setImageResult(imageUrl);
            } else {
                throw new Error(`Image generation failed: ${prediction.error}`);
            }


        } catch (err) {
            setError(err.message);
            console.error("Error generating image:", err);
        } finally {
            setLoading(false);
        }
    }, [replicateApiKey]);

    return { generateImage, imageResult, loading, error };
};

export default useGenerateImage;
