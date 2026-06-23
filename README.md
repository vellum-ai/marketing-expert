# marketing-expert

A Vellum assistant plugin that lets your assistant act as a full-stack **marketing
expert** for any business — B2B or B2C; SaaS, ecommerce, marketplace, consumer,
services, and more — **only when the user actually needs marketing help**. The
depth is activated on demand by skills, not bolted onto every turn.

## When to use this plugin

Use this plugin when you need your assistant to think and act like a seasoned marketing leader, not just answer marketing questions, but own outcomes. Common triggers:

- **"Help me with marketing" / "I don't know where to start"**: the entry-point skill activates and routes you to the right playbook.
- **Positioning & messaging**: define or sharpen how you describe your product relative to alternatives.
- **Demand & pipeline planning**: work backward from a revenue target to channel budget and funnel math.
- **Product or feature launches**: tiered GTM launch plans with channels, timeline, owners, and metrics.
- **Content & SEO / GEO**: editorial strategy, article briefs, technical SEO audits, GEO articles built to get cited by AI answer engines.
- **Competitive analysis**: evidence-based teardowns and battlecards.
- **Web design & visual assets**: landing pages, simple sites, logos, social graphics, ad creative.
- **Email sequences & brand voice**: nurture flows, onboarding drips, voice definition and enforcement.
- **Board / exec updates**: compute KPIs, frame wins and misses, make asks.

If the request is marketing-related but doesn't map to a specific playbook, the plugin handles it directly with its operating principles and deterministic tools (funnel math, positioning canvas, launch briefs, competitive rubric).

## Install

From the Vellum plugin marketplace:

```bash
assistant plugins install marketing-expert
```

It registers on the next assistant start. (Manual alternative: place this repo's
contents at `<workspaceDir>/plugins/marketing-expert/` and restart.)

## How to start

1. **Install the plugin** (see [Install](#install) above).
2. **Ask your assistant for marketing help.** No special command, just describe what you need. A few examples:

   > "We're a B2B SaaS doing $40k MRR. Help me figure out where to spend our next $5k/month on marketing."
   > "Plan the launch for our new feature next month."
   > "I have no idea where to start with marketing for my side project."

3. **Provide context when asked.** The assistant works best with real numbers: revenue, CAC, conversion rates, budget. If you don't have them yet, it'll tell you what matters and make assumptions explicit.
4. **Follow the playbook.** The activated skill guides you through a structured workflow and calls the right tools (funnel math, positioning canvas, etc.) inline. You'll get quantified recommendations and 2 to 3 prioritized next actions, not generic advice.

## How it works — three layers

| Layer | What it is | What it's for |
| --- | --- | --- |
| **Hook** (`hooks/pre-model-call.ts`) | A single-line activation pointer appended to the system prompt | Awareness — so the model engages marketing-expert mode when marketing comes up |
| **Skills** (`skills/`) | On-demand step-graph playbooks; **trigger on marketing requests** | The mindset + rigorous, repeatable workflows |
| **Tools** (`tools/`) | Deterministic helpers the model calls inline | Math & structured scaffolds it shouldn't improvise |

**Activation model:** nobody opens the assistant looking for a "marketing expert,"
so the system-prompt footprint is one line (`src/marketing-expert-frame.ts`). The
persona, operating principles, and competency depth live in the on-demand
`marketing-expert` skill, which fires when the user asks for marketing help and
routes to the specific playbooks below.

## Skills

| Skill | What it does |
| --- | --- |
| `marketing-expert` | Entry point: the persona + operating principles, and a router to the playbooks below. Triggers on broad asks ("help with marketing", "be my CMO", "marketing strategy"). |
| `marketing-plan` | Stand up and **maintain** one living GTM plan doc (positioning, channels, calendar, paid-ads framework, action-item checkboxes) across sessions — so strategy is organized and tracked, not one-shotted into chat. |
| `founder-marketing` | Zero-to-one, founder-led growth for little time / no team / ~no budget — the early-stage counterpart to `demand-plan`. |
| `positioning-sprint` | Guided April Dunford positioning + messaging hierarchy. |
| `demand-plan` | Plan worked backward from a pipeline/revenue target through funnel math to channel budget. |
| `launch-playbook` | Tiered product/feature/campaign launch: channels, timeline, owners, success metrics. |
| `content-engine` | Editorial strategy: topic clusters, calendar, SEO briefs, repurposing. |
| `draft-content` | Write the actual copy — blog, social, email, landing page, press release, case study — with headline/CTA guidance. |
| `web-design` | Front-end design: landing pages and simple sites — lock the aesthetic up front, build clean responsive markup, structure for conversion. |
| `visual-assets` | Graphic / media design: logos, social graphics, ad creative — distinct concept directions, proactive iteration, export-ready output. |
| `email-sequence` | Design multi-email nurture / onboarding / drip / re-engagement flows. |
| `brand-voice` | Define and enforce a brand voice; review drafts for on-brand-ness. |
| `seo-audit` | Traditional search SEO audit: keywords, on-page, technical, content gaps, competitors. |
| `geo-audit` | One-command technical GEO audit (AI-crawler access, llms.txt, rendering, schema). |
| `geo-writing` | GEO/AEO articles built to get cited by AI answer engines (ChatGPT, Perplexity, Claude, Gemini). |
| `competitive-teardown` | Evidence-based competitor teardown → battlecard-ready output. |
| `board-report` | Exec/board marketing update: compute KPIs, frame wins/misses/asks. |

## Tools

- **`funnel_math`** — CAC (blended & paid), LTV, LTV:CAC, payback months, and
  stage→stage→revenue funnel projections (B2B or B2C), with health flags. Real arithmetic.
- **`positioning_brief`** — April Dunford positioning canvas + gap checklist.
- **`gtm_launch_plan`** — tiered launch/campaign brief: channels, timeline, owners, budget split, funnel-tied metrics.
- **`competitive_scan`** — competitor investigation rubric + comparison format (filled with the assistant's web tools).

## Verify

1. After install, confirm load in the daemon logs (no `marketing-expert` load error).
2. Ask for marketing help (e.g. "how are we doing on CAC?" with some numbers, or
   "plan our Q3 launch") and confirm the right skill activates, the reply reads
   like a marketing expert, and `funnel_math` is called for any math.

## Operating principles

Beyond the marketing fundamentals, the `marketing-expert` skill enforces four
execution principles drawn from real-user feedback:

- **Brief first; depth in a document.** Lead with a skimmable answer, ask for
  inputs as structured options, and push long strategy into the `marketing-plan`
  doc — not a wall of text in chat.
- **Default to action through the browser.** Live web tasks (handle checks,
  scraping IG/TikTok, dashboard logins) go straight to browser automation instead
  of stalling or handing the task back.
- **Set integrations up, don't just describe them.** Check whether the user has an
  account, serve the signup/API link, and collect secrets via the secure prompt
  before touching integration code.
- **Be honest about data confidence.** Label numbers as measured vs. inferred and
  name the tool that gets real data first — never present guesses as validated.

These assume the host assistant provides a browser/automation tool and a secure
credential prompt; without them the behaviors degrade to explaining the steps.

## Notes

- The hook self-gates on `callSite === "mainAgent"`, so the one-line pointer never
  leaks into background/subagent/compaction calls.
- Built against `@vellumai/plugin-api` (beta; pin the peer-dep range).

## License

MIT — see [LICENSE](LICENSE).
