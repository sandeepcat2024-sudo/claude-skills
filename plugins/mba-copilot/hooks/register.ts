import type { Register } from 'claude-code'

const SKILL = 'sandy-mba'

const CONTEXT = [
  "Sandy's MBA (mba-copilot mod): MBA programme on Canvas; course material synced to the Drive MBA folder.",
  `For any MBA, coursework, Canvas, assignment, exam or study request, load the \`${SKILL}\` skill and follow it.`,
  "Drive: folder \"MBA\" holds the corrected assignments; \"MBA/Corrected\" holds the two correction logs; \"MBA/Canvas Downloads\" holds course material by course.",
  "Use MBA frameworks (marketing analytics, channel/GTM, B2B tech sales, SAPM, OM, forecasting, CSR) as evidence when advising the GTM, IT services or agri setups, but never mix those setups' data.",
  "Recompute every number in an assignment before calling it right; never invent case facts, grades or sources.",
].join(' ')

const MBA_WORDS = /\b(mba|pgpm|soil|canvas|assignment|coursework|course outline|quiz|end[- ]term|mid[- ]term|case study|professor|faculty)\b/i

const COMMANDS = [
  { name: 'mba', description: 'MBA co-pilot: list what I can do for your MBA' },
  { name: 'mba-check', description: 'Review and correct an MBA assignment', argumentHint: '[file name or course]' },
  { name: 'mba-study', description: 'Study a course: notes, practice questions, model answers', argumentHint: '[course or topic]' },
  { name: 'mba-sync', description: 'Pull new Canvas files and submissions into the Drive MBA folder' },
] as const

const PROMPTS: Record<string, (args: string) => string> = {
  'mba-check': a =>
    `Use the ${SKILL} skill in "review and correct" mode on ${a || 'my most recent MBA assignment on Canvas'}: read the brief and grader comments, recompute every number, list errors (major / medium / minor), write the corrected file and log the changes.`,
  'mba-study': a =>
    `Use the ${SKILL} skill in "tutor" mode for ${a || 'the course I should revise next'}: give 80%-of-the-way notes, the key formulas or frameworks, 5 practice questions with model answers, and the traps graders punish.`,
  'mba-sync': () =>
    `Use the ${SKILL} skill in "sync" mode: compare all my Canvas courses and submissions with the Drive MBA folder (name + size), upload only what is missing into MBA/Canvas Downloads/<course>, verify sizes, and report counts per course.`,
}

const MENU = [
  'MBA co-pilot commands:',
  '  /mba-check [file or course]  review and correct an assignment',
  '  /mba-study [course or topic] notes, practice questions, model answers',
  '  /mba-sync                    pull new Canvas files into Drive',
  `Any message about your MBA also loads the ${SKILL} skill automatically.`,
].join('\n')

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    for (const c of COMMANDS) await $.command.register({ ...c })
    return next(e)
  })

  on('prompt.compose', async ($, e, next) => {
    const out = await next(e)
    return {
      sections: [
        ...out.sections.filter(s => s.id !== 'mba-copilot:context'),
        { id: 'mba-copilot:context', text: CONTEXT, scope: 'session' as const },
      ],
    }
  })

  on('prompt.submit', async ($, e, next) => {
    if (!MBA_WORDS.test(e.text)) return next(e)
    const hint = `This message is about Sandy's MBA: load the ${SKILL} skill before answering.`
    return next({ ...e, context: [...(e.context ?? []), hint] })
  })

  on('command.run', { command: 'mba' }, async () => ({ text: MENU }))

  for (const name of Object.keys(PROMPTS)) {
    on('command.run', { command: name }, async ($, e) => {
      await $.prompt.submit({ text: PROMPTS[name](e.args.trim()), asUser: true })
      return { text: `mba-copilot: started /${name}${e.args.trim() ? ' ' + e.args.trim() : ''}` }
    })
  }
}
