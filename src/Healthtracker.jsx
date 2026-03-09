import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const MOTIVATIONS = [
  { text: "Drink water and keep your body energized 💧", icon: "💧" },
  { text: "A small walk every day keeps your body strong 🚶", icon: "🚶" },
  { text: "Healthy habits create a healthy life 🌿", icon: "🌿" },
  { text: "Your body is your temple — nourish it well 🏛️", icon: "🏛️" },
  { text: "Small steps lead to big health wins 🎯", icon: "🎯" },
  { text: "Hydration is the key to a glowing you ✨", icon: "✨" },
  { text: "Move more, drink more, live more 🌟", icon: "🌟" },
];

// ─────────────────────────────────────────────────────────────────────────────
// SVG Icons
// ─────────────────────────────────────────────────────────────────────────────
const WaterDropIcon = ({ size = 24, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C12 2 4 9.5 4 14.5C4 18.6 7.6 22 12 22C16.4 22 20 18.6 20 14.5C20 9.5 12 2 12 2Z" />
  </svg>
);

const SunIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="12" cy="12" r="5" />
    {[0,45,90,135,180,225,270,315].map((a, i) => {
      const rad = Math.PI * a / 180;
      return <line key={i} x1={12 + 8*Math.cos(rad)} y1={12 + 8*Math.sin(rad)} x2={12 + 10*Math.cos(rad)} y2={12 + 10*Math.sin(rad)} />;
    })}
  </svg>
);

const MoonIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#a78bfa" stroke="#a78bfa" strokeWidth="1">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const FootIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <ellipse cx="9" cy="6" rx="3" ry="4.5"/>
    <ellipse cx="15.5" cy="8" rx="2.2" ry="3.5"/>
    <path d="M6 13c0 3.5 2.5 8 6.5 8s7.5-3 7.5-7c0-2-1-3.5-3-4.5C15 8.5 12 9 10 11c-1.5 0-4 .5-4 2z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const GearIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Toggle Switch
// ─────────────────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: 48, height: 26, borderRadius: 13, border: "none", cursor: "pointer",
        background: checked ? "linear-gradient(135deg,#60a5fa,#818cf8)" : "#cbd5e1",
        position: "relative", transition: "background .3s", flexShrink: 0,
        boxShadow: checked ? "0 0 10px rgba(99,102,241,.4)" : "none",
      }}
    >
      <span style={{
        position: "absolute", top: 3, left: checked ? 25 : 3,
        width: 20, height: 20, borderRadius: "50%", background: "white",
        transition: "left .3s", boxShadow: "0 2px 6px rgba(0,0,0,.2)",
      }}/>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Settings Modal  (bottom-sheet style)
