# marketing-expert

A Vellum assistant plugin that lets your assistant act as a full-stack **marketing
expert** for any business — B2B or B2C; SaaS, ecommerce, marketplace, consumer,
services, and more — **only when the user actually needs marketing help**. The
depth is activated on demand by skills, not bolted onto every turn.

## Install

From the Vellum plugin marketplace:

```bash
assistant plugins install marketing-expert
```

It registers on the next assistant start. (Manual alternative: place this repo's
contents at `<workspaceDir>/plugins/marketing-expert/` and restart.)

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
| `founder-marketing` | Zero-to-one, founder-led growth for little time / no team / ~no budget — the early-stage counterpart to `demand-plan`. |
| `positioning-sprint` | Guided April Dunford positioning + messaging hierarchy. |
| `demand-plan` | Plan worked backward from a pipeline/revenue target through funnel math to channel budget. |
| `launch-playbook` | Tiered product/feature/campaign launch: channels, timeline, owners, success metrics. |
| `content-engine` | Editorial strategy: topic clusters, calendar, SEO briefs, repurposing. |
| `draft-content` | Write the actual copy — blog, social, email, landing page, press release, case study — with headline/CTA guidance. |
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

## Notes

- The hook self-gates on `callSite === "mainAgent"`, so the one-line pointer never
  leaks into background/subagent/compaction calls.
- Built against `@vellumai/plugin-api` (beta; pin the peer-dep range).

## License

MIT — see [LICENSE](LICENSE).
