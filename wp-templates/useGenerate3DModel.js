import { useCallback } from 'react';

const useGenerate3DModel = () => {
    const generate3DModel = useCallback(async (prompt) => {
        try {
            const response = await fetch('https://api.meshy.com/v1/models', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MESHY_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();
            console.log("Generated 3D model data:", data);
        } catch (error) {
            console.error("Error generating 3D model:", error);
        }
    }, []);

    return { generate3DModel };
};

export default useGenerate3DModel;
