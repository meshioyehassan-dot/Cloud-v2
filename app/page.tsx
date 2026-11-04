"use client"
import { useState } from "react"

export default function Page() {
  const [input, setInput] = useState("")
  const [chats, setChats] = useState<{role:string, content:string}[]>([])
  const [load, setLoad] = useState(false)

  async function send(text?: string) {
    const t = text || input
    if(!t) return
    setChats(prev => [...prev, {role:"user", content:t}])
    setInput("")
    setLoad(true)
    try{
      const r = await fetch("/api/chat",{method:"POST",body:JSON.stringify({messages:[{content:t}]})})
      const d = await r.json()
      setChats(c=>[...c,{role:"assistant",content:d.reply}])
    }catch{
      setChats(c=>[...c,{role:"assistant",content:"Network slow, try again CEO."}])
    }
    setLoad(false)
  }

  return (
    <div style={{background:"#050505", color:"#fff", minHeight:"100vh", padding:20, maxWidth:600, margin:"0 auto"}}>
      <h1 style={{fontSize:30, fontWeight:900}}>CLOUD-V2 ☁️</h1>
      <p style={{opacity:0.5, fontSize:14}}>Built by CEO Mickey • Lagos</p>

      <div style={{display:"flex", gap:8, marginTop:20}}>
        <button onClick={()=>send("Abeg explain AI for pidgin")} style={{flex:1, padding:12, borderRadius:10, background:"#1a1a1a", color:"#fff", border:"1px solid #333"}}>Explain AI in pidgin</button>
        <button onClick={()=>send("Give me 3 business ideas for Lagos")} style={{flex:1, padding:12, borderRadius:10, background:"#fff", color:"#000", fontWeight:700}}>Business Ideas</button>
      </div>

      <div style={{marginTop:20, paddingBottom:100}}>
        {chats.map((m,i)=><div key={i} style={{padding:14, margin:"10px 0", borderRadius:12, background: m.role==="user" ? "#111" : "#1c1c1c", border:"1px solid #222"}}>{m.content}</div>)}
        {load && <div style={{opacity:0.5}}>CLOUDRAONE dey think...</div>}
      </div>

      <div style={{position:"fixed", bottom:15, left:15, right:15, maxWidth:570, margin:"0 auto", display:"flex", gap:10}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="What do you need?" style={{flex:1, padding:16, borderRadius:12, background:"#111", border:"1px solid #333", color:"#fff"}}/>
        <button onClick={()=>send()} style={{padding:"0 22px", borderRadius:12, background:"#fff", color:"#000", fontWeight:800}}>Send</button>
      </div>
    </div>
  )
      }
