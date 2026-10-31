import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Download, FileText } from "lucide-react";
import { Button } from "./ui/button";

type CvOption = {
  title: string;
  description: string;
  file: string;
};

// PDFs live in public/cv/; paths are resolved against the Vite base so they work under /InteractiveCV/.
const CV_OPTIONS: CvOption[] = [
  {
    title: "React / TypeScript CV",
    description: "Frontend development, React, Next.js and TypeScript.",
    file: "Vlad_Pocris_CV_A_Frontend_Final_v3.pdf",
  },
  {
    title: "Shopify / E-commerce CV",
    description: "Shopify Liquid, e-commerce and headless storefront development.",
    file: "Vlad_Pocris_CV_B_Shopify_Final_v3.pdf",
  },
  {
    title: "Complete Software Developer CV",
    description: "Full professional background, technical experience, projects and qualifications.",
    file: "Vlad_Pocris_Software_Developer_CV.pdf",
  },
];

const cvUrl = (file: string) => `${import.meta.env.BASE_URL}cv/${file}`;

// Disclosure pattern: the trigger only toggles the list; each option is a plain download link.
const CvDownloadMenu = ({ className = "" }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onBlur={(event) => {
        // Close when keyboard focus leaves the selector entirely.
        if (isOpen && !containerRef.current?.contains(event.relatedTarget as Node | null)) setIsOpen(false);
      }}
    >
      <Button
        ref={triggerRef}
        type="button"
        variant="outline"
        className="w-full border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <Download className="h-4 w-4 mr-2" aria-hidden="true" />
        Download My CV
        <ChevronDown
          className={`h-4 w-4 ml-2 motion-safe:transition-transform motion-safe:duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </Button>

      <div
        id={panelId}
        hidden={!isOpen}
        className="absolute z-30 mt-2 inset-x-0 sm:inset-x-auto sm:left-0 sm:w-80 glass-card bg-card rounded-xl p-2 shadow-glow motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1 motion-safe:duration-200"
      >
        <ul className="space-y-1" aria-label="Choose a CV to download">
          {CV_OPTIONS.map((option) => (
            <li key={option.file}>
              <a
                href={cvUrl(option.file)}
                download={option.file}
                type="application/pdf"
                className="flex items-start gap-3 rounded-lg p-3 text-left hover:bg-primary/10 focus-visible:bg-primary/10 motion-safe:transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FileText className="h-5 w-5 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-foreground">{option.title}</span>
                  <span className="block text-xs text-muted-foreground leading-snug mt-0.5">{option.description}</span>
                </span>
                <Download className="h-4 w-4 mt-1 shrink-0 text-primary" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CvDownloadMenu;
