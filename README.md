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

| Skill | Try this | What you get |
| --- | --- | --- |
| `marketing-expert` | "Help me with marketing, I don't know where to start" | The right playbook activated, plus a prioritized plan tied to your funnel and unit economics |
| `marketing-plan` | "Stand up a GTM plan I can keep updating" | A living plan doc (positioning, channels, calendar, ad framework, tracked action items) maintained across sessions |
| `founder-marketing` | "I'm a solo founder with no budget, how do I get my first customers?" | A zero-to-one growth plan: the 2 to 3 channels to run now and what to ignore |
| `positioning-sprint` | "What's our positioning? Help me sharpen it" | A Dunford positioning canvas and a messaging hierarchy ready for the site |
| `demand-plan` | "I need $500k in pipeline next quarter, what's the plan?" | A budget-by-channel plan worked backward from the target through funnel math |
| `launch-playbook` | "Plan the launch for our new feature next month" | A tiered launch brief: channels, timeline, owners, and success metrics |
| `content-engine` | "Build me a content strategy and editorial calendar" | Topic clusters, a calendar, SEO briefs, and a repurposing plan |
| `draft-content` | "Write the landing page copy for our new product" | Ready-to-ship copy with headline and CTA guidance |
| `web-design` | "Design a landing page for this product" | A clean, responsive, conversion-structured page that doesn't look templated |
| `visual-assets` | "Make me a logo and a set of social graphics" | Distinct concept directions and export-ready creative |
| `email-sequence` | "Design a 5-email onboarding drip" | A full sequence with goals, timing, subject lines, and body copy per email |
| `brand-voice` | "Define our brand voice and check if this draft is on-brand" | A documented voice and a flagged, corrected draft |
| `seo-audit` | "Why aren't we ranking? Audit our SEO" | A prioritized audit: keywords, on-page, technical, content gaps, competitors |
| `geo-audit` | "Run a GEO audit on our site" | A technical report on AI-crawler access, llms.txt, rendering, and schema |
| `geo-writing` | "Write an article built to get cited by ChatGPT and Perplexity" | A GEO/AEO article structured to be quoted by AI answer engines |
| `competitive-teardown` | "How do we compare to [competitor]?" | An evidence-based teardown and a battlecard-ready output |
| `board-report` | "Build our marketing update for the board" | Computed KPIs and a wins / misses / asks narrative |

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
