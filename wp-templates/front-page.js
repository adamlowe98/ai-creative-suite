import React from 'react'; // Import React
import { gql } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/header";
import EntryHeader from "../components/entry-header";
import Footer from "../components/footer";
import style from "../styles/front-page.module.css";

async function generateImage() {
    const prompt = document.getElementById('imagePrompt').value;
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
}

async function askChatBot() {
    const question = document.getElementById('chatInput').value;
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
}

async function generateWriting() {
    const prompt = document.getElementById('writingPrompt').value;
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
}

async function generate3DModel() {
    const prompt = document.getElementById('modelPrompt').value;
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
}

export default function Component(props) {
    const { title: siteTitle, description: siteDescription } =
        props.data.generalSettings;
    const menuItems = props.data.primaryMenuItems.nodes;

    // This function will run after the component mounts
    React.useEffect(() => {
        document.querySelectorAll('nav ul li a').forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                const target = document.querySelector(this.getAttribute('href'));
                target.classList.add('active');
            });
        });
    }, []);

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

                <section className={style.cardGrid}>
                    <Link href="#generateImage" className={style.card}>
                        <h3>Generate Images →</h3>
                        <p>Use AI to create stunning images based on your prompts.</p>
                    </Link>

                    <Link href="#chatBot" className={style.card}>
                        <h3>Chat with AI →</h3>
                        <p>Ask questions and get instant responses from our AI chatbot.</p>
                    </Link>

                    <Link href="#writingAssistant" className={style.card}>
                        <h3>Writing Assistant →</h3>
                        <p>Generate creative writing pieces with the help of AI.</p>
                    </Link>

                    <Link href="#3DModeling" className={style.card}>
                        <h3>3D Modeling →</h3>
                        <p>Create and visualize 3D models effortlessly.</p>
                    </Link>
                </section>

                <div id="generateImage" className="tab-content">
                    <h2>Generate Images</h2>
                    <textarea id="imagePrompt" placeholder="Enter your image prompt here..."></textarea>
                    <button onClick={generateImage}>Generate Image</button>
                </div>

                <div id="chatBot" className="tab-content">
                    <h2>Chat with AI</h2>
                    <input id="chatInput" type="text" placeholder="Ask your question here..." />
                    <button onClick={askChatBot}>Ask</button>
                </div>

                <div id="writingAssistant" className="tab-content">
                    <h2>Writing Assistant</h2>
                    <textarea id="writingPrompt" placeholder="Enter your writing prompt here..."></textarea>
                    <button onClick={generateWriting}>Generate Writing</button>
                </div>

                <div id="3DModeling" className="tab-content">
                    <h2>3D Modeling</h2>
                    <textarea id="modelPrompt" placeholder="Describe your 3D model here..."></textarea>
                    <button onClick={generate3DModel}>Generate 3D Model</button>
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
