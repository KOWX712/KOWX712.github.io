import { useState, useRef, useEffect, type PointerEvent } from "react";
import type { SkillGroup } from "../../data/skills";
import type { Locale } from "../../data/i18n";
import { cn } from "../../lib/utils";

type SkillGridProps = {
  groups: SkillGroup[];
  locale: Locale;
};

export function SkillGrid({ groups, locale }: SkillGridProps) {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const currentRef = useRef({ x: 50, y: 50 });
  const targetRef = useRef({ x: 50, y: 50 });
  const rafRef = useRef(0);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function tick() {
    const cur = currentRef.current;
    const tgt = targetRef.current;
    const dx = tgt.x - cur.x;
    const dy = tgt.y - cur.y;

    if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
      cur.x = tgt.x;
      cur.y = tgt.y;
      setSpotlight({ x: cur.x, y: cur.y });
      rafRef.current = 0;
      return;
    }

    cur.x += dx * 0.12;
    cur.y += dy * 0.12;
    setSpotlight({ x: cur.x, y: cur.y });
    rafRef.current = requestAnimationFrame(tick);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    targetRef.current = {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    };
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }

  return (
    <div
      className="relative rounded-4xl border border-border bg-panel p-4 backdrop-blur sm:p-6"
      onPointerMove={handlePointerMove}
      style={{
        background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, var(--accent-strong), transparent 18rem), var(--panel)`,
      }}
    >
      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.id}>
            <h3 className="mb-4 text-sm uppercase tracking-[0.35em] text-foreground-subtle">{group.title[locale]}</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {group.skills.map((skill) => {
                const active = activeSkill === skill.name;

                return (
                  <button
                    key={skill.name}
                    type="button"
                    className={cn(
                      "group rounded-3xl border border-border bg-surface p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-accent",
                      "hover:-translate-y-1 hover:border-accent hover:bg-accent-soft",
                      active && "border-accent bg-accent-soft",
                    )}
                    onPointerDown={() => setActiveSkill(skill.name)}
                    onPointerUp={() => setActiveSkill(null)}
                    onPointerLeave={() => setActiveSkill(null)}
                    onPointerCancel={() => setActiveSkill(null)}
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface p-2 text-accent-muted">
                      {skill.Icon ? (
                        <skill.Icon size={32} />
                      ) : skill.iconPath ? (
                        <img
                          src={skill.iconPath}
                          alt=""
                          aria-hidden="true"
                          className="h-full w-full object-contain"
                        />
                      ) : null}
                    </span>
                    <span className="mt-4 block text-sm font-semibold text-foreground">{skill.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
