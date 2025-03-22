import React, { useState } from 'react'; // Import React and useState
import { gql } from "@apollo/client";
import Head from "next/head";
import Header from "../components/header";
import EntryHeader from "../components/entry-header";
import Footer from "../components/footer";
import style from "../styles/front-page.module.css";
import useGenerateImage from "../useGenerateImage";
import useAskChatBot from "../useAskChatBot";
import useGenerateWriting from "../useGenerateWriting";
import useGenerate3DModel from "../useGenerate3DModel";

export default function Component(props) {
    const { title: siteTitle, description: siteDescription } = props.data.generalSettings;
    const menuItems = props.data.primaryMenuItems.nodes;

    // State to manage the active tab
    const [activeTab, setActiveTab] = useState('generateImage');

    // Custom hooks to handle the respective API calls
    const { generateImage } = useGenerateImage();
    const { askChatBot } = useAskChatBot();
    const { generateWriting } = useGenerateWriting();
    const { generate3DModel } = useGenerate3DModel();

    // Function to render content based on the active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'generateImage':
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
            case '3DModeling':
                return (
                    <div>
                        <h2>3D Modeling</h2>
                        <textarea id="modelPrompt" placeholder="Describe your 3D model here..."></textarea>
                        <button onClick={() => generate3DModel(document.getElementById('modelPrompt').value)}>Generate 3D Model</button>
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
                        <li className={`${style.tabItem} ${activeTab === 'generateImage' ? style.active : ''}`} onClick={() => setActiveTab('generateImage')}>Generate Images</li>
                        <li className={`${style.tabItem} ${activeTab === 'chatBot' ? style.active : ''}`} onClick={() => setActiveTab('chatBot')}>Chat with AI</li>
                        <li className={`${style.tabItem} ${activeTab === 'writingAssistant' ? style.active : ''}`} onClick={() => setActiveTab('writingAssistant')}>Writing Assistant</li>
                        <li className={`${style.tabItem} ${activeTab === '3DModeling' ? style.active : ''}`} onClick={() => setActiveTab('3DModeling')}>3D Modeling</li>
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
