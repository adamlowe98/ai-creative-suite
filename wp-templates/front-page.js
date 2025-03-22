import React, { useState } from 'react'; 
import { gql } from "@apollo/client";
import Head from "next/head";
import Header from "../components/header";
import EntryHeader from "../components/entry-header";
import Footer from "../components/footer";
import style from "../styles/front-page.module.css";
import useAskChatBot from "../wp-templates/useAskChatBot.js"; 
import useGenerateImage from "../wp-templates/useGenerateImage.js"; 
import useGenerateWriting from "../wp-templates/useGenerateWriting.js"; 

export default function Component(props) {
    const { title: siteTitle, description: siteDescription } = props.data.generalSettings;
    const menuItems = props.data.primaryMenuItems.nodes;

    const [activeTab, setActiveTab] = useState('imageGenerator');

    const { generateImage } = useGenerateImage();
    const { askChatBot } = useAskChatBot();
    const { generateWriting } = useGenerateWriting();

    const renderTabContent = () => {
        switch (activeTab) {
            case 'imageGenerator':
                return (
                    <div>
                        <h2>Generate Images</h2>
                        <textarea id="imagePrompt" placeholder="Enter your image prompt here..."></textarea>
                        <button onClick={() => generateImage(document.getElementById('imagePrompt').value)}>Generate Image</button>
                    </div>
                );
            case 'chatBot':
                return (
                    <div>
                        <h2>Chat with AI</h2>
                        <input id="chatInput" type="text" placeholder="Ask your question here..." />
                        <button onClick={() => askChatBot(document.getElementById('chatInput').value)}>Ask</button>
                    </div>
                );
            case 'writingAssistant':
                return (
                    <div>
                        <h2>Writing Assistant</h2>
                        <textarea id="writingPrompt" placeholder="Enter your writing prompt here..."></textarea>
                        <button onClick={() => generateWriting(document.getElementById('writingPrompt').value)}>Generate Writing</button>
                    </div>
                );
            case 'lyricGeneration':
                return (
                    <div>
                        <h2>Lyric Generation</h2>
                        <textarea id="lyricPrompt" placeholder="Enter your lyric prompt here..."></textarea>
                        <button onClick={() => generateLyrics(document.getElementById('lyricPrompt').value)}>Generate Lyrics</button>
                    </div>
                );
            case 'musicGeneration':
                return (
                    <div>
                        <h2>Music Generation</h2>
                        <textarea id="musicPrompt" placeholder="Describe your music idea here..."></textarea>
                        <button onClick={() => generateMusic(document.getElementById('musicPrompt').value)}>Generate Music</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <Header
                siteTitle={siteTitle}
                siteDescription={siteDescription}
                menuItems={menuItems}
            />

            <main className="container">
                <EntryHeader title="Welcome to the AI Creative Suite Platform" />

                <div className={style.tabContainer}>
                    <ul className={style.tabList}>
                        <li className={`${style.tabItem} ${activeTab === 'imageGenerator' ? style.active : ''}`} onClick={() => setActiveTab('imageGenerator')}>Generate Images</li>
                        <li className={`${style.tabItem} ${activeTab === 'chatBot' ? style.active : ''}`} onClick={() => setActiveTab('chatBot')}>Chat with AI</li>
                        <li className={`${style.tabItem} ${activeTab === 'writingAssistant' ? style.active : ''}`} onClick={() => setActiveTab('writingAssistant')}>Writing Assistant</li>
                        <li className={`${style.tabItem} ${activeTab === 'lyricGeneration' ? style.active : ''}`} onClick={() => setActiveTab('lyricGeneration')}>Lyric Generation</li>
                        <li className={`${style.tabItem} ${activeTab === 'musicGeneration' ? style.active : ''}`} onClick={() => setActiveTab('musicGeneration')}>Music Generation</li>
                    </ul>
                    <div className={style.tabContent}>
                        {renderTabContent()}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

Component.query = gql` 
  ${Header.fragments.entry}
  query GetHomePage {
    ...HeaderFragment
  }
`;
