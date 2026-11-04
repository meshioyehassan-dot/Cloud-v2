"use client";
import { useState, useEffect, useRef } from "react";
declare global { interface Window { PaystackPop: any } }

const PAYSTACK_KEY = "pk_test_a09b63ace10c47d0e1113b6bf6c53c97166360c8";
const MY_NUMBER = "2347076882414";
const GROQ_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || "";

export default function CloudraoneAI() {
  const [messages, setMessages] = useState<{role:string, content:string}[]>([
    {role:"assistant", content:"🚀 I be CLOUDRAONE AI — your Lagos Hustle Empire assistant! I fit: \n\n✅ Give you business ideas wey go make money for Lagos\n✅ Write business plan & calculate profit\n✅ Help you manage your money\n\nWetin you wan make money with today? Or you wan PLAY DANFO DASH GAME to win airtime? 🎮"}
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{ const s=document.createElement("script"); s.src="https://js.paystack.co/v1/inline.js"; s.async=true; document.body.appendChild(s); },[]);
  useEffect(()=>{ chatEndRef.current?.scrollIntoView({behavior:"smooth"}); },[messages]);
  useEffect(()=>{ if(!gameActive || time<=0) return; const t=setInterval(()=>setTime(x=>x-1),1000); return ()=>clearInterval(t); },[gameActive,time]);

  const sendToAI = async () => {
    if(!input.trim()) return;
    const userMsg = {role:"user", content:input};
    setMessages(p=>[...p, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method:"POST",
        headers:{"Content-Type":"application/json","Authorization":`Bearer ${GROQ_KEY}`},
        body: JSON.stringify({
          model:"llama-3.1-8b-instant",
          messages:[
            {role:"system", content:"You are CLOUDRAONE AI, Lagos Hustle Empire assistant. You help Nigerian youth make money. Speak in pidgin + English mix, be sharp, give practical Lagos business ideas. Always end with question to keep them engaged. If they want to play game, tell them to click the GAME button."},
            ...messages, userMsg
          ]
        })
      });
      const data = await res.json();
      const aiReply = data.choices?.[0]?.message?.content || "Wahala dey o! Check your GROQ_API_KEY for Vercel env. But I still dey here — you wan play game? 🎮";
      setMessages(p=>[...p, {role:"assistant", content:aiReply}]);
    } catch(e){
      setMessages(p=>[...p, {role:"assistant", content:"Network slow! But no worry — you fit still play DANFO DASH GAME to win airtime! Click GAME button 🚐"}]);
    }
    setLoading(false);
  };

  const pay50k = () => {
    if(!window.PaystackPop){ alert("Paystack never load, wait 3 sec"); return; }
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: `customer_${Date.now()}@lagoshustle.com`,
      amount: 50000*100,
      currency: "NGN",
      ref: `CLOUDRAONE-${Date.now()}`,
      callback: function(r:any){ window.location.href=`https://wa.me/${MY_NUMBER}?text=I don pay 50k website Ref:${r.reference} - I need my business website now!`; },
      onClose: function(){}
    });
    handler.openIframe();
  };

  return (
    <div style={{minHeight:'100vh', background:'#000', color:'#fff', display:'flex', flexDirection:'column'}}>
      <header style={{padding:'15px', borderBottom:'1px solid #222', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1 style={{fontSize:'20px'}}>☁️ CLOUDRAONE AI</h1>
        <div style={{display:'flex', gap:'10px'}}>
          <button onClick={()=>setShowGame(true)} style={{padding:'8px 15px', background:'#ff0', color:'#000', borderRadius:'20px', border:'none', fontWeight:'bold'}}>🎮 PLAY GAME</button>
          <button onClick={pay50k} style={{padding:'8px 15px', background:'#0f0', color:'#000', borderRadius:'20px', border:'none', fontWeight:'bold'}}>💰 GET WEBSITE 50K</button>
        </div>
      </header>

      <div style={{flex:1, overflowY:'auto', padding:'20px'}}>
        {messages.map((m,i)=>(
          <div key={i} style={{marginBottom:'15px', background: m.role==='user'?'#111':'#0a0a0a', padding:'15px', borderRadius:'10px', borderLeft: m.role==='assistant'?'3px solid #0f0':'none'}}>
            <p style={{whiteSpace:'pre-wrap', lineHeight:'1.6'}}>{m.content}</p>
          </div>
        ))}
        {loading && <p style={{color:'#0f0'}}>CLOUDRAONE dey think... 🤔</p>}
        <div ref={chatEndRef}/>
      </div>

      <div style={{padding:'15px', borderTop:'1px solid #222', display:'flex', gap:'10px'}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendToAI()} placeholder="Ask CLOUDRAONE: How I fit make 100k for Lagos?" style={{flex:1, padding:'15px', borderRadius:'25px', background:'#111', border:'1px solid #333', color:'#fff'}}/>
        <button onClick={sendToAI} style={{padding:'15px 25px', background:'#0f0', color:'#000', borderRadius:'25px', border:'none', fontWeight:'bold'}}>SEND</button>
      </div>

      {showGame && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}>
          <div style={{background:'#111', padding:'30px', borderRadius:'15px', textAlign:'center', width:'100%', maxWidth:'400px', border:'1px solid #333'}}>
            <h2>🚐 DANFO DASH - WIN AIRTIME!</h2>
            {!gameActive && time===30 ? (
              <>
                <p style={{margin:'20px 0'}}>Tap Danfo as fast as you can in 30 sec!</p>
                <p>Score 1000 = Win Airtime!</p>
                <button onClick={()=>{setGameActive(true); setScore(0); setTime(30);}} style={{padding:'15px 30px', background:'#0f0', border:'none', borderRadius:'10px', fontSize:'18px', marginTop:'20px'}}>START! 🚀</button>
              </>
            ) : time>0 ? (
              <>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px'}}><span>Time: {time}</span><span>Score: {score}</span></div>
                <button onClick={()=>setScore(s=>s+50)} style={{fontSize:'80px', background:'none', border:'none', cursor:'pointer'}}>🚐</button>
                <p>Tap! Tap! Tap!</p>
              </>
            ) : (
              <>
                <h3>Game Over! Score: {score}</h3>
                <a href={`https://wa.me/${MY_NUMBER}?text=I scored ${score} for DANFO DASH - I need my airtime!`} style={{display:'block', background:'#25D366', color:'#fff', padding:'15px', borderRadius:'10px', textDecoration:'none', margin:'15px 0'}}>Claim Airtime on WhatsApp</a>
                <div style={{borderTop:'1px solid #333', marginTop:'20px', paddingTop:'20px'}}>
                  <p>🔥 You like this game?</p><p>I fit build your own for 50k!</p>
                  <button onClick={pay50k} style={{padding:'15px 30px', background:'#ff0', color:'#000', border:'none', borderRadius:'10px', fontWeight:'bold', width:'100%', marginTop:'10px'}}>PAY ₦50K NOW</button>
                </div>
                <button onClick={()=>{setShowGame(false); setTime(30);}} style={{marginTop:'20px', background:'none', border:'1px solid #333', color:'#fff', padding:'10px 20px', borderRadius:'10px'}}>Close & Chat with AI</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
