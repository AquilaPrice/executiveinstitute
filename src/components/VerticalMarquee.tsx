import { ReactNode } from "react";

interface Props {
  items: ReactNode[];
  reverse?: boolean;
  duration?: number; // seconds
  className?: string;
}

/**
 * Continuous vertical marquee column.
 * Duplicates children to allow seamless loop with translateY -50%.
 */
const VerticalMarquee = ({ items, reverse = false, duration = 35, className = "" }: Props) => {
  return (
    <div className={`marquee-v-mask relative h-[560px] overflow-hidden ${className}`}>
      <div
        className={`marquee-v ${reverse ? "reverse" : ""} gap-5`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex flex-col gap-5 shrink-0">
            {items.map((it, i) => (
              <div key={`${dup}-${i}`}>{it}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalMarquee;
