import { Marquee } from "./ui/marquee";

const reviews = [
  {
    name: "Aisha S.",
    title: "MBBS Student, Vietnam",
    body: "Eduplus made my dream of studying medicine abroad a reality. The entire admission process to Hong Bang International University was seamless.",
  },
  {
    name: "Rahul M.",
    title: "Placed in Dubai",
    body: "Thanks to the Overseas Placement team, I secured a fantastic job in Dubai. Their interview prep and vocational training are top-notch.",
  },
  {
    name: "Priya T.",
    title: "Parent of Mentee",
    body: "The Vision Talk program transformed my daughter's confidence. The expert mentorship gave her clarity on her career path.",
  },
  {
    name: "David L.",
    title: "Engineering Student",
    body: "The Summer Camp at NIELIT Imphal on IoT was eye-opening. The practical skills I gained are invaluable for my future career.",
  },
  {
    name: "Dr. Sharma",
    title: "School Principal",
    body: "The Educator Academy provided excellent pedagogical training for our teachers. We've seen a noticeable improvement in student engagement.",
  },
  {
    name: "John D.",
    title: "NEET Aspirant",
    body: "The domestic admissions guidance is incredible. The mock tests and personalized counseling kept me focused and prepared.",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  name,
  title,
  body,
}: {
  name: string;
  title: string;
  body: string;
}) => {
  return (
    <figure className="relative w-80 cursor-pointer overflow-hidden border border-border bg-card p-6 rounded-none hover:bg-muted/50 transition-colors duration-300">
      <div className="flex flex-col h-full justify-between gap-4">
        <blockquote className="text-sm leading-relaxed text-foreground font-sans">
          "{body}"
        </blockquote>
        <div className="flex flex-col gap-1 border-t border-border/50 pt-4 mt-2">
          <figcaption className="text-sm font-semibold font-sans text-primary">
            {name}
          </figcaption>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            {title}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function Testimonials() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-background py-16 md:py-24 border-y border-border">
      <div className="flex flex-col items-center mb-12 text-center px-4 z-10 relative">
        <h2 className="text-3xl md:text-5xl font-heading text-foreground mb-4">
          Student Success Stories
        </h2>
        <p className="text-muted-foreground font-sans max-w-xl leading-relaxed">
          Hear from the students, parents, and educators who have transformed their careers and institutions with Eduplus Skills.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <Marquee pauseOnHover className="[--duration:40s] mb-4">
          {firstRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:40s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        
        {/* Subtle fade effect on the sides */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent dark:from-background"></div>
      </div>
    </section>
  );
}
