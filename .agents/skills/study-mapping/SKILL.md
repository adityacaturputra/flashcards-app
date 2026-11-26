---
name: study-mapping
description: >-
  Add, analyze, or expand English grammar & IELTS error-analysis entries in the
  Study Mapping dataset (src/data/mappings/index.ts). Use when the user shares a
  grammar question, error analysis, or English rule to map.
---

# Study Mapping Workflow Skill

Follow the full protocol in [MAPPING_WORKFLOW.md](../../../MAPPING_WORKFLOW.md) and these core rules:

1. **Immediate Educational Delivery First**: Always explain the rule, formula breakdown, comparison table, and correct answer directly in chat BEFORE any repo edits.
2. **Search-First Deduplication**: Grep `src/data/mappings/index.ts` for the topic/phrase first. If an entry exists, **edit and expand** it rather than creating a duplicate.
3. **Bottom-Up Inspection**: Read the tail/bottom of `src/data/mappings/index.ts` to find the newest entries and insertion point.
4. **Rich Remarks**: Include Markdown, KaTeX math formulas (`$$...$$` / `$...$`), comparison tables, and memory tips adhering to `MappingItem`.
5. **Fast Data-Only Turn**: Skip `npm run build` for pure `src/data/mappings/index.ts` updates; pure data commits are authorized per `AGENTS.md`.
