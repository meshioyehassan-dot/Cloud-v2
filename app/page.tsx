"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [started, setStarted] = useState(false);
  const [wa, setWa] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (!started || time <= 0) return;
    const t = setInterval(() => setTime((x) => x - 1), 1000);
    return () => clearInterval(t);
  }, [started, time]);

  useEffect(() => {
    if (time === 0) setWin(true);
  }, [time]);

  if (!started) {
    return (
      <div style={{minHeight:'100vh',background:'#000',color:'#fff',padding:'20px',textAlign:'center'}}>
        <h1>🚐 LAGOS HUSTLE EMPIRE</h1>
        <p>Play, Learn, Win Airtime!</p>
        <div style={{background:'#111',padding:'20px',borderRadius:'15px',marginTop:'20px'}}>
          <p>✅ Real Lagos Business Ideas</p>
          <p>✅ Win N1000 Weekly</p>
          <input value={wa} onChange={(e)=>setWa(e.target.value)} placeholder="WhatsApp to play" style={{width:'90%',padding:'15px',borderRadius:'10px',marginTop:'15px',color:'#000'}} />
          <button onClick={()=>wa.length>9&&setStarted(true)} style={{width:'90%',padding:'15px',background:'#00ff88',color:'#000',border:'none',borderRadius:'10px',marginTop:'10px',fontWeight:'bold'}}>START FREE</button>
        </div>
      </div>
    );
  }

  if (win) {
    return (
      <div style={{minHeight:'100vh',background:'#000',color:'#fff',padding:'20px',textAlign:'center'}}>
        <h1>🎉 You scored N{score}</h1>
        <div style={{background:'#111',padding:'20px',borderRadius:'15px'}}>
          <p>Business Idea Unlocked!</p>
          <a href="https://wa.me/2347076882414" style={{display:'block',background:'#00ff88',color:'#000',padding:'15px',borderRadius:'10px',textDecoration:'none',fontWeight:'bold'}}>Get Business Plan PDF</a>
          <div style={{marginTop:'20px',borderTop:'1px solid #333',paddingTop:'20px'}}>
            <h3>💰 WANNA EARN LIKE ME?</h3>
            <p>I build AI game + site for 50k</p>
            <a href="https://wa.me/2347076882414" style={{display:'block',background:'#ffcc00',color:'#000',padding:'15px',borderRadius:'10px',textDecoration:'none',fontWeight:'bold',marginTop:'10px'}}>PAY 50K - BUILD MY OWN</a>
          </div>
          <button onClick={()=>{setTime(30);setWin(false);setScore(0);}} style={{marginTop:'20px',background:'#fff',color:'#000',padding:'10px 20px',borderRadius:'10px'}}>Play Again</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:'100vh',background:'#0a0a0a',color:'#fff',padding:'10px'}}>
      <div style={{display:'flex',justifyContent:'space-between',padding:'10px'}}><span>Lvl 1</span><span>N{score}</span><span>{time}s</span></div>
      <div style={{textAlign:'center',marginTop:'40px'}}>
        <h2>🚐 TAP DANFO FAST!</h2>
        <button onClick={()=>setScore(s=>s+50)} style={{width:'200px',height:'200px',borderRadius:'50%',background:'#ffcc00',fontSize:'60px',border:'none',marginTop:'30px'}}>🚐</button>
        <p>Each Tap = N50</p>
      </div>
    </div>
  );
            }
