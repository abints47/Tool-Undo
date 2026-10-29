import FaqItem from "./FaqItem";
import { FAQS } from "@/lib/faqs";

/**
 * Server Component — the section shell and FAQ list are rendered on
 * the server; only each accordion item is a small client island.
 */
export default function Faq() {
  const faqs = FAQS;

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
