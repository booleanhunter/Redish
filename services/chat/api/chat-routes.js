// services/chat/api/chat-routes.js
import { Router } from 'express';
import { endUserSession, getReplyFromGroceryAgent } from '../domain/chat-service.js';

const router = Router();

// POST /chat
router.post('/', async function(req, res, next) {
    const { message, sessionId, chatId, useSmartRecall } = req.body;

    if (!message || !sessionId) {
        return res.status(400).json({ error: 'Missing message or sessionId' });
    }

    try {
        const reply = await getReplyFromGroceryAgent(sessionId, chatId, message, useSmartRecall);
        res.json({ 
            content: reply.content,
            isCachedResponse: reply.isCachedResponse
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

router.post('/end-session', async function(req, res, next) {
    const { sessionId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ error: 'Missing sessionId' });
    }

    try {
        const result = await endUserSession(sessionId);
        res.json(result);
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

export default router;