import { useMemo, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getConceptBySlug } from "../data/conceptData";

function extractYouTubeId(url = "") {
  // handles youtu.be/ID, watch?v=ID, embed/ID
  const patterns = [
    /youtu\.be\/([^?&#]+)/,
    /[?&]v=([^?&#]+)/,
    /embed\/([^?&#]+)/,
    /youtube\.com\/shorts\/([^?&#]+)/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

function getTypeIcon(type) {
  switch (type) {
    case "video": return "🎥";
    case "github": return "💻";
    case "docs": return "📚";
    case "article": return "📖";
    default: return "🔗";
  }
}

function getTypeLabel(type) {
  switch (type) {
    case "video": return "Video";
    case "github": return "GitHub";
    case "docs": return "Docs";
    case "article": return "Article";
    default: return "Link";
  }
}

const DIFFICULTY_CHIP = {
  intermediate: { bg: "rgba(0,201,167,0.18)", border: "rgba(0,201,167,0.35)" },
  advanced: { bg: "rgba(245,166,35,0.18)", border: "rgba(245,166,35,0.35)" },
  beginner: { bg: "rgba(123,92,240,0.18)", border: "rgba(123,92,240,0.35)" },
};

//progresshook 

function useProgress(slug) {
  const key = `concept-done-${slug}`;
  const [done, setDone] = useState(() => {
    try { return localStorage.getItem(key) === "1"; } catch { return false; }
  });
  const toggle = () => setDone((prev) => {
    const next = !prev;
    try { next ? localStorage.setItem(key, "1") : localStorage.removeItem(key); } catch { }
    return next;
  });
  return [done, toggle];
}

//videoplayer 

function YouTubeVideoPlayer({ url, title }) {
  const id = extractYouTubeId(url);
  if (!id) return null;
  return (
    <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#000" }}>
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
        <iframe
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

// resource card

function LearningResourceCard({ resource }) {
  const [expanded, setExpanded] = useState(false);
  const isVideo = resource.type === "video";
  const hasEmbed = isVideo && !!extractYouTubeId(resource.url);

  return (
    <div
      style={{
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.03)",
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(168,85,247,0.4)"}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
    >

      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "20px 24px" }}>

        <div
          style={{
            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
            background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2))",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
          }}
        >
          {getTypeIcon(resource.type)}
        </div>

  
        <div style={{ flex: 1, minWidth: 0 }}>
          //badges
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
            <TypeBadge type={resource.type} />
            {resource.difficulty && <MetaBadge label={resource.difficulty} />}
            {resource.free && <MetaBadge label="Free" accent />}
            {resource.hasCert && <MetaBadge label="Certificate" />}
          </div>

          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "white", lineHeight: 1.35 }}>
            {resource.title}
          </h3>

          {resource.meta && (
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              {resource.meta}
            </p>
          )}
        </div>


        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          {hasEmbed && (
            <button
              onClick={() => setExpanded((v) => !v)}
              style={{
                background: expanded
                  ? "rgba(168,85,247,0.25)"
                  : "rgba(255,255,255,0.06)",
                border: `1px solid ${expanded
                    ? "rgba(168,85,247,0.5)"
                    : "rgba(255,255,255,0.15)"
                  }`,
                borderRadius: 10,
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 600,
                color: expanded
                  ? "rgba(216,180,254,1)"
                  : "rgba(255,255,255,0.8)",
                cursor: "pointer",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
              }}
            >
              {expanded ? "▲ Hide" : "▶ Watch"}
            </button>
          )}

          <a
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              borderRadius: 999,
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(255,255,255,0.9)",
              background: "rgba(168,85,247,0.12)",
              border: "1px solid rgba(168,85,247,0.22)",
              transition: "all 0.18s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(168,85,247,0.18)";
              e.currentTarget.style.borderColor =
                "rgba(168,85,247,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "rgba(168,85,247,0.12)";
              e.currentTarget.style.borderColor =
                "rgba(168,85,247,0.22)";
            }}
          >
            Learn

            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.08)",
              }}
            >
              <FaArrowRight
                style={{
                  fontSize: "9px",
                  color: "rgba(255,255,255,0.9)",
                }}
              />
            </div>
          </a>
        </div>
      </div>

      {/* inline video player */}
      {hasEmbed && expanded && (
        <div style={{ padding: "0 24px 24px" }}>
          <YouTubeVideoPlayer url={resource.url} title={resource.title} />
        </div>
      )}
    </div>
  );
}

function TypeBadge({ type }) {
  const colors = {
    video: { bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.35)", color: "rgba(252,165,165,1)" },
    github: { bg: "rgba(55,65,81,0.4)", border: "rgba(156,163,175,0.3)", color: "rgba(209,213,219,1)" },
    docs: { bg: "rgba(14,165,233,0.15)", border: "rgba(14,165,233,0.35)", color: "rgba(125,211,252,1)" },
    article: { bg: "rgba(234,179,8,0.15)", border: "rgba(234,179,8,0.35)", color: "rgba(253,224,71,1)" },
  };
  const s = colors[type] ?? { bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" };
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
      padding: "3px 10px", borderRadius: 99, background: s.bg, border: `1px solid ${s.border}`, color: s.color,
    }}>
      {getTypeLabel(type)}
    </span>
  );
}

