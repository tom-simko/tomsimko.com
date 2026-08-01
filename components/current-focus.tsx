import type { SiteContent } from "../content/site-content";
import { Reveal } from "./reveal";

export function CurrentFocus({ content }: { content: SiteContent["currentFocus"] }) {
  return (
    <div className="focus-layout">
      <Reveal>
        <div>
          <p className="focus-label mono-label">{content.label}</p>
          <h2 className="focus-title">{content.title}</h2>
        </div>
      </Reveal>
      <Reveal>
        <ul className="focus-list">
          {content.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
