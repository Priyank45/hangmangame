import React,{useState,useEffect} from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notification from './components/Notification';
import Popup from './components/Popup';
import {showNotification as show} from './helpers/helpers';
import './App.css';

// const words = ['application', 'programming', 'interface', 'wizard','dragon'];
const words = [
  "algorithm", "application", "backup", "bandwidth", "binary", "browser", "cache", "captcha", "client",
  "cloud", "compression", "cybersecurity", "data", "database", "debug", "encryption", "firewall", "firmware",
  "gateway", "gigabyte", "hardware", "hyperlink", "internet", "intranet", "javascript", "kernel", "keyword",
  "login", "malware", "network", "node", "offline", "online", "packet", "portal", "protocol", "proxy",
  "runtime", "server", "session", "spam", "storage", "stream", "surfer", "syntax", "system", "terminal",
  "virus", "web", "widget", "wiki", "wireless", "zip", "analog", "digital", "bandwidth", "bluetooth", 
  "broadband", "byte", "cache", "coding", "command", "compile", "compress", "computer", "configure",
  "console", "data", "database", "debug", "decrypt", "deploy", "development", "device", "document", 
  "domain", "download", "driver", "ethernet", "execute", "file", "filter", "firewall", "firmware",
  "flash", "folder", "font", "format", "framework", "gateway", "gigabyte", "graphic", "grid", "gui",
  "hacker", "hash", "host", "html", "hyperlink", "icon", "ide", "index", "information", "infrastructure",
  "input", "install", "instance", "interface", "internet", "intranet", "javascript", "joystick", "kernel",
  "key", "keyboard", "keyword", "laptop", "layer", "link", "load", "local", "login", "logout", "loop", "malware",
  "media", "memory", "menu", "message", "meta", "microprocessor", "mobile", "modem", "monitor", "motherboard",
  "mouse", "multimedia", "network", "node", "notebook", "object", "offline", "online", "open source", "operating system",
  "operation", "operator", "optical", "output", "packet", "page", "partition", "password", "paste", "patch", "path",
  "platform", "plugin", "port", "portal", "print", "printer", "privacy", "process", "processor", "program", "protocol",
  "proxy", "query", "queue", "reboot", "recover", "recycle", "refresh", "registry", "restore",
  "router", "runtime", "save", "scan", "script", "scroll", "sdk", "security", "server", "service", "session",
  "settings", "setup", "shell", "shortcut", "shutdown", "simulation", "site", "software", "solution", "spam",
  "spool", "spreadsheet", "sql", "storage", "stream", "subnet", "support", "surf", "switch", "synchronize",
  "syntax", "system", "tablet", "tag", "technology", "terminal", "text", "thread", "toolbar", "toolkit",
  "topology", "touchscreen", "track", "traffic", "transmit", "trojan", "ui", "undo", "upload", "usb",
  "user", "username", "utility", "version", "video", "virtual", "virus", "voice", "voicemail", "volume",
  "vpn", "web", "webcam", "website", "widget", "wifi", "wiki", "window", "wireless", "workstation", "zip"
];

let selectedWord = words[Math.floor(Math.random() * words.length)];





function App() {  
  const [Playable , setPlayable] = useState(true);
  const [correctLetters , setcorrectLetters] = useState([]);
  const [wrongLetters , setwrongLetters] = useState([]);
  const [showNotification, setshowNotification] = useState(false);

  useEffect(()=>{
    const handleKeydown = event =>{
      const {key,keyCode} = event;

        if (Playable && keyCode >= 65 && keyCode <= 90) {
          const letter = key.toLowerCase();
    
          if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              setcorrectLetters(currentLetters => [...currentLetters, letter]);
            } else {
              show(setshowNotification);
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              setwrongLetters(wrongLetters => [...wrongLetters, letter]);
            } else {
              show(setshowNotification);
            }
          }
        }

    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown',handleKeydown);

  },[correctLetters,wrongLetters,Playable]);

  function playAgain() {
    setPlayable(true);

    //empty arrays
    setcorrectLetters([]);
    setwrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];

  }

  

  return (
    <>
      <Header />
      <div class="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
         
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} 
      setPlayable={setPlayable} playAgain={playAgain} /> 
      <Notification showNotification={showNotification} />
      
    </>
  );
}

export default App;
