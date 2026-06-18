---
name: draft-content
description: Draft actual marketing copy — blog posts, social posts (per platform), email newsletters, landing pages, press releases, case studies — with channel-specific formatting, headline/subject options, and CTA guidance. Use whenever the user wants to write, draft, or create a specific piece of marketing content.
compatibility: "Designed for Vellum personal assistants — part of the marketing-expert plugin"
metadata:
  emoji: "📝"
  vellum:
    category: "marketing"
    display-name: "Draft Content"
    activation-hints:
      - "write / draft / create a blog post, article, or landing page"
      - "write a LinkedIn / X / Instagram post"
      - "draft an email newsletter or announcement"
      - "write a press release or case study"
      - "give me headline / subject line options"
      - "rewrite this for [platform/audience]"
---

Produce a publish-ready draft tailored to the format, audience, and brand voice. You write the actual copy — this is the "make the thing" skill, distinct from `content-engine` (which plans the editorial strategy) and `geo-writing` (long-form built for AI-engine citation).

## Step graph

### Step 1: Gather the brief (ask only for what's missing)
- **Format** — blog post, social post (which platform?), email newsletter, landing page, press release, or case study.
- **Topic / angle**, **audience**, and the **one goal** (clicks, signups, replies, shares, SEO).
- **Key points & proof** to include (data, quotes, customers), and any **must-say / must-avoid**.
- **Brand voice** — if the user has one, run **brand-voice** to load it; otherwise mirror their existing examples.

### Step 2: Apply the format's shape
- **Blog**: SEO-aware H1 + scannable H2s, lead with the answer, short paragraphs, one CTA. (For deep AI-citation pieces, use **geo-writing** instead.)
- **Social**: native to the platform — LinkedIn (hook line + whitespace + 1 CTA), X/thread (tight, 1 idea per post), Instagram (visual-first caption). No cross-posting the same text.
- **Email newsletter**: subject + preview text, one core idea, skimmable, single primary CTA.
- **Landing page**: headline (value, not feature) → subhead → proof → benefits → objection handling → CTA.
- **Press release**: dateline, inverted-pyramid lede, a quote, boilerplate, contact.
- **Case study**: challenge → solution → quantified results, customer quote, before/after.

### Step 3: Write strong hooks
Offer **2–3 headline / subject-line options** using proven angles (outcome, how-to, number, contrarian, question). Lead with value; cut throat-clearing.

### Step 4: Close with a clear CTA
One primary CTA matched to the goal; make the next step obvious and low-friction.

### Step 5: Deliver in the Document Writer (not a wall of text in chat)
For anything longer than a short social post, write the draft into the **Document Writer** so the user can edit it inline: call `document_create` with the piece's title to open the editor, then stream the draft in chunks via `document_update` with `mode: "append"` (capture the `surface_id` from `document_create` and reuse it — don't create a second document). In the chat, leave only the **headline/subject options** and a one-line note pointing to the document. Short social posts can stay inline.

Then offer: a **brand-voice** check, repurposing via **content-engine**, or — for email flows — designing the full sequence with **email-sequence**.

Match length and tone to the channel and audience; specificity and proof beat adjectives.