// ─────────────────────────────────────────────────────────────────────────────
function SettingsModal({ settings, onSave, onClose }) {
  const [localGoal,      setLocalGoal]      = useState(settings.dailyGoal);
  const [localGlass,     setLocalGlass]     = useState(settings.glassSize);
  const [localReminders, setLocalReminders] = useState(settings.remindersOn);

  const goalOptions  = [1500, 2000, 2500, 3000];
  const glassOptions = [150, 200, 250, 300, 350];

  const handleSave = () => {
    onSave({ dailyGoal: localGoal, glassSize: localGlass, remindersOn: localReminders });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(15,23,42,.55)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        animation: "fadeIn .2s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 420,
          background: "white",
          borderRadius: "24px 24px 0 0",
          padding: "0 20px 36px",
          boxShadow: "0 -8px 40px rgba(0,0,0,.2)",
          animation: "slideUp .32s cubic-bezier(.34,1.4,.64,1)",
        }}
      >
        {/* Drag handle */}
        <div style={{ display:"flex", justifyContent:"center", padding:"14px 0 6px" }}>
          <div style={{ width:40, height:4, borderRadius:99, background:"#e2e8f0" }}/>
        </div>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22, marginTop:6 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{
              background: "linear-gradient(135deg,#1d4ed8,#6d28d9)",
              borderRadius: 10, width: 38, height: 38,
              display: "flex", alignItems: "center", justifyContent: "center", color:"white",
            }}>
              <GearIcon />
            </div>
            <div>
              <h2 style={{ margin:0, fontSize:17, fontWeight:800, fontFamily:"Nunito", color:"#1e293b" }}>Settings</h2>
              <p style={{ margin:0, fontSize:11, color:"#94a3b8", fontFamily:"Nunito" }}>Customise your hydration goals</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width:32, height:32, borderRadius:"50%", border:"none",
              background:"#f1f5f9", cursor:"pointer", fontSize:15,
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"#64748b", fontWeight:700, transition:"background .2s",
            }}
          >✕</button>
        </div>

        {/* Daily Water Goal */}
        <p style={{ margin:"0 0 10px", fontSize:13, fontWeight:700, color:"#475569", fontFamily:"Nunito" }}>
          💧 Daily Water Goal
        </p>
        <div style={{ display:"flex", gap:8, marginBottom:20 }}>
          {goalOptions.map(g => (
            <button
              key={g}
              onClick={() => setLocalGoal(g)}
              style={{
                flex:1, padding:"10px 0",
                borderRadius: 12,
                border: `2px solid ${localGoal===g ? "#3b82f6" : "#e2e8f0"}`,
                background: localGoal===g ? "linear-gradient(135deg,#eff6ff,#eef2ff)" : "white",
                color: localGoal===g ? "#1d4ed8" : "#64748b",
                fontSize: 12, fontWeight:700, fontFamily:"Nunito", cursor:"pointer",
                transition:"all .2s",
                boxShadow: localGoal===g ? "0 4px 12px rgba(59,130,246,.2)" : "none",
              }}
            >{g}<br/><span style={{fontSize:10,fontWeight:600}}>ml</span></button>
          ))}
        </div>

        {/* Glass Size */}
        <p style={{ margin:"0 0 10px", fontSize:13, fontWeight:700, color:"#475569", fontFamily:"Nunito" }}>
          🥛 Glass Size
        </p>
        <div style={{ display:"flex", gap:7, marginBottom:22 }}>
          {glassOptions.map(g => (
            <button
              key={g}
              onClick={() => setLocalGlass(g)}
              style={{
                flex:1, padding:"10px 2px",
                borderRadius:12,
                border: `2px solid ${localGlass===g ? "#3b82f6" : "#e2e8f0"}`,
                background: localGlass===g ? "linear-gradient(135deg,#eff6ff,#eef2ff)" : "white",
                color: localGlass===g ? "#1d4ed8" : "#64748b",
                fontSize:11, fontWeight:700, fontFamily:"Nunito", cursor:"pointer",
                transition:"all .2s",
                boxShadow: localGlass===g ? "0 4px 12px rgba(59,130,246,.2)" : "none",
              }}
            >{g}<br/><span style={{fontSize:9,fontWeight:600}}>ml</span></button>
          ))}
        </div>

        {/* Reminders toggle */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          background:"#f8fafc", borderRadius:14, padding:"14px 16px", marginBottom:24,
          border:"1px solid #e2e8f0",
        }}>
          <div>
            <p style={{ margin:0, fontSize:14, fontWeight:700, color:"#1e293b", fontFamily:"Nunito" }}>🔔 Reminders</p>
            <p style={{ margin:0, fontSize:11, color:"#94a3b8", fontFamily:"Nunito" }}>Hydration &amp; walk alerts</p>
          </div>
          <Toggle checked={localReminders} onChange={setLocalReminders}/>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          style={{
            width:"100%", padding:"14px 0", borderRadius:14, border:"none", cursor:"pointer",
            background:"linear-gradient(135deg,#1d4ed8,#6d28d9)",
            color:"white", fontSize:15, fontWeight:800, fontFamily:"Nunito",
            boxShadow:"0 6px 20px rgba(29,78,216,.35)",
            transition:"transform .15s",
          }}
          onMouseDown={e => e.currentTarget.style.transform="scale(.97)"}
          onMouseUp={e   => e.currentTarget.style.transform="scale(1)"}
        >
          ✅ Save Settings
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Welcome Screen
// ─────────────────────────────────────────────────────────────────────────────
function WelcomeScreen({ onDone }) {
  const [phase, setPhase] = useState("in");
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("stay"), 600);
    const t2 = setTimeout(() => setPhase("out"),  2400);
    const t3 = setTimeout(() => onDone(),          3000);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);
  const opacity = phase === "stay" ? 1 : 0;
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:999,
      background:"linear-gradient(135deg,#1e3a8a 0%,#4c1d95 50%,#6d28d9 100%)",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      transition: phase==="out" ? "opacity .6s ease" : "opacity .8s ease",
      opacity: phase==="out" ? 0 : 1,
      overflow:"hidden",
    }}>
      {[
        {size:180,x:"10%",y:"5%",c:"rgba(96,165,250,.15)",d:0},
        {size:120,x:"70%",y:"15%",c:"rgba(167,139,250,.2)",d:.5},
        {size:90,x:"5%",y:"70%",c:"rgba(129,140,248,.15)",d:.8},
        {size:150,x:"65%",y:"65%",c:"rgba(59,130,246,.12)",d:.3},
      ].map((b,i)=>(
        <div key={i} style={{
          position:"absolute", width:b.size, height:b.size, borderRadius:"50%",
          background:b.c, left:b.x, top:b.y,
          animation:`float 4s ease-in-out ${b.d}s infinite alternate`,
        }}/>
      ))}
      <div style={{position:"relative",width:140,height:140,marginBottom:32,transition:"opacity .8s",opacity}}>
        {[{emoji:"💧",angle:0},{emoji:"❤️",angle:72},{emoji:"🌿",angle:144},{emoji:"🏃",angle:216},{emoji:"⭐",angle:288}]
          .map(({emoji,angle},i)=>{
            const rad=Math.PI*angle/180, x=60+55*Math.cos(rad-Math.PI/2), y=60+55*Math.sin(rad-Math.PI/2);
            return (
              <div key={i} style={{
                position:"absolute",left:x,top:y,fontSize:22,
                animation:`orbit ${3+i*.4}s ease-in-out ${i*.2}s infinite alternate`,
                transform:"translate(-50%,-50%)",
              }}>{emoji}</div>
            );
          })}
        <div style={{
          position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",
          fontSize:52,animation:"pulse 1.5s ease-in-out infinite",
        }}>💧</div>
      </div>
      <div style={{textAlign:"center",color:"white",padding:"0 32px",transition:"opacity .8s",opacity}}>
        <p style={{fontSize:26,fontWeight:700,margin:0,lineHeight:1.4,
          textShadow:"0 2px 20px rgba(0,0,0,.3)",fontFamily:"'Nunito',sans-serif",letterSpacing:-.3}}>
          Welcome Dear 👋
        </p>
        <p style={{fontSize:17,margin:"12px 0 0",color:"rgba(255,255,255,.85)",fontFamily:"'Nunito',sans-serif",fontWeight:500}}>
          Stay Healthy &amp; Stay Hydrated 💧
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Water Progress Ring
// ─────────────────────────────────────────────────────────────────────────────
function WaterRing({ pct }) {
  const r = 52, circ = 2 * Math.PI * r;
  return (
    <svg width={130} height={130} viewBox="0 0 130 130">
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa"/>
          <stop offset="100%" stopColor="#818cf8"/>
        </linearGradient>
      </defs>
      <circle cx={65} cy={65} r={r} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth={10}/>
      <circle cx={65} cy={65} r={r} fill="none" stroke="url(#ringGrad)" strokeWidth={10}
        strokeDasharray={circ} strokeDashoffset={circ*(1-pct/100)}
        strokeLinecap="round" transform="rotate(-90 65 65)"
        style={{transition:"stroke-dashoffset .8s cubic-bezier(.4,0,.2,1)"}}/>
      <text x={65} y={60} textAnchor="middle" fill="white" fontSize={22} fontWeight="800" fontFamily="Nunito">
        {Math.round(pct)}%
      </text>
      <text x={65} y={78} textAnchor="middle" fill="rgba(255,255,255,.7)" fontSize={11} fontFamily="Nunito">
        hydrated
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hydration Section
// ─────────────────────────────────────────────────────────────────────────────
function HydrationSection({ consumed, setConsumed, settings, onOpenSettings }) {
  const { dailyGoal: GOAL, glassSize: ML_PER_GLASS } = settings;
  const TOTAL_GLASSES = Math.round(GOAL / ML_PER_GLASS);
  const [animate, setAnimate] = useState(false);
  const glasses = Math.floor(consumed / ML_PER_GLASS);
  const pct = Math.min((consumed / GOAL) * 100, 100);

  const getMessage = () => {
    if (consumed === 0) return "Let's start hydrating! 🌊";
    if (pct < 25)       return "Great start! Keep sipping 💧";
    if (pct < 50)       return "You're doing well! Halfway there 🌊";
    if (pct < 75)       return "Excellent progress! Almost there ⭐";
    if (pct < 100)      return "So close! One more push 🔥";
    return "Goal achieved! Amazing work 🎉";
  };

  const drink = () => {
    if (consumed >= GOAL) return;
    setAnimate(true);
    setConsumed(p => Math.min(p + ML_PER_GLASS, GOAL));
    setTimeout(() => setAnimate(false), 400);
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:14 }}>
        <div style={{ background:"linear-gradient(135deg,#1d4ed8,#4338ca)",borderRadius:10,
          width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <WaterDropIcon size={18}/>
        </div>
        <h2 style={{ fontSize:18,fontWeight:800,color:"#1e293b",fontFamily:"Nunito",margin:0 }}>
          Water Reminder 💧
        </h2>
      </div>

      <div style={{
        background:"linear-gradient(150deg,#1d4ed8 0%,#4338ca 60%,#6d28d9 100%)",
        borderRadius:24, padding:24,
        boxShadow:"0 12px 40px rgba(29,78,216,.35)",
        position:"relative", overflow:"hidden",
      }}>
        {[[80,20,60,.08],[160,140,40,.06],[20,120,30,.07]].map(([l,t,s,o],i)=>(
          <div key={i} style={{position:"absolute",left:l,top:t,width:s,height:s,
            borderRadius:"50%",background:`rgba(255,255,255,${o})`,pointerEvents:"none"}}/>
        ))}

        <div style={{ marginBottom:4, position:"relative" }}>
          <h2 style={{ margin:0,color:"white",fontSize:18,fontWeight:800,fontFamily:"Nunito" }}>
            Water Reminder
          </h2>
          <p style={{ margin:0,color:"rgba(255,255,255,.7)",fontSize:12,fontFamily:"Nunito" }}>
            Goal: {GOAL}ml · Glass: {ML_PER_GLASS}ml · Stay hydrated 💙
          </p>
        </div>

        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",margin:"20px 0 16px" }}>
          <WaterRing pct={pct}/>
          <div style={{ flex:1, marginLeft:20 }}>
            <div style={{ color:"white",fontFamily:"Nunito" }}>
              <div style={{ fontSize:13,color:"rgba(255,255,255,.7)",marginBottom:4 }}>Consumed</div>
              <div style={{ fontSize:30,fontWeight:900,lineHeight:1 }}>
                {consumed}<span style={{ fontSize:14,fontWeight:600 }}> ml</span>
              </div>
              <div style={{ fontSize:13,color:"rgba(255,255,255,.65)" }}>of {GOAL}ml</div>
            </div>
            <div style={{ marginTop:14,color:"white",fontFamily:"Nunito" }}>
              <div style={{ fontSize:12,color:"rgba(255,255,255,.7)",marginBottom:6 }}>
                {glasses} of {TOTAL_GLASSES} glasses
              </div>
              <div style={{ display:"flex",gap:4,flexWrap:"wrap" }}>
                {Array.from({ length: Math.min(TOTAL_GLASSES, 10) }).map((_,i)=>(
                  <div key={i} style={{
                    width:20,height:20,borderRadius:5,
                    background: i<glasses ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.2)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    transition:"background .4s",fontSize:9,
                  }}>
                    {i<glasses && <span style={{ color:"#3b82f6" }}>💧</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ background:"rgba(255,255,255,.2)",borderRadius:99,height:8,marginBottom:8,overflow:"hidden" }}>
          <div style={{
            height:"100%",borderRadius:99,
            background:"linear-gradient(90deg,#bfdbfe,white)",
            width:`${pct}%`,transition:"width .8s cubic-bezier(.4,0,.2,1)",
          }}/>
        </div>
        <p style={{ color:"rgba(255,255,255,.8)",fontSize:12,fontFamily:"Nunito",margin:"0 0 18px",textAlign:"center" }}>
          {getMessage()}
        </p>

        {/* Drink button */}
        <button
          onClick={drink}
          style={{
            width:"100%", padding:"14px 0", borderRadius:14, border:"none", cursor:"pointer",
            background: consumed>=GOAL ? "rgba(255,255,255,.3)" : "white",
            color: consumed>=GOAL ? "rgba(255,255,255,.6)" : "#1d4ed8",
            fontSize:15, fontWeight:800, fontFamily:"Nunito",
            boxShadow:"0 4px 20px rgba(0,0,0,.15)",
            transform: animate ? "scale(.96)" : "scale(1)",
            transition:"transform .2s",
            marginBottom:10,
          }}
        >
          {consumed >= GOAL ? "🎉 Daily Goal Achieved!" : `💧 Drink Water +${ML_PER_GLASS}ml`}
        </button>

        {/* Settings + Reset */}
        <div style={{ display:"flex", gap:10 }}>
          <button
            onClick={onOpenSettings}
            style={{
              flex:1, padding:"11px 0", borderRadius:12,
              border:"1.5px solid rgba(255,255,255,.5)",
              background:"rgba(255,255,255,.18)",
              color:"white", fontSize:13, fontWeight:700, fontFamily:"Nunito",
              cursor:"pointer", transition:"background .2s",
              display:"flex", alignItems:"center", justifyContent:"center", gap:6,
            }}
            onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,.28)"}
            onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,.18)"}
          >
            <GearIcon/> Settings
          </button>
          <button
            onClick={() => setConsumed(0)}
            style={{
              flex:1, padding:"11px 0", borderRadius:12,
              border:"1.5px solid rgba(255,255,255,.5)",
              background:"rgba(255,255,255,.18)",
              color:"white", fontSize:13, fontWeight:700, fontFamily:"Nunito",
              cursor:"pointer", transition:"background .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,.28)"}
            onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,.18)"}
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Morning Walk Card
// ─────────────────────────────────────────────────────────────────────────────
function MorningWalkCard({ onComplete }) {
  const [enabled, setEnabled] = useState(false);
  return (
    <div style={{
      background:"linear-gradient(135deg,#fef3c7 0%,#fde68a 50%,#fbbf24 100%)",
      borderRadius:20, padding:20, marginBottom:16,
      boxShadow:"0 8px 24px rgba(251,191,36,.3)",
      border:"1px solid rgba(255,255,255,.6)",
    }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12 }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ background:"rgba(255,255,255,.6)",borderRadius:12,width:44,height:44,
            display:"flex",alignItems:"center",justifyContent:"center",
            boxShadow:"0 4px 12px rgba(251,191,36,.3)" }}>
            <SunIcon/>
          </div>
          <div>
            <h3 style={{ margin:0,fontSize:17,fontWeight:800,fontFamily:"Nunito",color:"#78350f" }}>Morning Walk</h3>
            <p style={{ margin:0,fontSize:12,color:"#92400e",fontFamily:"Nunito" }}>6:00 AM – 7:00 AM</p>
          </div>
        </div>
        <Toggle checked={enabled} onChange={v => { setEnabled(v); onComplete(v); }}/>
      </div>
      {enabled && (
        <div style={{ display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.5)",
          borderRadius:10,padding:"8px 12px",marginBottom:10,animation:"fadeSlide .3s ease" }}>
          <span style={{ color:"#16a34a",display:"flex" }}><CheckIcon/></span>
          <span style={{ fontSize:12,fontWeight:700,color:"#15803d",fontFamily:"Nunito" }}>Reminder Enabled</span>
        </div>
      )}
      <p style={{ margin:0,fontSize:13,color:"#92400e",fontFamily:"Nunito",lineHeight:1.5 }}>
        ☀️ Start your day with a refreshing walk.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Night Walk Card
// ─────────────────────────────────────────────────────────────────────────────
function NightWalkCard({ onComplete }) {
  const [enabled, setEnabled]   = useState(false);
  const [selected, setSelected] = useState("10:00 PM");
  const times = ["10:00 PM","11:00 PM","12:00 AM"];
  return (
    <div style={{
      background:"linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#4c1d95 100%)",
      borderRadius:20, padding:20, marginBottom:16,
      boxShadow:"0 8px 24px rgba(79,70,229,.35)",
      border:"1px solid rgba(255,255,255,.1)",
    }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12 }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ background:"rgba(255,255,255,.1)",borderRadius:12,width:44,height:44,
            display:"flex",alignItems:"center",justifyContent:"center",
            boxShadow:"0 4px 12px rgba(79,70,229,.4)" }}>
            <MoonIcon/>
          </div>
          <div>
            <h3 style={{ margin:0,fontSize:17,fontWeight:800,fontFamily:"Nunito",color:"white" }}>Night Walk</h3>
            <p style={{ margin:0,fontSize:12,color:"rgba(255,255,255,.6)",fontFamily:"Nunito" }}>Select reminder time</p>
          </div>
        </div>
        <Toggle checked={enabled} onChange={v => { setEnabled(v); onComplete(v ? selected : null); }}/>
      </div>
      <div style={{ display:"flex",gap:8,marginBottom:12 }}>
        {times.map(t => (
          <button key={t} onClick={() => setSelected(t)} style={{
            flex:1, padding:"8px 0", borderRadius:10, border:"none", cursor:"pointer",
            background: selected===t ? "linear-gradient(135deg,#818cf8,#a78bfa)" : "rgba(255,255,255,.1)",
            color: selected===t ? "white" : "rgba(255,255,255,.6)",
            fontSize:11, fontWeight:700, fontFamily:"Nunito",
            boxShadow: selected===t ? "0 4px 12px rgba(129,140,248,.4)" : "none",
            transition:"all .25s",
          }}>{t}</button>
        ))}
      </div>
      {enabled && (
        <div style={{ display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.1)",
          borderRadius:10,padding:"8px 12px",marginBottom:10,animation:"fadeSlide .3s ease" }}>
          <span style={{ color:"#a78bfa",display:"flex" }}><CheckIcon/></span>
          <span style={{ fontSize:12,fontWeight:700,color:"#c4b5fd",fontFamily:"Nunito" }}>
            Reminder set for {selected}
          </span>
        </div>
      )}
      <p style={{ margin:0,fontSize:13,color:"rgba(255,255,255,.7)",fontFamily:"Nunito",lineHeight:1.5 }}>
        🌙 Relax your mind with a peaceful night walk.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Motivation Card
// ─────────────────────────────────────────────────────────────────────────────
const DAILY_MSG = MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)];
function MotivationCard() {
  return (
    <div style={{
      background:"linear-gradient(135deg,#ecfdf5 0%,#d1fae5 50%,#a7f3d0 100%)",
      borderRadius:20, padding:20, marginBottom:16,
      boxShadow:"0 8px 24px rgba(16,185,129,.2)",
      border:"1px solid rgba(255,255,255,.8)",
      animation:"fadeSlide .6s ease",
    }}>
      <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
        <div style={{ fontSize:28 }}>{DAILY_MSG.icon}</div>
        <div>
          <h3 style={{ margin:0,fontSize:15,fontWeight:800,fontFamily:"Nunito",color:"#065f46" }}>Daily Motivation</h3>
          <p style={{ margin:0,fontSize:11,color:"#6ee7b7",fontFamily:"Nunito" }}>Your health mantra for today</p>
        </div>
      </div>
      <p style={{ margin:0,fontSize:14,color:"#047857",fontFamily:"Nunito",lineHeight:1.6,fontWeight:600 }}>
        "{DAILY_MSG.text}"
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Daily Summary
// ─────────────────────────────────────────────────────────────────────────────
function DailySummary({ consumed, goal, morningDone, nightStatus }) {
  const waterPct = Math.min((consumed / goal) * 100, 100);
  return (
    <div style={{
      background:"white", borderRadius:20, padding:20, marginBottom:20,
      boxShadow:"0 8px 24px rgba(0,0,0,.08)",
      border:"1px solid rgba(148,163,184,.15)",
    }}>
      <h3 style={{ margin:"0 0 16px",fontSize:16,fontWeight:800,fontFamily:"Nunito",color:"#1e293b",
        display:"flex",alignItems:"center",gap:8 }}>
        <span>📊</span> Daily Summary
      </h3>
      <div style={{ marginBottom:14 }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6 }}>
          <div style={{ display:"flex",alignItems:"center",gap:6 }}>
            <WaterDropIcon size={16} color="#3b82f6"/>
            <span style={{ fontSize:13,fontWeight:700,fontFamily:"Nunito",color:"#334155" }}>Water Consumed</span>
          </div>
          <span style={{ fontSize:13,fontWeight:700,fontFamily:"Nunito",
            color: waterPct>=100 ? "#16a34a" : "#3b82f6" }}>
            {consumed}ml / {goal}ml
          </span>
        </div>
        <div style={{ background:"#e2e8f0",borderRadius:99,height:8,overflow:"hidden" }}>
          <div style={{ height:"100%",borderRadius:99,width:`${waterPct}%`,
            background:"linear-gradient(90deg,#60a5fa,#818cf8)",
            transition:"width .8s ease" }}/>
        </div>
      </div>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"12px 14px",borderRadius:12,background:"#f8fafc",marginBottom:10 }}>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <SunIcon size={18}/>
          <span style={{ fontSize:13,fontWeight:700,fontFamily:"Nunito",color:"#334155" }}>Morning Walk</span>
        </div>
        <span style={{ fontSize:12,fontWeight:700,fontFamily:"Nunito",padding:"4px 10px",borderRadius:99,
          background: morningDone ? "#dcfce7" : "#fee2e2",
          color: morningDone ? "#16a34a" : "#dc2626" }}>
          {morningDone ? "✅ Completed" : "❌ Not Done"}
        </span>
      </div>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"12px 14px",borderRadius:12,background:"#f8fafc" }}>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <MoonIcon size={18}/>
          <span style={{ fontSize:13,fontWeight:700,fontFamily:"Nunito",color:"#334155" }}>Night Walk</span>
        </div>
        <span style={{ fontSize:12,fontWeight:700,fontFamily:"Nunito",padding:"4px 10px",borderRadius:99,
          background: nightStatus ? "#ede9fe" : "#fef3c7",
          color: nightStatus ? "#7c3aed" : "#d97706" }}>
          {nightStatus ? `🌙 ${nightStatus}` : "⏳ Pending"}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_SETTINGS = { dailyGoal: 2000, glassSize: 250, remindersOn: true };

