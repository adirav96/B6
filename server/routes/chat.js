import { Router } from 'express';
import Anthropic from '@anthropic-ai/sdk';
import auth from '../middleware/auth.js';
import { chatLimiter } from '../middleware/rateLimiter.js';
import { validateChatRequest } from '../utils/validators.js';
import { escapePromptText } from '../utils/security.js';

const router = Router();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Add authentication and rate limiting
router.use(auth);
router.use(chatLimiter);

router.post('/', async (req, res) => {
  const { problem, messages, code, hintsRevealed } = req.body;

  const validationErrors = validateChatRequest({ problem, messages, code, hintsRevealed });
  if (validationErrors.length > 0) {
    return res.status(400).json({ error: validationErrors.join('; ') });
  }

  const examplesText = problem.examples?.length
    ? '\nדוגמאות:\n' + problem.examples.map((ex, i) =>
        `דוגמה ${i + 1}: קלט: ${escapePromptText(ex.input)} → פלט: ${escapePromptText(ex.output)}${ex.explanation ? ` (${escapePromptText(ex.explanation)})` : ''}`
      ).join('\n')
    : '';

  const constraintsText = problem.constraints?.length
    ? '\nאילוצים:\n' + problem.constraints.map(c => `- ${escapePromptText(c)}`).join('\n')
    : '';

  const hintsText = hintsRevealed?.length
    ? '\nרמזים שהמשתמש כבר קיבל:\n' + hintsRevealed.map((h, i) => `רמז ${i + 1}: ${escapePromptText(h.content ?? h)}`).join('\n')
    : '';

  const systemPrompt = `אתה מראיין טכני בעברית לתפקיד מפתח תוכנה. אתה מנהל ראיון קידוד על הבעיה הבאה:

שם הבעיה: ${escapePromptText(problem.title)} (${escapePromptText(problem.titleHe)})
רמת קושי: ${escapePromptText(problem.difficulty)}
נושא: ${escapePromptText(problem.topic)}
תיאור: ${escapePromptText(problem.descriptionHe)}
${examplesText}${constraintsText}

הנחיות:
- דבר אך ורק בעברית
- אל תיתן את הפתרון ישירות - הנחה את המשתמש להגיע אליו בעצמו
- שאל שאלות בוחנות על סיבוכיות זמן ומקום
- עודד חשיבה על edge cases
- כשהמשתמש תקוע, תן רמז קטן בלבד
- היה מעודד אך מקצועי
- אם המשתמש כבר קיבל רמזים, אל תחזור עליהם - המשך מהם קדימה
${hintsText}
${code?.trim() ? `\nהקוד הנוכחי של המשתמש:\n\`\`\`\n${code}\n\`\`\`` : ''}`;

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: systemPrompt,
      messages: messages.map(({ role, content }) => ({ role, content })),
    });

    res.json({ reply: response.content[0].text });
  } catch (err) {
    console.error('Anthropic API error:', err.message);
    res.status(500).json({ error: 'שגיאה בתקשורת עם ה-AI' });
  }
});

export default router;
