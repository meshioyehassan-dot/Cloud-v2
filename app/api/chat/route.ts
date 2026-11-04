export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const last = messages[messages.length - 1]?.content?.toLowerCase() || ""
    const original = messages[messages.length - 1]?.content || ""
    let reply = ""
    if (last.includes("business ideas") || last.includes("business")) {
      reply = `CEO Mickey, 3 hot businesses for Lagos right now:\n\n1. Danfo Tracker (CLOUDRAONE App)\nApp wey show where danfo dey for real time for Oshodi, CMS, Yaba. Nigerians go pay N500/month to no waste for bustop.\n\n2. Cold Chain for AI Hussein Line One\nYou dey AI Hussein Line One? Supply cold Zobo, water, and lunch to offices there daily. Na daily alert.\n\n3. CLOUDRAONE Setup Service\nYou just build cloud-v2. Teach other CEOs how to build their own AI for 50k. You be the first for Lagos.`
    } else if (last.includes("pidgin") || last.includes("explain ai")) {
      reply = `How far! AI na computer wey sabi think like human.\n\nImagine danfo driver wey sabi ALL roads for Lagos, even the shortcut wey Google no know. Na wetin AI be. CLOUDRAONE na your own danfo driver for business — e dey for cloud-v2.vercel.app, built by you, CEO Mickey.`
    } else {
      reply = `Na CLOUDRAONE v2 be this! Built clean from scratch by CEO Mickey.\n\nYou talk: "${original}"\n\nI fit help you with business ideas, explain AI for pidgin, or Lagos hustle. Try click "Give me 3 business ideas for Lagos" — e go work now!`
    }
    return new Response(JSON.stringify({ reply }), { headers: { "Content-Type": "application/json" } })
  } catch (e: any) {
    return new Response(JSON.stringify({ reply: "Omo, small glitch, but CLOUDRAONE v2 still dey kampe! Try again." }), { headers: { "Content-Type": "application/json" } })
  }
}
