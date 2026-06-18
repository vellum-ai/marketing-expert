---
name: brand-voice
description: Define, document, and enforce a brand voice — voice attributes, tone adaptation by context, style/terminology rules — and review drafts against it. Use to create a brand voice guide, set tone-of-voice, or check whether content is on-brand.
compatibility: "Designed for Vellum personal assistants — part of the marketing-expert plugin"
metadata:
  emoji: "🎨"
  vellum:
    category: "marketing"
    display-name: "Brand Voice"
    activation-hints:
      - "define / document our brand voice or tone of voice"
      - "is this on-brand? review this against our voice"
      - "make this sound more like us / our brand"
      - "create a style guide or messaging guidelines"
      - "what words should we use / avoid"
---

Establish a brand voice and keep content consistent with it. Two modes: **define** (build the voice guide) and **review** (check a draft against it). Pairs with **draft-content** (apply the voice while writing).

## Define mode

### Step 1: Source the voice
If a voice guide exists, load it. Otherwise derive one from inputs: positioning (run **positioning-sprint** if unclear), the audience, and 3–5 samples of content the user feels is "us." Note the founder's/exec's natural voice if relevant.

### Step 2: Produce the voice guide
- **3–5 voice attributes** — each as "we are X, not Y" (e.g. "Direct, not blunt"; "Confident, not boastful"), each with a one-line do/don't and a short example.
- **Tone adaptation** — how the voice flexes by context (sales page vs. docs vs. apology vs. social).
- **Style rules** — person (first/second), formality, sentence length, emoji/exclamation policy, formatting habits.
- **Terminology** — preferred terms, banned/avoid words, capitalization, how to name the product and competitors.
Save this as a reusable guide (e.g. a `BRAND.md` in the workspace) so future content can reference it.

## Review mode

### Step 3: Check a draft against the voice
For the supplied content, score each voice attribute (on-brand / drifting / off), flag specific lines that break style or terminology rules, and **rewrite the worst offenders** inline. Keep edits surgical — preserve the author's intent.

### Step 4: Summarize
Give a short verdict (ship / light edits / rework), the top 3 fixes, and — if patterns recur — a rule to add to the guide so it doesn't happen again.

Consistency is the point: a recognizable voice compounds trust. Be specific; "more friendly" is useless feedback, "cut the hedging in the opening line" is not.
