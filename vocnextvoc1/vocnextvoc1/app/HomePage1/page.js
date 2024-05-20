'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import 'bulma/css/bulma.min.css';




function HomePage1() {
  const englishWords = [
    ['Q','L','A','E','O','C','D','S','lace', 'code', 'cola', 'lead', 'case', 'coal', 'deal', 'load', 'seal', 'clad', 'sole', 'also', 'dose', 'cola', 'lace', 'doe', 'sea', 'old', 'ale', 'sad','clod', 'lose', 'soda', 'cola', 'lace', 'lead', 'case', 'seal', 'deal', 'cold', 'sole', 'code', 'dose', 'also', 'cola', 'load', 'ale', 'sad', 'doc', 'sac'],
    ['W','F','R','I','O','X','A','E','wire', 'fox', 'raw', 'wax', 'era', 'war', 'owe', 'axe', 'fear', 'ire', 'ear', 'fix', 'foe', 'row', 'air', 'far', 'awe', 'wear', 'awe', 'rife','max'],

  ];
  
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [vocab, setVocab] = useState("");
  const [currentVoc, setCurrentVoc] = useState("");
  const [remainingLetters ,setRemainingLetters]=useState([]);
  const [selectedWord ,setSelectedWord]=useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [true1, setTrue1] = useState([]);
  const [wrong1, setWrong1] = useState([]); 
  const [gamemode, setGamemode] = useState(0); 
  const [firstAlert, setFirstAlert] = useState("");
  const [appLang, setAppLang] = useState("en");
  const [showNotification1, setShowNotification1] = useState(false);
  const [wordLength, setWordLength] = useState(0);
  const [showNumber, setShowNumber] = useState(false);

  useEffect(() => {
    if (time === 0) {
      setGamemode(0);
      setTime(0);
      setVocab("");
      setCurrentVoc("");
      setRemainingLetters([]);
      setSelectedWord([]);
      setShowNotification(true);
      setFirstAlert("");

      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  }, [time]);
  useEffect(() => {
    if (wordLength > 0) {
      setShowNumber(true);
      const timer = setTimeout(() => {
        setShowNumber(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [wordLength]);

  const handleChange = (e) => {
    setCurrentVoc(e.target.value.toLowerCase());
  };

  const handleSubmit = () => {
    if (currentVoc.trim() !== "") {
      if (remainingLetters.includes(currentVoc)) {
        const wordLength1 = currentVoc.length;
        setWordLength(wordLength1);
        setFirstAlert("+15 sn");
        setTimeout(() => {
          setFirstAlert("");
        }, 2000);
        setScore((prevScore) => prevScore + wordLength1);
        setTime((prevTime) => prevTime + 15);
        setSelectedWord((prevSelectedWord) => [...prevSelectedWord, currentVoc]);
        setRemainingLetters((prevRemainingLetters) => prevRemainingLetters.filter(letter => letter !== currentVoc));
        setCurrentVoc("");
        setTrue1((prevTrue) => [...prevTrue, currentVoc]);
      } else {
        setScore((prevScore) => prevScore - 1);
        setCurrentVoc("");
        setWrong1((prevWrong) => [...prevWrong, currentVoc]);
        
      }
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(); 
    }
  };

  const handleClick = () => {
    alert('Bildirim: Yeni oyun başlatıldı!');
  };
  
  const handleNewGame = () => {
    setWordLength(0);
    setFirstAlert("Time started");
    setTimeout(() => {
      setFirstAlert("");
    }, 2000);
    setGamemode(1);
    setSelectedWord([]);
    const randomIndex=Math.floor(Math.random() * 2);
    setSelectedWord(englishWords[randomIndex]);
    setRemainingLetters(englishWords[randomIndex].slice(8));
    setVocab(englishWords[randomIndex].slice(0, 8));
    setTime(60); 
    setTrue1([]);
    setWrong1([]); 
};


  useEffect(() => {
    let intervalId;
  
    if (gamemode === 1 && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
  
    return () => {
      clearInterval(intervalId);
    };
  }, [gamemode, time]);

  return (
    <main className={styles.main} style={{ backgroundImage: "url('/images/HomePage2.png')", backgroundSize: "cover", width: "100%", height: "100vh" }}>
      <div className={styles.overlay} style={{ display: showNotification ? 'block' : 'none' }}></div>
      <div className={styles.notificationContainer} style={{ display: showNotification ? 'block' : 'none' }}>
        <div className={styles.notification}>
                  TIME IS UP !
          <button className={styles.deleteButton} onClick={() => setShowNotification(false)}>X</button>
        </div>
      </div>


      <div className={styles.section1}>
        <div className={styles.sec1}><div className={styles.alertSc}>{firstAlert}</div><button className={styles.buttonscore}>{time} </button></div>
        <div className={styles.sec}>{vocab}</div>
        <div className={styles.sec1}>
                  {showNumber && (
                      <button className={styles.buttoneight}>+{wordLength}</button>
                  )}
            <button className={styles.buttonwatch}>{score} score</button>
        </div>
      </div>
      <div className={styles.section2}>
              <input
                  className={styles.sec2}
                  value={currentVoc}
                  onChange={gamemode === 1 ? handleChange : () => { }} // gameMode 1 ise handleChange çalışır, değilse hiçbir şey yapmaz
                  onKeyDown={gamemode === 1 ? handleKeyPress : () => { }} // gameMode 1 ise handleKeyPress çalışır, değilse hiçbir şey yapmaz
                  placeholder="???"
                  disabled={gamemode === 0} // gameMode 0 olduğunda input devre dışı bırakılır
              />
              <button
                  className={styles.sec2button}
                  onClick={gamemode === 1 ? handleSubmit : () => { }} // gameMode 1 ise handleSubmit çalışır, değilse hiçbir şey yapmaz
                  disabled={gamemode === 0} // gameMode 0 olduğunda buton devre dışı bırakılır
              >
                  SEND
              </button>
          </div>
      <div className={styles.section3}>
        <div className={styles.wrongArea}>
          {wrong1.map((word, index) => (
            <div key={index} className={styles.wrong1}>{word}</div>
          ))}
        </div>

        <div className={styles.trueArea}>
          {true1.map((word, index) => (
            <div key={index} className={styles.true1}>{word}</div>
          ))}
        </div>
      </div>
      <div className={styles.section4}><button className={styles.playbutton} onClick={handleNewGame}>NEW GAME</button>
      <button className={styles.ruleButton} onClick={() => setShowNotification1(true)}>RULES</button></div>
      {showNotification1 && (
    <div className={styles.notificationContainer1}>
        <div className={styles.notification1}>
            <p>Hello. We want you to generate meaningful words from 8 letters that will appear in the background.</p>
            <ul className={styles.notificationList}>
                <li>Your total time is 60 seconds.</li>
                <li>You will earn points for each word you know the total number of letters.</li>
                <li>You will gain +15 seconds for each word you know.</li>
                <li>You will lose 1 point when you make a mistake or enter the same word again.</li>
                <li>Incorrect and repeated words will appear in the left corner.</li>
                <li>Correct words will appear on the right.</li>
                <li>You can use the ENTER key for faster word entry.</li>
            </ul>
            <button className={styles.deleteButton1} onClick={() => setShowNotification1(false)}>X</button>
        </div>
    </div>
)}

    </main>
  );
}

export default HomePage1;