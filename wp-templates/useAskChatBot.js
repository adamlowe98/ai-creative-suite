import { useCallback } from 'react';

const useAskChatBot = () => {
    const askChatBot = useCallback(async (question) => {
        try {
            const response = await fetch('https://api.google.com/gemini/chat', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });
            const data = await response.json();
            console.log("Chatbot response:", data);
        } catch (error) {
            console.error("Error asking chatbot:", error);
        }
    }, []);

    return { askChatBot };
};

export default useAskChatBot;
