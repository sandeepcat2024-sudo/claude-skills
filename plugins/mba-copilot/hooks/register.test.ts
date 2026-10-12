import { test, expect } from 'claude-code/testing'

test('/mba lists the commands', async ($, on) => {
  const r = await $.command.run({ command: 'mba' })
  expect(r.text).toContain('/mba-check')
  expect(r.text).toContain('/mba-sync')
})

test('MBA prompts get the skill hint; others do not', async ($, on) => {
  const seen: (readonly string[] | undefined)[] = []
  on('prompt.submit', (_$, e) => {
    seen.push(e.context)
    return { text: e.text, context: e.context }
  })
  await $.prompt.submit({ text: 'check my MBA assignment on Canvas' })
  await $.prompt.submit({ text: 'what is the weather today' })
  expect(seen[0]?.join(' ')).toContain('sandy-mba')
  expect(seen[1]?.join(' ') ?? '').not.toContain('sandy-mba')
})

test('system prompt gains the MBA context section', async ($, on) => {
  on('prompt.compose', () => ({ sections: [{ id: 'intro', text: 'x', scope: 'shared' as const }] }))
  const out = await $.prompt.compose({ model: 'test-model', promptModel: 'test-model', surfaces: [], tools: [], outputStyle: null, traits: [] })
  const mine = out.sections.find(s => s.id === 'mba-copilot:context')
  expect(mine?.scope).toBe('session')
  expect(mine?.text).toContain('mba-copilot')
})
