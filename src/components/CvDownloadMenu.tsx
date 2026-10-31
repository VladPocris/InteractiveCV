import { useRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
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

// The trigger only toggles the list; each option is a plain download link. The list is portalled to <body>
// so the hero's overflow-hidden and the following section cannot clip or cover it.
const CvDownloadMenu = ({ className = "" }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <Button
          type="button"
          variant="outline"
          className={`border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60 ${className}`}
        >
          <Download className="h-4 w-4 mr-2" aria-hidden="true" />
          Download My CV
          <ChevronDown
            className={`h-4 w-4 ml-2 motion-safe:transition-transform motion-safe:duration-200 ${isOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="center"
          sideOffset={8}
          collisionPadding={16}
          onOpenAutoFocus={(event) => {
            // Focus the first download link (not the panel container) so it is announced as an actionable option.
            event.preventDefault();
            listRef.current?.querySelector("a")?.focus();
          }}
          className="z-50 w-[min(24rem,calc(100vw-2rem))] glass-card bg-card rounded-xl p-2 shadow-glow motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:fade-in-0 motion-safe:data-[state=open]:zoom-in-95 motion-safe:data-[side=bottom]:slide-in-from-top-2 motion-safe:data-[side=top]:slide-in-from-bottom-2"
        >
          <ul ref={listRef} className="space-y-1" aria-label="Choose a CV to download">
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
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default CvDownloadMenu;
