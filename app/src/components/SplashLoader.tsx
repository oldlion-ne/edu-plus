import { motion, useReducedMotion } from "framer-motion";

const PAGE_WIDTH = 72;
const PAGE_HEIGHT = 96;

const PageLines = ({ widths }: { widths: string[] }) => (
  <div className="flex h-full flex-col justify-center gap-2 p-2.5">
    {widths.map((w, i) => (
      <div key={i} className="h-1 rounded-none bg-primary/20" style={{ width: w }} />
    ))}
  </div>
);

const PageFlipBook = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="[perspective:1000px]">
      <div className="[transform:rotateX(50deg)_rotateZ(-6deg)] [transform-style:preserve-3d]">
        <div
          className="relative [transform-style:preserve-3d]"
          style={{ width: PAGE_WIDTH * 2, height: PAGE_HEIGHT }}
        >
          {/* page stack under the book */}
          <div className="absolute inset-0 translate-x-[3px] translate-y-[3px] rounded-none bg-foreground/10" />

          {/* left page */}
          <div className="absolute inset-y-0 left-0 w-1/2 rounded-none border border-r-0 border-primary/25 bg-muted">
            <PageLines widths={["80%", "65%", "72%", "50%"]} />
          </div>
          {/* right page revealed after the flip */}
          <div className="absolute inset-y-0 right-0 w-1/2 rounded-none border border-l-0 border-primary/25 bg-muted">
            <PageLines widths={["70%", "78%", "55%", "68%"]} />
          </div>

          {/* the turning page (now just a subtle entrance fade/slide) */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 [transform-origin:left_center] [transform-style:preserve-3d]"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.0,
              ease: "easeOut",
            }}
          >
            <div
              className="absolute inset-0 rounded-none border border-l-0 border-primary/25 bg-muted [backface-visibility:hidden]"
            >
              <PageLines widths={["60%", "75%", "68%", "45%"]} />
            </div>
            <div
              className="absolute inset-0 rounded-none border border-r-0 border-primary/25 bg-muted [backface-visibility:hidden] [transform:rotateY(180deg)]"
            >
              <PageLines widths={["72%", "58%", "80%", "62%"]} />
            </div>
          </motion.div>

          {/* spine */}
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-primary/30" />
        </div>
      </div>
    </div>
  );
};

export default function SplashLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
    >
      <PageFlipBook />
      <div className="mt-16 flex flex-col items-center">
        <span className="font-heading font-bold text-3xl text-foreground">Edu<span className="text-primary font-light">Plus</span></span>
        <span className="text-[10px] text-muted-foreground font-sans uppercase tracking-widest mt-4">Initializing System</span>
      </div>
    </motion.div>
  );
}
