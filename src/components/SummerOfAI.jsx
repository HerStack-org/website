import { useEffect, useState } from "react";

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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showModal) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [showModal]);

  return (
    <section
      id="summer"
      className="py-24 px-16 relative overflow-hidden"
      style={{ background: "var(--purple)" }}
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
          <p
            className="text-lg leading-relaxed font-light mb-8"
            style={{ color: "rgba(255,255,255,0.75)", maxWidth: 480 }}
          >
            An open source program where girls contribute to real AI projects,
            get mentored by women in the industry, and earn a certificate
            that actually means something.
          </p>
          <button
            onClick={() => setShowModal(true)}
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

          {showModal && (
            <div
              className="fixed inset-x-0 bottom-0 top-16 bg-black bg-opacity-50 flex items-center justify-center z-50"
              role="dialog"
              aria-modal="true"
              aria-label="Waitlist form"
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowModal(false);
              }}
            >
              <div className="bg-white p-3 rounded-2xl w-[90%] max-w-3xl relative max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-3 text-xl"
                  aria-label="Close waitlist form"
                >
                  ✕
                </button>
                {/*
                  NOTE: forms.gle is a short redirect link and Google blocks
                  framing on that redirect (X-Frame-Options), so it will not
                  render inside an iframe. Use the actual embed URL instead:
                  https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true
                */}
                <iframe
                  src="https://docs.google.com/forms/d/e/REPLACE_WITH_FORM_ID/viewform?embedded=true"
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
        <div className="flex flex-col gap-5">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                p-6
                flex
                items-start
                gap-5
                backdrop-blur-xl
                transition-all
                duration-500
                cursor-pointer
                hover:-translate-y-2
                hover:scale-[1.02]
              "
              style={{
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 20px 50px rgba(124,58,237,.35)";
                e.currentTarget.style.borderColor = "rgba(216,180,254,.6)";
                e.currentTarget.style.background = "rgba(255,255,255,0.14)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.background = "rgba(255,255,255,0.10)";
              }}
            >
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,.08), rgba(255,255,255,.02), rgba(168,85,247,.15))",
                }}
              />

              {/* Glow */}
              <div
                className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "rgba(168,85,247,.25)",
                }}
              />

              {/* Content */}
              <div className="relative flex items-start gap-5 w-full">
                {/* Icon */}
                <div
                  className="
                    h-14
                    w-14
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    text-2xl
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:rotate-6
                  "
                  style={{
                    background: "rgba(255,255,255,.08)",
                  }}
                >
                  {icon}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h4
                    className="
                      font-display
                      font-bold
                      text-lg
                      mb-2
                      transition-colors
                      duration-300
                      group-hover:text-white
                    "
                    style={{ color: "white" }}
                  >
                    {title}
                  </h4>

                  <p
                    className="
                      text-sm
                      leading-relaxed
                      transition-colors
                      duration-300
                      group-hover:text-white/90
                    "
                    style={{ color: "rgba(255,255,255,.65)" }}
                  >
                    {description}
                  </p>
                </div>

                {/* Arrow */}
                <div
                  className="
                    text-xl
                    text-white/40
                    transition-all
                    duration-300
                    group-hover:translate-x-2
                    group-hover:text-white
                  "
                >
                  →
                </div>
              </div>

              {/* Bottom Border Animation */}
              <div
                className="
                  absolute
                  left-0
                  bottom-0
                  h-[3px]
                  w-0
                  transition-all
                  duration-500
                  group-hover:w-full
                "
                style={{
                  background: "linear-gradient(90deg,#ffffff,#d8b4fe,#ffffff)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}