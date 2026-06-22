---
name: marketing-plan
description: Create and maintain one living marketing/GTM plan document — positioning, channels, content calendar, paid-ads framework, and action items as checkboxes — and keep it up to date across sessions instead of one-shotting strategy into chat. Use for "make a marketing plan", "track my marketing progress", "keep this up to date", "organize our GTM", or whenever a multi-step engagement needs a durable source of truth.
compatibility: "Designed for Vellum personal assistants — part of the marketing-expert plugin"
metadata:
  emoji: "🗂️"
  vellum:
    category: "marketing"
    display-name: "Marketing Plan"
    activation-hints:
      - "make / build me a marketing plan"
      - "track my marketing progress / keep me on track"
      - "keep this up to date as we go"
      - "organize our GTM / strategy"
      - "where are we / what's left to do"
---

Don't just spew strategy and jump to execution — **organize and retain it.** This skill stands up one master plan document and keeps it current, so the user can stay on track across sessions. The doc, not the chat history, is the source of truth. Reach for it at the start of any multi-step engagement (a launch, a GTM, an ongoing strategy), and offer it proactively rather than waiting to be asked.

## Step graph

### Step 1: Stand up the plan document
Open it in the **Document Writer** so the user can edit inline: call `document_create` with a title like "<Brand> — GTM Strategy & Brand Positioning", then stream sections via `document_update` with `mode: "append"` (capture the `surface_id` from `document_create` and reuse it — don't create a second document). Use these sections:

1. **Positioning** — the canvas / messaging hierarchy (from `positioning-sprint` or `positioning_brief`).
2. **Channel strategy** — the chosen channels and why; what we're *not* doing.
3. **Content / drop calendar** — what ships when.
4. **Paid-ads framework** — target AOV, margin, CAC ceiling, interest buckets, and the gate for when to turn paid on.
5. **Action items** — every next step as a **checkbox** (`- [ ]`), grouped by area, with owners where known.
6. **Open questions** — the few unknowns that would sharpen the plan; keep a numbered section so the user can answer over time.

Pull in whatever's already been decided this session so the doc is complete on creation — don't make the user repeat themselves.

### Step 2: Persist the project to memory
Save the durable project details — brand, positioning one-liner, key decisions, channel choice — to memory (the assistant's remember mechanism), so the plan survives across sessions and you don't re-derive it from scratch next time.

### Step 3: Keep it current
Treat updating the doc as part of every working session, not a separate chore:
- **After any working session**, update the doc in place — check off completed action items (`- [x]`), record new decisions, add new open questions.
- **When the user shares context that changes strategy** (a locked drop date, a new collab, what's working on socials), reflect it immediately.
- **As plans develop into sub-plans** (e.g. a full content calendar for a drop), expand the relevant section rather than starting a new doc.

Edit the existing document via its `surface_id`; never spin up a duplicate.

### Step 4: Make staying-on-track easy
Tell the user how you'll keep it updated, and invite quick notes between sessions ("just locked the drop date," "got a collab") so you can update on the spot. When asked "where are we," answer from the doc: what's done, what's next, what's blocked.

End with: a one-line status (on track / what's next) and a pointer to the document.
