import { useCallback } from 'react';

const useGenerateImage = () => {
    const generateImage = useCallback(async (prompt) => {
        try {
            const response = await fetch('https://api.replicate.com/v1/generate', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();
            console.log("Generated image data:", data);
        } catch (error) {
            console.error("Error generating image:", error);
        }
    }, []);

    return { generateImage };
};

export default useGenerateImage;
