/**
 * `competitive_scan` tool — returns a structured investigation rubric and a
 * comparison-table format for analyzing a competitor. It does NOT fetch the web
 * itself (the assistant already has web_search / web_fetch); it scaffolds the
 * rigor so the analysis is consistent and complete.
 *
 * Bundled tool for the `competitive-teardown` skill: it activates only while the
 * skill is loaded and runs in the skill sandbox.
 */

import type { ToolContext, ToolExecutionResult } from "@vellumai/plugin-api";

interface ScanInput {
  competitor?: string;
  your_product?: string;
  dimensions?: string[];
}

const DEFAULT_DIMENSIONS = [
  "Positioning & category (how they frame themselves)",
  "Target ICP & segments",
  "Pricing & packaging (tiers, model, transparency)",
  "Product strengths & notable gaps",
  "GTM motion (PLG vs sales-led, channels)",
  "Messaging & proof points (customers, metrics)",
  "Content & SEO footprint",
  "Recent moves (launches, funding, hires, pivots — last 6–12 months)",
];

export async function run(
  input: Record<string, unknown>,
  _context: ToolContext,
): Promise<ToolExecutionResult> {
  const i = (input ?? {}) as ScanInput;
  const dimensions = Array.isArray(i.dimensions) && i.dimensions.length ? i.dimensions : DEFAULT_DIMENSIONS;
  const competitor = i.competitor ?? "<competitor>";
  const you = i.your_product ?? "<your product>";

  const rubric = {
    competitor,
    your_product: you,
    instructions: [
      "Use web_search/web_fetch to gather evidence for each dimension below.",
      "Cite the source URL for every claim; mark inferences as inferred.",
      "Fill the comparison table, then end with: where you win, where they win, and 2–3 recommended responses.",
    ],
    dimensions_to_investigate: dimensions,
    comparison_table_format: {
      columns: ["Dimension", competitor, you, "Edge", "So what (action)"],
      note: "One row per dimension. 'Edge' = who is stronger. 'So what' = the marketing/product implication.",
    },
    output_sections: [
      "Comparison table (filled)",
      "Where we win / where they win",
      "Likely objections this competitor raises about us, and our counters",
      "2–3 recommended responses (messaging, content, or product asks)",
    ],
  };

  return { content: JSON.stringify(rubric, null, 2), isError: false };
}
