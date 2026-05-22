import { useState } from "react";

const features = [
  {
    icon: "💻",
    title: "Contribute to Real Projects",
    description:
      "Work on open source AI tools that girls across India actually use. Your name on real commits.",
  },
  {
    icon: "👩‍💼",
    title: "1:1 Mentorship",
    description:
      "Get paired with a woman working in AI. Weekly check-ins, career guidance, real talk.",
  },
  {
    icon: "🏆",
    title: "Certificate & Recognition",
    description:
      "A credential that shows what you built — not just what you watched. Goes straight on your resume.",
  },
  {
    icon: "🌐",
    title: "Pan-India Community",
    description:
      "Connect with girls building AI from every state. Your future co-founders are here.",
  },
];



export default function SummerOfAI() {
  const [btn, SetBtn] = useState(false);
  return (
    <section
      id="summer"
      className="py-24 px-16 relative overflow-hidden"
      style={{ background: 'var(--purple)' }}
    >
      {/* Big background year text */}
      <div
        className="absolute font-display font-bold pointer-events-none select-none"
        style={{
          fontSize: "20vw",
          color: "rgba(255,255,255,0.06)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
          letterSpacing: "-0.04em",
        }}
      >
        2026
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        {/* Left */}
        <div>
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Coming 2026
          </div>
          <h2
            className="font-display font-bold leading-tight mb-5"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.03em",
              color: "white",
            }}
          >
            HerStack
            <br />
            Summer of AI
          </h2>
          <p className="text-lg leading-relaxed font-light mb-8" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 480 }}>
            An open source program where girls contribute to real AI projects, get mentored by women in the industry, and earn a certificate that actually means something.
          </p>
          <button
            onClick={() => SetBtn(true)}
            className="inline-flex items-center gap-2 font-semibold no-underline px-8 py-3.5 rounded-full transition-all duration-200"
            style={{ background: "white", color: "var(--purple)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Join the waitlist →
          </button>
          {btn && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-3 rounded-2xl w-[90%] max-w-3xl relative">
                <button
                  onClick={() => SetBtn(false)}
                  className="absolute top-2 right-3 text-xl"
                >
                  ✕
                </button>
                <iframe
                  src="https://forms.gle/PzBBynQs9WtCGByv6"
                  width="100%"
                  height="600"
                  style={{ border: "none" }}
                  title="Waitlist Form"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right: Feature cards */}
        <div className="flex flex-col gap-4">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-xl p-5"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <span className="text-2xl flex-shrink-0">{icon}</span>
              <div>
                <h4 className="font-display font-bold text-sm mb-1" style={{ color: 'white' }}>{title}</h4>
                <p className="text-xs leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.65)' }}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
