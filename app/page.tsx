"use client";
import { useState, useEffect } from "react";
declare global { interface Window { PaystackPop: any } }
export default function Page() {
  const PAYSTACK_KEY = "pk_test_a09b63ace10c47d0e1113b6bf6c53c97166360c8";
  const MY_NUMBER = "2347076882414";
  const [started, setStarted] = useState(false);
  const [wa, setWa] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [win, setWin] = useState(false);
  const [paying, setPaying] = useState(false);
  useEffect(()=>{ const s=document.createElement("script"); s.src="https://js.paystack.co/v1/inline.js"; s.async=true; document.body.appendChild(s); },[]);
  useEffect(()=>{ if(!started || time<=0) return; const t=setInterval(()=>setTime(x=>x-1),1000); return ()=>clearInterval(t); },[started,time]);
  useEffect(()=>{ if(time===0) setWin(true); },[time]);
  const pay50k = () => {
    if(!window.PaystackPop){ alert("Paystack never load, wait 3 sec"); return; }
    setPaying(true);
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: `customer_${Date.now()}@lagoshustle.com`,
      amount: 50000*100,
      currency: "NGN",
      ref: `LAGOS-${Date.now()}`,
      callback: function(response:any){
        setPaying(false);
        window.location.href=`https://wa.me/${MY_NUMBER}?text=I don pay 50k website Ref:${response.reference}`;
      },
      onClose: function(){ setPaying(false); }
    });
    handler.openIframe();
  };
  if(!started){
    return (<div style={{minHeight:'100vh',background:'#000',color:'#fff',padding:'20px',textAlign:'center'}}><h1 style={{fontSize:'32px'}}>🚐 LAGOS HUSTLE EMPIRE</h1><p>Play, Learn, Win Airtime!</p><div style={{background:'#111',padding:'20px',borderRadius:'10px',marginTop:'20px'}}><p>✅ Real Lagos Business Ideas</p><input value={wa} onChange={(e)=>setWa(e.target.value)} placeholder="Your WhatsApp number" style={{padding:'10px',width:'80%',borderRadius:'5px'}}/><br/><button onClick={()=>wa.length>9&&setStarted(true)} style={{marginTop:'15px',padding:'15px 30px',background:'#0f0',border:'none',borderRadius:'10px',fontSize:'18px'}}>START GAME 🚀</button></div></div>);
  }
  if(win){
    return (<div style={{minHeight:'100vh',background:'#000',color:'#fff',padding:'20px',textAlign:'center'}}><h1>🎉 You scored {score}</h1><div style={{background:'#111',padding:'20px',borderRadius:'10px'}}><a href={`https://wa.me/${MY_NUMBER}?text=I scored ${score} for Lagos Hustle`} style={{color:'#0f0',display:'block',margin:'15px'}}>Claim Airtime on WhatsApp</a><div style={{marginTop:'20px',border:'1px solid #333',padding:'15px'}}><h3>💰 WANNA EARN LIKE ME?</h3><p>Get your own business website for 50k</p><button onClick={pay50k} disabled={paying} style={{padding:'15px 30px',background:'#ff0',color:'#000',border:'none',borderRadius:'10px',fontSize:'18px'}}>{paying?'Loading Paystack...':'Pay ₦50k Now'}</button></div><button onClick={()=>{setTime(30);setWin(false);setScore(0)}} style={{marginTop:'20px',padding:'10px'}}>Play Again</button></div></div>);
  }
  return (<div style={{minHeight:'100vh',background:'#000',color:'#fff',padding:'20px'}}><div style={{display:'flex',justifyContent:'space-between'}}><span>Time: {time}s</span><span>Score: {score}</span></div><div style={{textAlign:'center',marginTop:'50px'}}><h2>🚐 TAP DANFO FAST!</h2><button onClick={()=>setScore(s=>s+50)} style={{fontSize:'80px',background:'none',border:'none'}}>🚐</button><p style={{marginTop:'15px'}}>Each Tap = ₦50 Profit</p></div></div>);
}
