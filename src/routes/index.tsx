import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import photoAsset from "@/assets/friends.jpg.asset.json";
import iqraPhotoAsset from "@/assets/iqra-photo.jpg.asset.json";

/* ============================================================
   EASY CUSTOMIZATION
   ============================================================ */
const birthdayData = {
  friendName: "Iqra",
  secondFriendName: "Sehar",
  senderName: "ALI SHA",
  photo: photoAsset.url,
  personalMessage: "Your friendship matters to me.",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Happy Birthday, ${birthdayData.friendName} — A Friendship Surprise` },
      {
        name: "description",
        content: `A handmade birthday scrapbook for ${birthdayData.friendName}: a memory, an honest note, a playful warning and heartfelt duas.`,
      },
      { property: "og:title", content: `Happy Birthday, ${birthdayData.friendName}` },
      {
        property: "og:description",
        content: "A private birthday surprise made with love, laughter and duas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdaySite,
});

/* ---------------- decorative primitives ---------------- */

const Cake = ({ size = 160 }: { size?: number }) => (
  <svg className="bd-cake" width={size} height={size * 1.05} viewBox="0 0 160 168" fill="none">
    <g className="bd-flame-group">
      {[52, 80, 108].map((x, i) => (
        <g key={x} style={{ animationDelay: `${i * 0.35}s` }} className="bd-flame">
          <ellipse cx={x} cy="34" rx="9" ry="14" fill="#C5A46D" opacity=".35" />
          <path d={`M${x} 26c5 6 6 9 6 12a6 6 0 0 1-12 0c0-3 1-6 6-12z`} fill="#E8C9C5" />
          <path d={`M${x} 31c3 4 3.5 5.5 3.5 7a3.5 3.5 0 0 1-7 0c0-1.5.5-3 3.5-7z`} fill="#FFFFFF" />
        </g>
      ))}
    </g>
    {[52, 80, 108].map((x) => (
      <rect key={x} x={x - 3} y="44" width="6" height="22" rx="3" fill="#E8C9C5" stroke="#642F3D" strokeWidth="1.4" />
    ))}
    <path d="M30 68h100c6 0 10 4 10 10v14H20V78c0-6 4-10 10-10z" fill="#FFFFFF" stroke="#642F3D" strokeWidth="2" />
    <path d="M20 92h120v26H20z" fill="#E8C9C5" stroke="#642F3D" strokeWidth="2" />
    <path d="M12 118h136v28H12z" fill="#FFFFFF" stroke="#642F3D" strokeWidth="2" />
    <path d="M20 92c8 8 14 0 22 8s14 0 22 8" stroke="#C5A46D" strokeWidth="2" fill="none" opacity=".8" />
    <path d="M12 118c10 9 18 1 28 9s18 1 28 9" stroke="#C5A46D" strokeWidth="2" fill="none" opacity=".6" />
    <path d="M4 146h152" stroke="#6B574B" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const Sprig = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="90" height="120" viewBox="0 0 90 120" fill="none">
    <path d="M45 118C45 80 40 40 20 6" stroke="#8A9A83" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i} transform={`translate(${42 - i * 4} ${96 - i * 20}) rotate(${i % 2 ? 35 : -35})`}>
        <ellipse cx="0" cy="0" rx="16" ry="7" fill="#8A9A83" opacity={0.75 - i * 0.07} />
      </g>
    ))}
    <circle cx="20" cy="8" r="6" fill="#E8C9C5" />
    <circle cx="20" cy="8" r="2.4" fill="#C5A46D" />
  </svg>
);

const Star = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <path d="M12 0c1.2 7.6 4.4 10.8 12 12-7.6 1.2-10.8 4.4-12 12-1.2-7.6-4.4-10.8-12-12C7.6 10.8 10.8 7.6 12 0z" fill="currentColor" />
  </svg>
);

const Heart = ({ s = 16 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <path d="M12 21s-8-5.1-8-10.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 3.6C20 15.9 12 21 12 21z" fill="currentColor" />
  </svg>
);

const Ribbon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="120" height="40" viewBox="0 0 120 40" fill="none">
    <path d="M2 20C22 4 42 36 60 20 78 4 98 36 118 20" stroke="#C5A46D" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M52 20c-8-10-18-8-18-1s12 8 18 1zm16 0c8-10 18-8 18-1s-12 8-18 1z" fill="#E8C9C5" stroke="#642F3D" strokeWidth="1.2" />
  </svg>
);

const Balloon = ({ className = "", fill = "#E8C9C5" }: { className?: string; fill?: string }) => (
  <svg className={className} width="56" height="92" viewBox="0 0 56 92" fill="none">
    <ellipse cx="28" cy="30" rx="22" ry="28" fill={fill} stroke="#642F3D" strokeWidth="1.4" opacity=".95" />
    <path d="M28 58l-4 6h8l-4-6z" fill="#642F3D" />
    <path d="M28 64c6 8-6 12 0 22" stroke="#6B574B" strokeWidth="1.2" fill="none" />
    <ellipse cx="20" cy="20" rx="5" ry="8" fill="#FFFFFF" opacity=".45" />
  </svg>
);

/* ---------------- sparkle / confetti layers ---------------- */

function Sparkles({ count = 18 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 37) % 100,
        top: (i * 61) % 100,
        d: (i % 7) * 0.6,
        s: 8 + ((i * 13) % 12),
      })),
    [count],
  );
  return (
    <div className="bd-sparkles" aria-hidden>
      {items.map((it, i) => (
        <span key={i} style={{ left: `${it.left}%`, top: `${it.top}%`, animationDelay: `${it.d}s` }}>
          <Star s={it.s} />
        </span>
      ))}
    </div>
  );
}

type Burst = { id: number; left: number; delay: number; dur: number; kind: number; drift: number };

function Celebration({ active, intensity = 46 }: { active: boolean; intensity?: number }) {
  const pieces = useMemo<Burst[]>(
    () =>
      Array.from({ length: intensity }, (_, i) => ({
        id: i,
        left: (i * 17.3) % 100,
        delay: ((i * 7) % 40) / 10,
        dur: 7 + ((i * 5) % 7),
        kind: i % 5,
        drift: ((i % 9) - 4) * 22,
      })),
    [intensity],
  );
  if (!active) return null;
  return (
    <div className="bd-celebration" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className={`bd-piece k${p.kind}`}
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        >
          {p.kind === 0 ? <Heart s={13} /> : p.kind === 1 ? <Star s={12} /> : p.kind === 2 ? <i className="bd-conf" /> : p.kind === 3 ? <i className="bd-petal" /> : <Balloon className="bd-mini-balloon" fill="#F8F3E8" />}
        </span>
      ))}
    </div>
  );
}

/* ---------------- reveal on view ---------------- */

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`bd-reveal ${shown ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/* ============================================================ */

const DUAS = [
  "May Allah always keep you happy, healthy and peaceful. 🤲🏻",
  "May He bless you with success in every step of your life.",
  "May He fulfill your good and halal wishes and make your dreams come true.",
  "May Allah protect you from every difficulty, sadness and harm.",
  "May He surround you with people who genuinely love, respect and care for you.",
  "May your life be filled with beautiful memories, happiness and endless reasons to smile.",
  "May Allah make every coming year of your life better than the one before it.",
  "May He give you strength when life becomes difficult and peace when your heart feels heavy.",
  "And may Allah always keep the friendship between you and NAME2 strong, beautiful and protected from misunderstandings. 🤍",
  "May your bond always remain full of love, respect, laughter and beautiful memories.",
];

function BirthdaySite() {
  const [page, setPage] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const [burst, setBurst] = useState(false);
  const { friendName: N1, secondFriendName: N2, senderName, photo } = birthdayData;

  const go = (n: number) => {
    setBurst(true);
    setLeaving(true);
    window.setTimeout(() => {
      setPage(n);
      setLeaving(false);
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 620);
    window.setTimeout(() => setBurst(false), 4200);
  };

  return (
    <div className={`bd-root p${page}`}>
      <style>{CSS}</style>

      <Celebration active={burst || page === 5} intensity={page === 5 ? 54 : 34} />

      <main className={`bd-stage ${leaving ? "leaving" : "entering"}`} key={page}>
        {/* ================= PAGE 1 ================= */}
        {page === 1 && (
          <section className="bd-page bd-hero">
            <Sparkles count={16} />
            <Sprig className="bd-sprig tl" />
            <Sprig className="bd-sprig br" />
            <Reveal>
              <p className="bd-eyebrow">A VERY SPECIAL DAY FOR A VERY SPECIAL FRIEND</p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="bd-hero-heading">
                <h1 className="bd-title">
                  HAPPY BIRTHDAY, {N1.toUpperCase()}! <span className="bd-emoji">🎂🤍</span>
                </h1>
                <div className="bd-hero-photo">
                  <img src={iqraPhotoAsset.url} alt={N1} loading="eager" />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <Ribbon className="bd-ribbon" />
            </Reveal>
            <Reveal delay={0.26}>
              <p className="bd-lead">
                Today is your day.
                <br />
                And I wanted to make you a little something special.
              </p>
            </Reveal>
            <Reveal delay={0.34} className="bd-cake-wrap">
              <div className="bd-glow" />
              <Cake size={190} />
            </Reveal>
            <Reveal delay={0.42}>
              <p className="bd-script">
                Another year of your life, another chapter, another reason to celebrate you. ✨
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <button className="bd-btn" onClick={() => go(2)}>
                OPEN YOUR BIRTHDAY SURPRISE <span>→</span>
              </button>
            </Reveal>
          </section>
        )}

        {/* ================= PAGE 2 ================= */}
        {page === 2 && (
          <section className="bd-page bd-memory">
            <Reveal>
              <p className="bd-script bd-center">Some friendships are worth celebrating too. 🤍</p>
            </Reveal>
            <Reveal delay={0.1}>
              <figure className="bd-frame">
                <span className="bd-tape tl" />
                <span className="bd-tape tr" />
                <Sprig className="bd-frame-sprig left" />
                <Sprig className="bd-frame-sprig right" />
                <span className="bd-frame-star a"><Star s={18} /></span>
                <span className="bd-frame-star b"><Star s={12} /></span>
                <Ribbon className="bd-frame-ribbon" />
                <div className="bd-photo-mat">
                  <img src={photo} alt={`${N1} and ${N2} together`} loading="eager" />
                </div>
              </figure>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="bd-lead bd-center">
                Two people.
                <br />
                One beautiful friendship.
                <br />
                And one very annoying third friend. 😂❤️
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="bd-note">Yes… I'm talking about me.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="bd-body bd-center">
                I didn't come between you two.
                <br />I just somehow became part of the chaos. 😂
              </p>
            </Reveal>
            <Reveal delay={0.38}>
              <button className="bd-btn" onClick={() => go(3)}>
                KEEP READING <span>→</span>
              </button>
            </Reveal>
          </section>
        )}

        {/* ================= PAGE 3 ================= */}
        {page === 3 && (
          <section className="bd-page bd-heart">
            <Sparkles count={10} />
            <Sprig className="bd-sprig tl soft" />
            <span className="bd-float-heart h1"><Heart s={18} /></span>
            <span className="bd-float-heart h2"><Heart s={13} /></span>
            <Reveal>
              <h2 className="bd-h2">WHAT I ACTUALLY MEAN 🤍</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Ribbon className="bd-ribbon" />
            </Reveal>
            <div className="bd-paper">
              <Reveal delay={0.14}>
                <p className="bd-body">
                  {N1}, since today is your birthday, I wanted to tell you something properly instead of
                  just saying “Happy Birthday” and moving on.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="bd-body">
                  If sometimes it feels like I'm always teasing you, interrupting your conversations,
                  making jokes between you and {N2}, or deliberately annoying you both… that's because I
                  genuinely enjoy being around you.
                </p>
              </Reveal>
              <Reveal delay={0.26}>
                <p className="bd-body">
                  I have a very playful nature. I tease the people I feel comfortable with. I joke around,
                  make fun of my friends, annoy them, and sometimes probably take the teasing a little too
                  far. 😂
                </p>
              </Reveal>
              <Reveal delay={0.32}>
                <blockquote className="bd-quote">
                  But I never had the intention of coming between you and {N2}.
                </blockquote>
              </Reveal>
              <Reveal delay={0.38}>
                <ul className="bd-list">
                  <li>I don't want to take anyone's place.</li>
                  <li>I don't want to break anyone's bond.</li>
                  <li>And I don't want either of you to feel that way because of my jokes.</li>
                </ul>
              </Reveal>
              <Reveal delay={0.44}>
                <p className="bd-body">
                  If my teasing ever made you feel that way, I'm genuinely sorry that it came across
                  differently from what I actually meant.
                </p>
              </Reveal>
              <Reveal delay={0.5}>
                <p className="bd-script">
                  My jokes may be loud…
                  <br />
                  but my intentions are simple: friendship, fun and love. ❤️
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.56}>
              <button className="bd-btn" onClick={() => go(4)}>
                THERE'S ONE MORE THING <span>→</span>
              </button>
            </Reveal>
          </section>
        )}

        {/* ================= PAGE 4 ================= */}
        {page === 4 && (
          <section className="bd-page bd-fun">
            <Balloon className="bd-balloon b1" fill="#E8C9C5" />
            <Balloon className="bd-balloon b2" fill="#8A9A83" />
            <Sparkles count={12} />
            <Reveal>
              <h2 className="bd-h2">BUT… ONE BIRTHDAY WARNING. 😂🎂</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Ribbon className="bd-ribbon" />
            </Reveal>
            <Reveal delay={0.14}>
              <ul className="bd-list bd-center-list">
                <li>You can misunderstand my jokes.</li>
                <li>You can get annoyed with me.</li>
                <li>You can even give me that look. 😑😂</li>
              </ul>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="bd-shout">BUT I'M STILL GOING TO TEASE YOU. 😂</div>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="bd-note">
                Because unfortunately…
                <br />
                this is who I am.
              </p>
            </Reveal>
            <div className="bd-cards">
              {[
                {
                  t: "😂 MY NATURE",
                  b: ["I joke.", "I tease.", "I annoy my friends.", "I make random comments.", "And I love creating chaos with people I'm comfortable with."],
                },
                {
                  t: "❤️ MY INTENTION",
                  b: ["To make you laugh.", "To enjoy our friendship.", "To create memories.", "Never to hurt you.", `Never to come between you and ${N2}.`],
                },
                { t: "🤝 MY PROMISE", b: ["I'll keep being annoying…", "but I'll also keep caring. ❤️"] },
              ].map((c, i) => (
                <Reveal key={c.t} delay={0.34 + i * 0.08}>
                  <article className="bd-card">
                    <h3>{c.t}</h3>
                    {c.b.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.6}>
              <p className="bd-body bd-center">
                So yes, I will probably tease you tomorrow too.
                <br />
                And the day after that.
                <br />
                And probably even more than before. 😂
              </p>
            </Reveal>
            <Reveal delay={0.66}>
              <p className="bd-script">Consider this your official birthday warning. 🎂😂</p>
            </Reveal>
            <Reveal delay={0.72}>
              <button className="bd-btn" onClick={() => go(5)}>
                NOW FOR YOUR BIRTHDAY DUAS <span>→</span>
              </button>
            </Reveal>
          </section>
        )}

        {/* ================= PAGE 5 ================= */}
        {page === 5 && (
          <section className="bd-page bd-duas">
            <div className="bd-lights" aria-hidden>
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.25}s` }} />
              ))}
            </div>
            <Sparkles count={20} />
            <Reveal>
              <h2 className="bd-h2 gold">MY BIRTHDAY DUAS FOR YOU, {N1.toUpperCase()} 🤍</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="bd-lead">
                On your special day, I pray from the bottom of my heart that Allah blesses you with
                everything beautiful.
              </p>
            </Reveal>
            <div className="bd-dua-list">
              {DUAS.map((d, i) => (
                <Reveal key={i} delay={0.06 * (i % 4)}>
                  <p className="bd-dua">
                    <span className="bd-dua-star"><Star s={12} /></span>
                    {d.replace("NAME2", N2)}
                  </p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <p className="bd-script gold">Ameen. 🤲🏻✨</p>
            </Reveal>

            <Reveal delay={0.1} className="bd-final-cake">
              <div className="bd-glow warm" />
              <Cake size={170} />
            </Reveal>

            <Reveal delay={0.12}>
              <h2 className="bd-title small">HAPPY BIRTHDAY, {N1.toUpperCase()}! 🎂🤍</h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="bd-lead">
                May Allah bless your new year of life with happiness, success, peace, love and countless
                beautiful moments.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="bd-script">I hope this year brings you everything your heart is quietly praying for. ✨</p>
            </Reveal>

            <div className="bd-divider" />

            <Reveal>
              <p className="bd-body bd-center">And I hope you always remember…</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="bd-body bd-center">I'm not here to replace one friend with another.</p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="bd-body bd-center">
                I'm just here to be the slightly crazy friend who joins the fun, causes a little chaos,
                teases you both, laughs with you, and secretly wishes the best for you. 😂❤️
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="bd-shout soft">{birthdayData.personalMessage}</p>
            </Reveal>
            <Reveal delay={0.32}>
              <p className="bd-lead">
                So, {N1}…
                <br />
                Happy Birthday once again. 🎂🤍
                <br />
                And yes… you're stuck with me. 😂❤️
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="bd-sign">
                With love, laughter, duas &amp; a little too much mischief,
                <br />
                <strong>{senderName}</strong>
              </p>
            </Reveal>
            <Reveal delay={0.46}>
              <button className="bd-btn ghost" onClick={() => go(1)}>
                ↺ START AGAIN
              </button>
            </Reveal>
          </section>
        )}
      </main>

      <nav className="bd-dots" aria-label="pages">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} className={n === page ? "on" : ""} aria-label={`Page ${n}`} onClick={() => n !== page && go(n)} />
        ))}
      </nav>
    </div>
  );
}

/* ============================================================
   STYLES
   ============================================================ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Caveat:wght@500;700&family=Jost:wght@300;400;500;600&display=swap');

.bd-root{
  --ivory:#F8F3E8; --burgundy:#642F3D; --sage:#8A9A83; --mocha:#6B574B;
  --gold:#C5A46D; --white:#FFFFFF; --blush:#E8C9C5;
  min-height:100vh; width:100%; overflow-x:hidden; position:relative;
  background:var(--ivory); color:var(--mocha);
  font-family:'Jost',system-ui,sans-serif;
  background-image:
    radial-gradient(1200px 600px at 12% -10%, rgba(232,201,197,.45), transparent 60%),
    radial-gradient(900px 500px at 100% 10%, rgba(197,164,109,.22), transparent 60%),
    radial-gradient(800px 600px at 50% 110%, rgba(138,154,131,.22), transparent 60%);
}
.bd-root.p5{ background:var(--burgundy); color:var(--ivory);
  background-image:
    radial-gradient(900px 500px at 50% -10%, rgba(197,164,109,.28), transparent 65%),
    radial-gradient(700px 500px at 0% 100%, rgba(232,201,197,.16), transparent 60%);
}
.bd-stage{ animation:bd-in .7s cubic-bezier(.22,.9,.24,1) both; }
.bd-stage.leaving{ animation:bd-out .6s cubic-bezier(.6,0,.5,1) both; }
@keyframes bd-in{from{opacity:0;transform:translateY(26px) scale(.99);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
@keyframes bd-out{to{opacity:0;transform:translateY(-22px) scale(.985);filter:blur(6px)}}

.bd-page{ position:relative; max-width:900px; margin:0 auto; padding:clamp(48px,8vw,90px) clamp(18px,5vw,40px) 120px;
  display:flex; flex-direction:column; align-items:center; text-align:center; gap:clamp(14px,2.4vw,22px); }

.bd-reveal{opacity:0;transform:translateY(20px);transition:opacity .9s ease,transform .9s cubic-bezier(.22,.9,.24,1)}
.bd-reveal.in{opacity:1;transform:none}

.bd-eyebrow{ font-size:clamp(10px,2.4vw,12px); letter-spacing:.34em; text-transform:uppercase;
  color:var(--sage); font-weight:500; }
.bd-title{ font-family:'Cormorant Garamond',serif; font-weight:700; line-height:1.05;
  font-size:clamp(34px,8.2vw,72px); color:var(--burgundy); letter-spacing:.01em; margin:0; }
.p5 .bd-title{ color:var(--ivory); }
.bd-title.small{ font-size:clamp(28px,6.4vw,52px); color:var(--gold); }
.bd-emoji{ display:inline-block; animation:bd-bob 3.2s ease-in-out infinite; }
@keyframes bd-bob{50%{transform:translateY(-6px) rotate(-3deg)}}
.bd-h2{ font-family:'Cormorant Garamond',serif; font-weight:700; margin:0;
  font-size:clamp(26px,6vw,46px); color:var(--burgundy); }
.bd-h2.gold{ color:var(--gold); }
.bd-lead{ font-size:clamp(15px,2.6vw,19px); line-height:1.85; color:var(--mocha); max-width:56ch; margin:0; }
.p5 .bd-lead{ color:#F3E9DA; }
.bd-body{ font-size:clamp(14.5px,2.3vw,17px); line-height:1.95; max-width:60ch; margin:0 auto; }
.p5 .bd-body{ color:#EFE3D3; }
.bd-center{ text-align:center; }
.bd-script{ font-family:'Caveat',cursive; font-size:clamp(21px,4.6vw,31px); line-height:1.5;
  color:var(--burgundy); max-width:26ch; margin:0 auto; }
.p5 .bd-script{ color:var(--blush); max-width:32ch; }
.bd-script.gold{ color:var(--gold); font-size:clamp(26px,6vw,40px); }
.bd-note{ font-family:'Caveat',cursive; font-size:clamp(20px,4.2vw,27px); color:var(--sage); }

.bd-btn{ margin-top:14px; border:none; cursor:pointer; font-family:'Jost',sans-serif;
  font-size:clamp(11px,2.4vw,13px); letter-spacing:.2em; font-weight:500;
  padding:16px 30px; border-radius:999px; color:var(--ivory);
  background:linear-gradient(135deg,var(--burgundy),#7d3c4c);
  box-shadow:0 14px 30px -14px rgba(100,47,61,.75), inset 0 0 0 1px rgba(197,164,109,.5);
  transition:transform .3s cubic-bezier(.22,.9,.24,1), box-shadow .3s, letter-spacing .3s; }
.bd-btn span{ display:inline-block; transition:transform .3s; }
.bd-btn:hover{ transform:translateY(-3px); letter-spacing:.26em; box-shadow:0 20px 40px -16px rgba(100,47,61,.8), inset 0 0 0 1px var(--gold); }
.bd-btn:hover span{ transform:translateX(5px); }
.bd-btn.ghost{ background:transparent; color:var(--gold); box-shadow:inset 0 0 0 1px rgba(197,164,109,.6); }

/* hero */
.bd-cake-wrap{ position:relative; margin:6px 0; }
.bd-glow{ position:absolute; inset:-40px; border-radius:50%;
  background:radial-gradient(circle, rgba(197,164,109,.45), transparent 66%);
  filter:blur(14px); animation:bd-pulse 3.4s ease-in-out infinite; }
.bd-glow.warm{ background:radial-gradient(circle, rgba(232,201,197,.4), transparent 68%); }
@keyframes bd-pulse{50%{opacity:.55;transform:scale(1.08)}}
.bd-flame{ transform-origin:center; animation:bd-flicker 1.6s ease-in-out infinite; }
@keyframes bd-flicker{50%{transform:scaleY(1.14) translateY(-2px); opacity:.85}}
.bd-ribbon{ opacity:.9; }
.bd-hero-heading{ display:flex; align-items:center; justify-content:center; gap:clamp(14px,3vw,26px); flex-wrap:nowrap; }
.bd-hero-heading .bd-title{ font-size:clamp(28px,6.2vw,58px); }
.bd-hero-photo{ flex:0 0 auto; width:clamp(80px,13vw,110px); aspect-ratio:3/4; border-radius:14px; overflow:hidden;
  box-shadow:0 16px 34px -16px rgba(100,47,61,.55), 0 0 0 4px rgba(255,255,255,.7), 0 0 0 1px rgba(197,164,109,.5);
  animation:bd-photo 1.2s cubic-bezier(.22,.9,.24,1) both; animation-delay:.2s; }
.bd-hero-photo img{ display:block; width:100%; height:100%; object-fit:cover; }
.bd-sprig{ position:absolute; opacity:.55; pointer-events:none; }
.bd-sprig.tl{ top:8px; left:-10px; transform:rotate(-18deg); animation:bd-sway 7s ease-in-out infinite; }
.bd-sprig.br{ bottom:70px; right:-6px; transform:scaleX(-1) rotate(-14deg); animation:bd-sway 9s ease-in-out infinite; }
.bd-sprig.soft{ opacity:.32; }
@keyframes bd-sway{50%{transform:rotate(-8deg) translateY(-6px)}}

/* sparkles */
.bd-sparkles{ position:absolute; inset:0; pointer-events:none; color:var(--gold); }
.bd-sparkles span{ position:absolute; opacity:0; animation:bd-twinkle 4.5s ease-in-out infinite; }
.p5 .bd-sparkles{ color:#E9D5A8; }
@keyframes bd-twinkle{0%,100%{opacity:0;transform:scale(.5)}45%{opacity:.85;transform:scale(1)}}

/* photo frame */
.bd-frame{ position:relative; margin:12px 0 6px; padding:clamp(14px,3.4vw,24px);
  background:var(--white); border-radius:6px; max-width:520px; width:100%;
  box-shadow:0 30px 60px -28px rgba(107,87,75,.6), 0 0 0 1px rgba(197,164,109,.45), 0 0 0 10px rgba(255,255,255,.55);
  background-image:radial-gradient(rgba(107,87,75,.05) 1px, transparent 1px); background-size:4px 4px; }
.bd-photo-mat{ overflow:hidden; border-radius:3px; box-shadow:inset 0 0 0 1px rgba(100,47,61,.25); }
.bd-frame img{ display:block; width:100%; height:auto; animation:bd-photo 1.4s cubic-bezier(.22,.9,.24,1) both; }
@keyframes bd-photo{from{opacity:0;transform:scale(1.06);filter:blur(8px)}to{opacity:1;transform:none;filter:none}}
.bd-tape{ position:absolute; width:96px; height:26px; background:rgba(232,201,197,.7); top:-12px;
  box-shadow:0 2px 6px rgba(107,87,75,.18); }
.bd-tape.tl{ left:-14px; transform:rotate(-28deg); }
.bd-tape.tr{ right:-14px; transform:rotate(28deg); }
.bd-frame-sprig{ position:absolute; opacity:.75; pointer-events:none; }
.bd-frame-sprig.left{ left:-58px; bottom:-10px; transform:rotate(16deg); }
.bd-frame-sprig.right{ right:-58px; top:-24px; transform:scaleX(-1) rotate(16deg); }
.bd-frame-star{ position:absolute; color:var(--gold); animation:bd-twinkle 3.6s infinite; }
.bd-frame-star.a{ top:-16px; right:34%; }
.bd-frame-star.b{ bottom:-10px; left:22%; animation-delay:1.2s; }
.bd-frame-ribbon{ position:absolute; bottom:-24px; right:-10px; opacity:.9; }
.bd-badge{ position:absolute; bottom:-18px; left:50%; transform:translateX(-50%);
  background:var(--burgundy); color:var(--ivory); font-size:10.5px; letter-spacing:.24em;
  padding:9px 18px; border-radius:999px; white-space:nowrap;
  box-shadow:0 10px 22px -12px rgba(100,47,61,.9), inset 0 0 0 1px rgba(197,164,109,.6); }
.bd-memory .bd-lead{ margin-top:22px; }

/* page 3 */
.bd-paper{ width:100%; max-width:640px; text-align:left; padding:clamp(22px,4.6vw,38px);
  background:rgba(255,255,255,.72); border-radius:10px;
  box-shadow:0 26px 56px -30px rgba(107,87,75,.55), inset 0 0 0 1px rgba(197,164,109,.35);
  display:flex; flex-direction:column; gap:18px; }
.bd-quote{ margin:6px 0; padding:20px 22px; border-left:3px solid var(--gold);
  background:linear-gradient(90deg, rgba(232,201,197,.5), rgba(255,255,255,0));
  font-family:'Cormorant Garamond',serif; font-size:clamp(19px,3.6vw,27px); font-weight:600;
  color:var(--burgundy); line-height:1.4; }
.bd-list{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:11px; }
.bd-list li{ position:relative; padding-left:26px; font-size:clamp(14.5px,2.3vw,17px); line-height:1.7; }
.bd-list li::before{ content:"✦"; position:absolute; left:0; color:var(--gold); }
.bd-center-list{ align-items:flex-start; text-align:left; margin:0 auto; }
.bd-float-heart{ position:absolute; color:var(--blush); animation:bd-float 9s ease-in-out infinite; }
.bd-float-heart.h1{ top:14%; right:8%; }
.bd-float-heart.h2{ bottom:22%; left:7%; animation-delay:2.5s; }
@keyframes bd-float{50%{transform:translateY(-22px) rotate(8deg)}}

/* page 4 */
.bd-shout{ font-family:'Cormorant Garamond',serif; font-weight:700; line-height:1.2;
  font-size:clamp(24px,5.6vw,44px); color:var(--burgundy);
  padding:clamp(18px,3.6vw,28px) clamp(18px,4vw,34px); border-radius:12px;
  background:linear-gradient(135deg, rgba(232,201,197,.75), rgba(255,255,255,.85));
  box-shadow:0 22px 46px -26px rgba(100,47,61,.6), inset 0 0 0 1px rgba(197,164,109,.55);
  animation:bd-tilt 6s ease-in-out infinite; }
@keyframes bd-tilt{0%,100%{transform:rotate(-1deg)}50%{transform:rotate(1deg)}}
.bd-shout.soft{ font-size:clamp(20px,4.4vw,32px); background:rgba(197,164,109,.14);
  color:var(--gold); box-shadow:inset 0 0 0 1px rgba(197,164,109,.5); animation:none; }
.bd-cards{ display:grid; gap:16px; width:100%; margin-top:10px;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); }
.bd-card{ background:rgba(255,255,255,.78); border-radius:12px; padding:22px 20px; text-align:left; height:100%;
  box-shadow:0 20px 44px -28px rgba(107,87,75,.6), inset 0 0 0 1px rgba(138,154,131,.4);
  transition:transform .35s cubic-bezier(.22,.9,.24,1), box-shadow .35s; }
.bd-card:hover{ transform:translateY(-6px); box-shadow:0 28px 52px -26px rgba(107,87,75,.65), inset 0 0 0 1px var(--gold); }
.bd-card h3{ margin:0 0 12px; font-size:12px; letter-spacing:.2em; color:var(--burgundy); font-weight:600; }
.bd-card p{ margin:0 0 6px; font-size:15px; line-height:1.7; }
.bd-balloon{ position:absolute; opacity:.7; animation:bd-float 11s ease-in-out infinite; }
.bd-balloon.b1{ top:6%; left:2%; }
.bd-balloon.b2{ top:16%; right:3%; animation-delay:3s; }

/* page 5 */
.bd-duas .bd-h2{ margin-top:8px; }
.bd-dua-list{ display:flex; flex-direction:column; gap:14px; width:100%; max-width:640px; margin:10px 0; }
.bd-dua{ position:relative; text-align:left; padding:16px 18px 16px 44px; margin:0; border-radius:10px;
  background:rgba(248,243,232,.07); box-shadow:inset 0 0 0 1px rgba(197,164,109,.28);
  font-size:clamp(14.5px,2.3vw,17px); line-height:1.8; color:#F4EADB; }
.bd-dua-star{ position:absolute; left:16px; top:18px; color:var(--gold); }
.bd-lights{ position:absolute; top:0; left:0; right:0; height:60px; display:flex; justify-content:space-around;
  align-items:flex-start; pointer-events:none; }
.bd-lights::before{ content:""; position:absolute; top:6px; left:0; right:0; height:26px;
  border-bottom:1.5px solid rgba(197,164,109,.45); border-radius:0 0 50% 50%/0 0 100% 100%; }
.bd-lights span{ width:9px; height:9px; border-radius:50%; margin-top:22px; background:var(--gold);
  box-shadow:0 0 12px 3px rgba(197,164,109,.6); animation:bd-lamp 3s ease-in-out infinite; }
@keyframes bd-lamp{50%{opacity:.35; box-shadow:0 0 6px 1px rgba(197,164,109,.35)}}
.bd-final-cake{ position:relative; margin:26px 0 6px; }
.bd-divider{ width:120px; height:1px; margin:34px 0; background:linear-gradient(90deg,transparent,var(--gold),transparent); }
.bd-sign{ font-family:'Caveat',cursive; font-size:clamp(20px,4vw,27px); color:var(--blush); line-height:1.6; }
.bd-sign strong{ color:var(--gold); letter-spacing:.05em; }

/* celebration */
.bd-celebration{ position:fixed; inset:0; pointer-events:none; z-index:40; overflow:hidden; }
.bd-piece{ position:absolute; top:-8%; animation-name:bd-fall; animation-timing-function:linear;
  animation-iteration-count:infinite; }
.bd-piece.k0{ color:#E8C9C5; } .bd-piece.k1{ color:#C5A46D; }
.bd-conf{ display:block; width:7px; height:12px; border-radius:2px; background:#8A9A83; }
.bd-piece.k2:nth-child(3n) .bd-conf{ background:#C5A46D; }
.bd-piece.k2:nth-child(3n+1) .bd-conf{ background:#E8C9C5; }
.bd-petal{ display:block; width:13px; height:9px; border-radius:60% 40% 60% 40%; background:rgba(232,201,197,.95); }
.bd-mini-balloon{ width:22px; height:36px; opacity:.65; }
@keyframes bd-fall{ 0%{transform:translate3d(0,0,0) rotate(0);opacity:0}
  10%{opacity:.95} 100%{transform:translate3d(var(--drift),108vh,0) rotate(320deg);opacity:0} }

/* dots */
.bd-dots{ position:fixed; bottom:20px; left:50%; transform:translateX(-50%); display:flex; gap:10px; z-index:50;
  padding:9px 14px; border-radius:999px; background:rgba(255,255,255,.6); backdrop-filter:blur(8px);
  box-shadow:0 10px 26px -16px rgba(107,87,75,.7); }
.p5 .bd-dots{ background:rgba(100,47,61,.55); box-shadow:0 10px 26px -14px #000, inset 0 0 0 1px rgba(197,164,109,.4); }
.bd-dots button{ width:8px; height:8px; border-radius:50%; border:none; cursor:pointer; padding:0;
  background:rgba(107,87,75,.3); transition:all .3s; }
.p5 .bd-dots button{ background:rgba(248,243,232,.3); }
.bd-dots button.on{ width:24px; border-radius:999px; background:var(--gold); }

@media (max-width:700px){
  .bd-frame-sprig{ display:none; }
  .bd-sprig{ opacity:.28; transform:scale(.8); }
  .bd-balloon{ transform:scale(.75); }
  .bd-page{ padding-bottom:130px; }
  .bd-hero-heading{ flex-direction:column; gap:14px; }
  .bd-hero-photo{ order:-1; width:clamp(78px,22vw,110px); }
}
@media (prefers-reduced-motion:reduce){
  *{animation-duration:.01ms !important; animation-iteration-count:1 !important; transition-duration:.01ms !important}
}
`;