function MetaBadge({ label, accent }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
      padding: "3px 10px", borderRadius: 99,
      background: accent ? "rgba(0,201,167,0.15)" : "rgba(255,255,255,0.07)",
      border: `1px solid ${accent ? "rgba(0,201,167,0.35)" : "rgba(255,255,255,0.12)"}`,
      color: accent ? "rgba(52,211,153,1)" : "rgba(255,255,255,0.6)",
    }}>
      {label}
    </span>
  );
}

//filter pills

function FilterPills({ options, active, onChange }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
      {["all", ...options].map((t) => {
        const isActive = active === t;
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            style={{
              padding: "8px 18px", borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: "pointer",
              border: `1px solid ${isActive ? "rgba(168,85,247,0.6)" : "rgba(255,255,255,0.15)"}`,
              background: isActive ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.04)",
              color: isActive ? "rgba(216,180,254,1)" : "rgba(255,255,255,0.7)",
              transition: "all 0.15s",
              textTransform: "capitalize",
            }}
          >
            {t === "all" ? "All" : getTypeLabel(t)}
          </button>
        );
      })}
    </div>
  );
}

// stat pill

function StatPill({ label, value }) {
  return (
    <div style={{
      padding: "12px 20px", borderRadius: 16,
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    }}>
      <div style={{ color: "white", fontSize: 18, fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{label}</div>
    </div>
  );
}



export default function ConceptPage() {
  const { slug } = useParams();
  const concept = getConceptBySlug(slug);
  const [done, toggleDone] = useProgress(slug);

  if (!concept) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, color: "white", background: '#0D0D0D' }}>
        <p style={{ fontSize: 18 }}>Concept not found</p>
        <Link to="/concepts" style={{ borderRadius: 99, border: "1px solid rgba(255,255,255,0.2)", padding: "8px 20px", fontSize: 14, color: "white", textDecoration: "none" }}>
          ← Back to all concepts
        </Link>
      </div>
    );
  }

  const featuredId = concept.featuredVideo?.youtubeId;
  const rawResources = useMemo(() => {
    if (!featuredId) return concept.resources;
    return concept.resources.filter((r) => {
      const rid = extractYouTubeId(r.url);
      return rid !== featuredId;
    });
  }, [concept.resources, featuredId]);

  const resourceTypes = useMemo(() => {
    const set = new Set(rawResources.map((r) => r.type).filter(Boolean));
    return Array.from(set);
  }, [rawResources]);

  const [resourceType, setResourceType] = useState("all");
  const filteredResources = useMemo(() => {
    if (resourceType === "all") return rawResources;
    return rawResources.filter((r) => r.type === resourceType);
  }, [rawResources, resourceType]);

  const videoCount = rawResources.filter((r) => r.type === "video").length;
  const diffKey = (concept.difficulty || "").toLowerCase();
  const chip = DIFFICULTY_CHIP[diffKey] ?? DIFFICULTY_CHIP.beginner;

  return (
    <main style={{ minHeight: "100vh", background: '#0D0D0D' }}>


      <section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.9,
          background: concept.gradient || "linear-gradient(135deg, rgba(124,58,237,0.45), rgba(6,182,212,0.35))",
        }} />

        <div style={{ position: "relative", maxWidth: 1152, margin: "0 auto", padding: "96px 24px 80px" }}>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
            {concept.status && (
              <span style={{
                padding: "8px 16px", borderRadius: 99, fontSize: 11, fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.85)",
              }}>
                {String(concept.status).replace("-", " ")}
              </span>
            )}
            <span style={{
              padding: "8px 16px", borderRadius: 99, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              background: chip.bg, border: `1px solid ${chip.border}`, color: "rgba(255,255,255,0.9)",
            }}>
              {concept.difficulty}
            </span>
          </div>

          <div style={{ fontSize: 80, marginTop: 32 }}>{concept.icon}</div>

          <h1 style={{
            marginTop: 24, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.04em",
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)", color: "white",
          }}>
            {concept.title}
          </h1>

          <p style={{ marginTop: 24, maxWidth: 680, fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.6)" }}>
            {concept.description}
          </p>

          {/* stat pills + mark done */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginTop: 36 }}>
            <StatPill label="Resources" value={rawResources.length} />
            <StatPill label="Videos" value={videoCount} />
            {concept.estimatedTime && <StatPill label="Learning Time" value={concept.estimatedTime} />}

            <button
              onClick={toggleDone}
              style={{
                marginLeft: "auto", padding: "12px 24px", borderRadius: 99, fontSize: 14,
                fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                background: done ? "rgba(0,201,167,0.25)" : "rgba(255,255,255,0.07)",
                border: `1px solid ${done ? "rgba(0,201,167,0.5)" : "rgba(255,255,255,0.2)"}`,
                color: done ? "rgba(52,211,153,1)" : "rgba(255,255,255,0.75)",
              }}
            >
              {done ? "✓ Completed" : "Mark as complete"}
            </button>
          </div>
        </div>
      </section>

      //StoryBoard
      <section style={{ maxWidth: 1152, margin: "0 auto", padding: "80px 24px" }}>
        <SectionLabel>Visual Storyboard</SectionLabel>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: "white", margin: "12px 0 40px" }}>
          Understanding the Concept
        </h2>

        {concept.storyboard.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, position: "relative" }}>
            {concept.storyboard.map((step, i) => (
              <div key={step.title} style={{ position: "relative" }}>
                {/* connector line */}
                {i < concept.storyboard.length - 1 && (
                  <div style={{
                    display: "none", // shown via CSS at md+ if you have responsive setup
                    position: "absolute", right: -10, top: "50%",
                    transform: "translateY(-50%)",
                    width: 20, height: 2,
                    background: "linear-gradient(90deg, rgba(168,85,247,0.5), rgba(6,182,212,0.5))",
                    zIndex: 1,
                  }} />
                )}
                <div style={{
                  borderRadius: 24, padding: 32,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.03)",
                  height: "100%",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = ""; }}
                >
                  {/* step number */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: 36, height: 36, borderRadius: 10,
                    background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.4)",
                    fontSize: 15, fontWeight: 700, color: "rgba(216,180,254,1)", marginBottom: 16,
                  }}>
                    {i + 1}
                  </div>

                  <h3 style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 700, color: "white" }}>
                    {step.title}
                  </h3>

                  <p style={{ margin: 0, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontSize: 15 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            borderRadius: 24, border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.03)", padding: 48, textAlign: "center",
          }}>
            <p style={{ fontSize: 22, fontWeight: 700, color: "white", margin: "0 0 12px" }}>Visual explainer coming soon</p>
            <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.7 }}>
              We're building the step-by-step storyboard for this concept. Check back soon or browse other concepts.
            </p>
            <Link to="/concepts" style={{
              display: "inline-block", borderRadius: 99, border: "1px solid rgba(255,255,255,0.2)",
              padding: "12px 24px", fontSize: 14, color: "white", textDecoration: "none",
            }}>
              Browse all concepts
            </Link>
          </div>
        )}
      </section>

     //Featured video
      {concept.featuredVideo && (
        <section style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px 80px" }}>
          <SectionLabel>Featured Lesson</SectionLabel>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: "white", margin: "12px 0 32px" }}>
            Watch &amp; Learn
          </h2>

          <div style={{ borderRadius: 28, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", overflow: "hidden" }}>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#000" }}>
              <iframe
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                src={`https://www.youtube.com/embed/${concept.featuredVideo.youtubeId}`}
                title={concept.featuredVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div style={{ padding: "28px 32px" }}>
              <h3 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, color: "white" }}>
                {concept.featuredVideo.title}
              </h3>
              {concept.featuredVideo.description && (
                <p style={{ margin: 0, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                  {concept.featuredVideo.description}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      //Resources
      {rawResources.length > 0 && (
        <section style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px 80px" }}>
          <SectionLabel>Continue Learning</SectionLabel>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: "white", margin: "12px 0 32px" }}>
            Curated Resources
          </h2>

          {resourceTypes.length > 1 && (
            <FilterPills
              options={resourceTypes}
              active={resourceType}
              onChange={setResourceType}
            />
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filteredResources.map((resource) => (
              <LearningResourceCard key={resource.title + resource.url} resource={resource} />
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div style={{ textAlign: "center", padding: 48, color: "rgba(255,255,255,0.4)", fontSize: 15 }}>
              No {resourceType} resources for this concept yet.
            </div>
          )}
        </section>
      )}

      //next concepts
      {concept.nextConcepts?.length > 0 && (
        <section style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px 96px" }}>
          <SectionLabel>Continue Your Journey</SectionLabel>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: "white", margin: "12px 0 32px" }}>
            Learn Next
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {concept.nextConcepts.map((next) => (
              <Link
                key={next.title}
                to={next.slug ? `/concepts/${next.slug}` : "/concepts"}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    borderRadius: 24, padding: 32,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                    transition: "border-color 0.2s, transform 0.2s",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = ""; }}
                >
                  <div style={{ fontSize: 44, marginBottom: 20 }}>{next.icon}</div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, color: "white" }}>
                    {next.title}
                  </h3>
                  <p style={{ margin: 0, color: "rgba(255,255,255,0.45)", fontSize: 14, fontWeight: 500 }}>
                    {next.difficulty}
                  </p>
                  {next.reason && (
                    <p style={{ margin: "10px 0 0", color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.6 }}>
                      {next.reason}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

// tiny section label 

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase",
      color: "rgba(255,255,255,0.3)", fontWeight: 600,
    }}>
      {children}
    </div>
  );
}