import type { SiteContent } from "../content/site-content";
import { Reveal } from "./reveal";

export function PersonalInterests({ content }: { content: SiteContent["personal"] }) {
  return (
    <div className="personal-layout">
      <Reveal>
        <h2>{content.title}</h2>
      </Reveal>
      <Reveal>
        <div className="personal-copy">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="interest-tags" aria-label="Interests">
            {content.interests.map((interest) => (
              <span className="interest-tag" key={interest}>
                {interest}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
