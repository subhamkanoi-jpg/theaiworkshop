export type Kit = {
  offer: string;
  bio: string;
  posts: [string, string, string];
  raw: string;
};

function clean(s: string) {
  return s.replace(/\s+/g, " ").replace(/[\u2014\u2013]/g, ", ").trim();
}

function sentenceCase(s: string) {
  const t = s.replace(/^["'\s]+|["'\s]+$/g, "");
  if (!t) return t;
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function clip(s: string, n: number) {
  const t = s.trim();
  if (t.length <= n) return t;
  const cut = t.slice(0, n - 1);
  const at = cut.lastIndexOf(" ");
  return (at > 40 ? cut.slice(0, at) : cut).replace(/[,:;.-]+$/, "") + ".";
}

/** Local trailer. Uses their words. No model required. */
export function makeKit(raw: string): Kit {
  const text = clean(raw);
  const bits = text.split(/(?<=[.!?])\s+/).map(clean).filter((s) => s.length > 8);
  const first = bits[0] || text;
  const words = text.split(" ").filter(Boolean);

  let offer = words.slice(0, Math.min(11, words.length)).join(" ");
  offer = sentenceCase(clip(offer, 78));
  if (!/[.!?]$/.test(offer)) offer += ".";

  const bioCore = first.length > 24 ? first : text;
  const bio = sentenceCase(
    clip(/i\b/i.test(bioCore) ? bioCore : `I work on this: ${bioCore}`, 160)
  );

  const hook = offer.replace(/[.!?]$/, "");
  const posts: [string, string, string] = [
    clip(`${hook}. Done in my own words, on my phone.`, 140),
    clip(`This week I actually finished it. ${first}`, 140),
    clip(`Salt Lake Sunday. I talked for a minute. This came out: ${hook}.`, 140),
  ];

  return { offer, bio, posts, raw: text };
}

export function parseKitPayload(data: unknown, fallbackRaw: string): Kit {
  const local = makeKit(fallbackRaw);
  if (!data || typeof data !== "object") return local;
  const d = data as Record<string, unknown>;
  const posts = Array.isArray(d.posts) ? d.posts.map((p) => String(p)) : [];
  return {
    offer: clean(String(d.offer || local.offer)),
    bio: clean(String(d.bio || local.bio)),
    posts: [
      clean(String(posts[0] || local.posts[0])),
      clean(String(posts[1] || local.posts[1])),
      clean(String(posts[2] || local.posts[2])),
    ],
    raw: fallbackRaw,
  };
}

export const DEMO_LINE =
  "I run a clinic in Salt Lake. Patients WhatsApp me all evening.";

export const DEMO_KIT: Kit = {
  offer: "Evening WhatsApp, already answered in your voice.",
  bio: "I run a clinic in Salt Lake. Patients write after hours. Now the first reply sounds like me.",
  posts: [
    "We still pick up. The phone just starts the reply.",
    "Three messages I used to type at 9pm. Done before chai.",
    "Salt Lake Sunday. I talked for a minute. This came out.",
  ],
  raw: DEMO_LINE,
};
