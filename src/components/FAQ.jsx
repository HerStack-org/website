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
    <section className="py-20 px-6 bg-white" id="faq">
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-sm font-semibold text-purple-600 uppercase tracking-widest mb-3">
          Got Questions?
        </p>
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-purple-50 transition-colors duration-200"
              >
                <span className="font-semibold text-gray-800 text-base">
                  {faq.question}
                </span>
                <span className="text-purple-600 text-xl font-bold ml-4">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-purple-50 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
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