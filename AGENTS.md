# AGENTS.md

## Critical Requirement

Always load the `mastra` skill before performing any Mastra-related work.

Do not rely on cached knowledge because Mastra APIs and patterns may change between versions.

---

## Development Rules

* Register all agents in `src/mastra/index.ts`

* Register all tools in `src/mastra/index.ts`

* Register all workflows in `src/mastra/index.ts`

* Register all scorers in `src/mastra/index.ts`

* Use the scripts defined in `package.json`:

  * `npm run dev`
  * `npm run build`

* Do not run:

  * `mastra dev`
  * `mastra build`

directly from the command line.

---

## Resources

### Mastra Documentation

https://mastra.ai/llms.txt

### Skills Discovery

https://mastra.ai/.well-known/skills/index.json
