import type { SiteContent } from "../content/site-content";
import { Reveal } from "./reveal";

export function WorkingPrinciples({ content }: { content: SiteContent["approach"] }) {
  return (
    <div className="principles">
      {content.items.map((item, index) => (
        <Reveal key={item.title}>
          <article className="principle">
            <span className="principle-number">0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