export default function App() {
  const [showWelcome,  setShowWelcome]  = useState(true);
  const [consumed,     setConsumed]     = useState(0);
  const [morningDone,  setMorningDone]  = useState(false);
  const [nightStatus,  setNightStatus]  = useState(null);
  const [settings,     setSettings]     = useState(DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    // Clamp consumed so it doesn't exceed new goal
    setConsumed(p => Math.min(p, newSettings.dailyGoal));
  };

  return (
    <>
      {/* ── Global CSS ─────────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after {
          box-sizing: border-box; margin: 0; padding: 0;
          -webkit-tap-highlight-color: transparent;
        }
        html { min-height: 100%; }
        body {
          /* CENTERED layout: gradient fills the viewport */
          background: linear-gradient(160deg, #e0f2fe 0%, #ede9fe 50%, #f0fdf4 100%);
          min-height: 100vh;
          font-family: 'Nunito', sans-serif;
          /* Horizontal center */
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        #root {
          width: 100%;
          max-width: 420px;       /* mobile-app width on desktop */
          min-height: 100vh;
          /* subtle lift shadow visible on wide screens */
          box-shadow: 0 0 80px rgba(99, 102, 241, 0.10);
          background: transparent;
        }
        ::-webkit-scrollbar { display: none; }
        @keyframes float     { from{transform:translateY(0) scale(1)}       to{transform:translateY(-20px) scale(1.05)} }
        @keyframes orbit     { from{transform:translate(-50%,-50%) scale(1)} to{transform:translate(-50%,-50%) scale(1.3)} }
        @keyframes pulse     { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.12)} }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
        @keyframes slideUp   { from{transform:translateY(100%)} to{transform:translateY(0)} }
        button:active        { transform: scale(.97) !important; }
      `}</style>

      {/* Welcome */}
      {showWelcome && <WelcomeScreen onDone={() => setShowWelcome(false)}/>}

      {/* Settings modal */}
      {showSettings && (
        <SettingsModal
          settings={settings}
          onSave={handleSaveSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Page */}
      <div style={{
        padding: "20px 16px 40px",
        opacity: showWelcome ? 0 : 1,
        transition: "opacity .5s ease .2s",
      }}>

        {/* Header */}
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",
          marginBottom:20, animation:"fadeSlide .5s ease .3s both" }}>
          <div>
            <p style={{ fontSize:13,color:"#64748b",fontFamily:"Nunito",fontWeight:600 }}>
              {new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}
            </p>
            <h1 style={{ fontSize:22,fontWeight:900,color:"#1e293b",fontFamily:"Nunito",lineHeight:1.1 }}>
              Health Tracker 💪
            </h1>
          </div>
          <div style={{ background:"linear-gradient(135deg,#3b82f6,#818cf8)",borderRadius:16,
            width:48,height:48,display:"flex",alignItems:"center",justifyContent:"center",
            boxShadow:"0 6px 20px rgba(59,130,246,.35)",fontSize:22 }}>
            ❤️
          </div>
        </div>

        {/* Hydration */}
        <div style={{ animation:"fadeSlide .5s ease .4s both" }}>
          <HydrationSection
            consumed={consumed}
            setConsumed={setConsumed}
            settings={settings}
            onOpenSettings={() => setShowSettings(true)}
          />
        </div>

        {/* Walking */}
        <div style={{ animation:"fadeSlide .5s ease .5s both" }}>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:14 }}>
            <div style={{ background:"linear-gradient(135deg,#3b82f6,#818cf8)",borderRadius:10,
              width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",color:"white" }}>
              <FootIcon size={18}/>
            </div>
            <h2 style={{ fontSize:18,fontWeight:800,color:"#1e293b",fontFamily:"Nunito",margin:0 }}>
              Walking Reminder 🚶
            </h2>
          </div>
          <MorningWalkCard onComplete={setMorningDone}/>
          <NightWalkCard   onComplete={setNightStatus}/>
        </div>

        {/* Motivation */}
        <div style={{ animation:"fadeSlide .5s ease .6s both" }}>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:14 }}>
            <div style={{ background:"linear-gradient(135deg,#10b981,#34d399)",borderRadius:10,
              width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>
              🌟
            </div>
            <h2 style={{ fontSize:18,fontWeight:800,color:"#1e293b",fontFamily:"Nunito",margin:0 }}>
              Daily Motivation
            </h2>
          </div>
          <MotivationCard/>
        </div>

        {/* Summary */}
        <div style={{ animation:"fadeSlide .5s ease .7s both" }}>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:14 }}>
            <div style={{ background:"linear-gradient(135deg,#f59e0b,#fbbf24)",borderRadius:10,
              width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>
              📊
            </div>
            <h2 style={{ fontSize:18,fontWeight:800,color:"#1e293b",fontFamily:"Nunito",margin:0 }}>
              Daily Summary
            </h2>
          </div>
          <DailySummary
            consumed={consumed}
            goal={settings.dailyGoal}
            morningDone={morningDone}
            nightStatus={nightStatus}
          />
        </div>

        {/* Footer */}
        <footer style={{
          background:"linear-gradient(135deg,#0f172a 0%,#1e293b 100%)",
          borderRadius:20, padding:"20px 16px", textAlign:"center",
          boxShadow:"0 8px 24px rgba(0,0,0,.15)",
          animation:"fadeSlide .5s ease .8s both",
        }}>
          <p style={{ color:"white",fontSize:14,fontWeight:800,fontFamily:"Nunito",marginBottom:4 }}>
            Built By — Kanak Bari Team
          </p>
          <p style={{ color:"rgba(255,255,255,.5)",fontSize:12,fontFamily:"Nunito",fontWeight:500 }}>
            Stay Healthy, Stay Hydrated 💧
          </p>
        </footer>
      </div>
    </>
  );
}