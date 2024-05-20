'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";


export default function Home() {
  
  const greetings = [
    "MERHABA!",
    "HELLO!",
    "HOLA!",
    "BONJOUR!",
    "HALLO!",
    "CIAO!",
    "नमस्ते!",
    "नमस्कार!",
    "হ্যালো!",
    "مرحبا!",
    "سلام!",
    "こんにちは!",
    "你好!",
    "Привет!",
    "გამარჯობა!",
    "שלום!",
    "ਹੈਲੋ!",
    "OLÁ!",
    "HEJ!",
    "HEI!",
    "HOLA!",
    "ALOHA!",
    "SALUT!",
    "CZEŚĆ!",
    "HOI!",
    "HEI!",
    "LABAS!",
    "SVEIKI!",
    "ПРИВІТ!",
    "MERHABA!"
  ];
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
   // Varsayılan olarak İngilizce (en)
   const [appLang, setAppLang] = useState("");
   const stateData = { appLang };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <main className={styles.main} style={{ backgroundImage: "url('/images/background1.jpg')", backgroundSize: "cover" }}>
  <div className={styles.hello}>{greetings[currentGreetingIndex]} </div>
  <div className={styles.slogan}>DISCOVER ALL VOCABULARIES WITH VOCVOC</div>
  <p className={styles.warningText}>DİKKAT: BU OYUN DEMO BİR OYUNDUR. KELİME HAZNESİ VE BÖLÜM SAYILARI ÇOK AZDIR !!</p> 
  <p className={styles.warningText}>WARNING: THIS IS A DEMO GAME. WORD POOL AND GAME SECTION NUMBERS ARE VERY LIMITED !!</p>

  <div className={styles.langButton}>
  <Link href="/HomePage">
  <button className={styles.button} >TURKİSH</button>
</Link>

    <Link href= "/HomePage1">
      <button className={styles.button} >ENGLISH</button>
    </Link>
   
  </div>
  
</main>


  );
}