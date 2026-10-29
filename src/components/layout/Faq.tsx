import FaqItem from "./FaqItem";

/**
 * Server Component — the section shell and FAQ list are rendered on
 * the server; only each accordion item is a small client island.
 */
export default function Faq() {
  const faqs = [
    {
      question: "Why is there Malayalam slang used on the developer site?",
      answer:
        "Chumma oru rasathinu! It adds a fun Kerala touch for developers who might otherwise get bored reading serious technical English content all the time.",
    },
    {
      question: "Is this really free? Are there any hidden costs?",
      answer:
        "Athe machane, ithu 100% free aanu! Since all tools execute client-side right in your browser, cloud processing server-inu extra charges onnum kodukkan venda.",
    },
    {
      question: "Will my images and input files leak? Is it secure?",
      answer:
        "Oru kuzhappavum illa ji! Your files are never uploaded to any remote server. Ellam ninte device-il thanne browser Canvas-um JavaScript APIs-um use cheythu locally aanu nadakkunnath. You can even use it completely offline!",
    },
    {
      question: "Can I suggest custom features or new tools?",
      answer:
        "Theerchayayum! Just click the 'Suggest a Tool' button on the dashboard and share your idea. Community requests anusarichu njangal regular aayi puthiya utilities build cheyyunnundu.",
    },
    {
      question: "Is the source code open to the public?",
      answer:
        "Theerchayayum, code nokkiyal ninte ullil oru dev unarum! The project is fully open-source. You can check out the GitHub repo, fork it, fix bugs, or add your own features, machane!",
    },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto py-10 px-4 scroll-mt-20">
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-zinc-500">
          Common questions about privacy, architecture, and features.
        </p>
      </div>

      <div className="flex flex-col">
        {faqs.map((faq, index) => (
          <FaqItem key={index} {...faq} />
        ))}
      </div>
    </section>
  );
}
