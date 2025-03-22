import { useCallback } from 'react';

const useGenerateWriting = () => {
    const generateWriting = useCallback(async (prompt) => {
        try {
            const response = await fetch('https://api.google.com/gemini/writing', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();
            console.log("Generated writing data:", data);
        } catch (error) {
            console.error("Error generating writing:", error);
        }
    }, []);

    return { generateWriting };
};

export default useGenerateWriting;
