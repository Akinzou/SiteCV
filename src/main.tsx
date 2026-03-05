import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Easter egg for curious developers
console.log(`
%c __   __ _____ _     ___  _   _
%c \\ \\ / /| ____|| |   / _ \\| \\ | |
%c  \\ V / |  _|  | |  | | | ||  \\| |
%c   | |  | |___ | |__| |_| || |\\  |
%c   |_|  |_____||_____|\\___/|_| \\_|
%c
%c  Hey there, curious one! 👋
%c
%c  You found the console easter egg.
%c  That means you're either:
%c
%c  🦌 A developer checking my code (respect!)
%c  🔍 A recruiter doing due diligence (let's talk!)
%c  🤖 An AI analyzing this site (see robots.txt)
%c
%c  ┌─────────────────────────────────────┐
%c  │  Fun fact: "Yelon" comes from      │
%c  │  "Jeleń" - Polish word for deer.   │
%c  │  Yes, I'm a deer in the headlights │
%c  │  of your job offer. 🦌✨            │
%c  └─────────────────────────────────────┘
%c
%c  📧 root@yelon.pro
%c  🌐 https://yelon.pro
%c
%c  P.S. Try typing: yelon() in console ;)
`,
'color: #00ff88; font-weight: bold; font-size: 14px',
'color: #00ff88; font-weight: bold; font-size: 14px',
'color: #00ff88; font-weight: bold; font-size: 14px',
'color: #00ff88; font-weight: bold; font-size: 14px',
'color: #00ff88; font-weight: bold; font-size: 14px',
'color: #888',
'color: #fff; font-size: 16px; font-weight: bold',
'color: #888',
'color: #aaa',
'color: #aaa',
'color: #888',
'color: #ffaa00',
'color: #ffaa00',
'color: #ffaa00',
'color: #888',
'color: #00aaff',
'color: #00aaff',
'color: #00aaff',
'color: #00aaff',
'color: #00aaff',
'color: #00aaff',
'color: #888',
'color: #ff6688',
'color: #ff6688',
'color: #888',
'color: #888; font-style: italic'
);

// Secret function easter egg
(window as unknown as Record<string, unknown>).yelon = () => {
  const messages = [
    "🦌 *deer noises* You called?",
    "Hiring? I'm all ears! (deer ears, obviously)",
    "console.log('Hello World') was too mainstream",
    "You found me! Now... about that job offer? 👀",
    "Error 418: I'm a teapot. Just kidding, I'm a deer.",
    "while(true) { drinkCoffee(); writeCode(); }",
    "git commit -m 'Hired Wiktor' // do it, you know you want to",
  ];
  const random = messages[Math.floor(Math.random() * messages.length)];
  console.log(`%c${random}`, 'color: #00ff88; font-size: 14px; font-weight: bold');
  return "🦌";
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
