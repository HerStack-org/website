import { useState } from "react";

const faqs = [
  {
    question: "Is HerStack completely free?",
    answer: "Yes! HerStack is 100% free for all school girls and young women across India. Our mission is to make AI education accessible to everyone, regardless of financial background."
  },
  {
    question: "Do I need prior coding experience to join?",
    answer: "Not at all! HerStack is designed for complete beginners. We start from the very basics and guide you step by step through your AI learning journey."
  },
  {
    question: "How do I find and connect with a mentor?",
    answer: "Once you join HerStack, you can browse our mentor directory and connect with experienced women in AI and tech who volunteer their time to guide learners like you."
  },
  {
    question: "What is the Summer of AI program?",
    answer: "Summer of AI is HerStack's flagship program where selected participants get intensive AI training, mentorship, and hands-on project experience over the summer months."
  },
  {
    question: "Who can join HerStack?",
    answer: "HerStack is open to all school girls and young women across India who are curious about AI and technology. No prior experience is needed — just bring your curiosity!"
  },
  {
    question: "How can I contribute to HerStack?",
    answer: "HerStack is open source! You can contribute by improving the platform, creating learning content, mentoring others, or spreading the word in your community."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6" style={{ background: 'var(--cream)' }} id="faq">
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--purple)' }}>
          Got Questions?
        </p>
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12" style={{ color: 'var(--ink)' }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl overflow-hidden"
              style={{ borderColor: 'var(--border)' }}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-200"
                style={{ background: 'var(--cream)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--cream-dark)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--cream)'}
              >
                <span className="font-semibold text-base" style={{ color: 'var(--ink)' }}>
                  {faq.question}
                </span>
                <span className="text-xl font-bold ml-4" style={{ color: 'var(--purple)' }}>
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 text-sm leading-relaxed border-t" style={{ background: 'var(--cream-dark)', color: 'var(--ink-soft)', borderColor: 'var(--border)' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}