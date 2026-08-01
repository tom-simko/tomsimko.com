"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { SiteContent } from "../content/site-content";

export function Hero({ content }: { content: SiteContent["hero"] }) {
  const reducedMotion = useReducedMotion();
  const motionProps = reducedMotion ? {} : { initial: false, animate: { opacity: 1, y: 0 } };
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div>
          <motion.p className="eyebrow mono-label" {...motionProps} transition={{ duration: 0.42 }}>
            {content.eyebrow}
          </motion.p>
          <motion.h1 className="hero-title" id="hero-title" {...motionProps} transition={{ duration: 0.5, delay: 0.04 }}>
            {content.title}
          </motion.h1>
          <motion.p className="hero-copy" {...motionProps} transition={{ duration: 0.5, delay: 0.09 }}>
            {content.body}
          </motion.p>
          <motion.p className="hero-descriptor mono-label" {...motionProps} transition={{ duration: 0.5, delay: 0.19 }}>
            {content.descriptor}
          </motion.p>
        </div>
        <motion.div className="portrait-wrap" initial={false} animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }} transition={{ duration: 0.62, delay: 0.12 }}>
          {content.floatingLabels.map((label) => (
            <span className="floating-label" aria-hidden="true" key={label}>
              {label}
            </span>
          ))}
          <Image className="portrait" src="/images/tomas-simko-headshot.webp" width={720} height={900} priority sizes="(max-width: 900px) 100vw, 42vw" alt="Tomáš Šimko" />
        </motion.div>
      </div>
    </section>
  );
}
