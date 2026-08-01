import type { ReactNode } from "react";

export function SectionHeading({ number, title, intro }: { number: string; title: string; intro?: ReactNode }) {
  return (
    <div className="section-heading">
      <span className="section-number">{number}</span>
      <div>
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
    </div>
  );
}
