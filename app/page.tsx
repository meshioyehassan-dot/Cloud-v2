"use client";
import { useState, useEffect } from "react";
declare global { interface Window { PaystackPop: any; } }
export default function Page() {
  const PAYSTACK_KEY = "pk_test_a09b63ace10c47d0e1113";
  const MY_NUMBER = "2347076882414";
  const [started, setStarted] = useState(false);
  const [wa, setWa] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [win, setWin] = useState(false);
  const [paying, setPaying] = useState(false);
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://js.paystack.co/v1/inline.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);
  useEffect(() => {
    if (!started || time <= 0) return;
    const t = setInterval(() => setTime((x) => x - 1), 1000);
    return () => clearInterval(t);
  }, [started, time]);
  useEffect(() => { if (time === 0) setWin(true); }, [time]);
  const pay50k = () => {
    if (!window.PaystackPop) { alert("Paystack dey load... wait 3 secs try again"); return; }
    setPaying(true);
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: `customer_${Date.now()}@lagoshustle.com`,
      amount: 50000 * 100,
      currency: "NGN",
      ref: `LAGOS-${Date.now()}`,
      callback: function(response: any) {
        setPaying(false);
        window.location.href = `https://wa.me/${MY_NUMBER}?text=CEO%20Mickey%20I%20JUST%20PAID%2050K%20Ref:${response.reference}%20Score:${score}%20WA:${wa}`;
      },
      onClose: function() { setPaying(false); alert("You close am - slot still dey! Click again to pay."); }
    });
    handler.openIframe();
  };
  if (!started) {
    return (
      <div style={{minHeight:'100vh',background:'#000',color:'#fff',padding:'20px',textAlign:'center'}}>
        <h1 style={{fontSize:'32px'}}>🚐 LAGOS HUSTLE EMPIRE</h1>
        <p>Play, Learn, Win Airtime!</p>
        <div style={{background:'#111',padding:'20px',borderRadius:'15px',marginTop:'20px',maxWidth:'400px',margin:'20px auto'}}>
          <p>✅ Real Lagos Business Ideas</p><p>✅ Win N1000 Weekly</p>
          <input value={wa} onChange={(e)=>setWa(e.target.value)} placeholder="Your WhatsApp e.g 07076882414" style={{width:'90%',padding:'15px',borderRadius:'10px',marginTop:'15px',color:'#000'}} />
          <button onClick={()=>wa.length>9&&setStarted(true)} style={{width:'95%',padding:'15px',background:'#00ff88',color:'#000',border:'none',borderRadius:'10px',marginTop:'10px',fontWeight:'bold'}}>START FREE</button>
        </div>
      </div>
    );
  }
  if (win) {
    return (
      <div style={{minHeight:'100vh',background:'#000',color:'#fff',padding:'20px',textAlign:'center'}}>
        <h1>🎉 You scored N{score}</h1>
        <div style={{background:'#111',padding:'20px',borderRadius:'15px',maxWidth:'400px',margin:'10px auto'}}>
          <a href={`https://wa.me/${MY_NUMBER}?text=I%20scored%20${score}%20in%20your%20game`} style={{display:'block',background:'#00ff88',color:'#000',padding:'15px',borderRadius:'10px',textDecoration:'none',fontWeight:'bold',marginTop:'10px'}}>Get Business Plan PDF (FREE)</a>
          <div style={{marginTop:'20px',borderTop:'1px solid #333',paddingTop:'20px'}}>
            <h3>💰 WANNA EARN LIKE ME?</h3><p>I build AI game + site for 50k</p>
            <button onClick={pay50k} disabled={paying} style={{display:'block',width:'100%',background:'#ffcc00',color:'#000',padding:'16px',borderRadius:'10px',fontWeight:'bold',marginTop:'10px',border:'none'}}>{paying ? "Opening Paystack..." : "PAY 50K - BUILD MY OWN NOW"}</button>
          </div>
          <button onClick={()=>{setTime(30);setWin(false);setScore(0);}} style={{marginTop:'20px',background:'#fff',color:'#000',padding:'10px 20px',borderRadius:'10px',border:'none'}}>Play Again</button>
        </div>
      </div>
    );
  }
  return (
    <div style={{minHeight:'100vh',background:'#0a0a0a',color:'#fff',padding:'10px'}}>
      <div style={{display:'flex',justifyContent:'space-between',padding:'10px',fontWeight:'bold'}}><span>Lvl 1</span><span>N{score}</span><span>{time}s</span></div>
      <div style={{textAlign:'center',marginTop:'40px'}}>
        <h2>🚐 TAP DANFO FAST!</h2>
        <button onClick={()=>setScore(s=>s+50)} style={{width:'200px',height:'200px',borderRadius:'50%',background:'#ffcc00',fontSize:'60px',border:'none',marginTop:'30px'}}>🚐</button>
        <p style={{marginTop:'15px'}}>Each Tap = N50</p>
      </div>
    </div>
  );
}
