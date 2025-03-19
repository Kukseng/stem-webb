// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import './Chatbot.css';

// const Chatbot = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState('');
//     const messagesEndRef = useRef(null);

//     // Replace with your actual xAI Grok API key
//     const XAI_API_KEY = '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'; // WARNING: Do NOT hardcode in production
//     const XAI_API_URL = 'https://api.x.ai/v1/chat/completions'; // Hypothetical URL; check xAI documentation

//     // Scroll to the bottom of the messages when new messages are added
//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     // Handle sending a message
//     const sendMessage = async () => {
//         if (!input.trim()) return;

//         // Add user message to the chat
//         const userMessage = { text: input, sender: 'user' };
//         setMessages((prevMessages) => [...prevMessages, userMessage]);
//         setInput('');

//         try {
//             // Prepare the request to the xAI Grok API
//             const headers = {
//                 'Authorization': `Bearer ${XAI_API_KEY}`,
//                 'Content-Type': 'application/json'
//             };
//             const payload = {
//                 model: 'grok', // Replace with the actual model name from xAI documentation
//                 messages: [
//                     { role: 'system', content: 'You are a helpful assistant for the IstemEdu website, providing information about courses, admissions, fees, and more.' },
//                     { role: 'user', content: input }
//                 ]
//             };

//             // Send request directly to the xAI Grok API
//             const response = await axios.post(XAI_API_URL, payload, { headers });
//             const botMessage = { text: response.data.choices[0].message.content, sender: 'bot' };
//             setMessages((prevMessages) => [...prevMessages, botMessage]);
//         } catch (error) {
//             const errorMessage = { text: 'Error: Unable to get a response from the server.', sender: 'bot' };
//             setMessages((prevMessages) => [...prevMessages, errorMessage]);
//         }
//     };

//     // Handle Enter key press
//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter') {
//             sendMessage();
//         }
//     };

//     return (
//         <div className="chatbot-widget">
//             <div className="chatbot-messages">
//                 {messages.map((msg, index) => (
//                     <div key={index} className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
//                         {msg.text}
//                     </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//             </div>
//             <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Type your message..."
//                 className="chatbot-input"
//             />
//         </div>
//     );
// };

// export default Chatbot;