// File path: src/handlers/lessonsHandler.ts
import { supabase } from '../supabaseClient';
import { isHoneypotFilled } from '../utils/checkHoneypot';
// POST /lessons
export async function postLesson(c) {
    try {
        const rawBody = await c.req.json();
        // Sanitize year_event_happened from empty string to null
        const sanitizedYearEvent = rawBody.year_event_happened === '' || rawBody.year_event_happened === undefined
            ? null
            : rawBody.year_event_happened;
        const body = {
            ...rawBody,
            year_event_happened: sanitizedYearEvent,
        };
        // Honeypot check:
        if (isHoneypotFilled(body)) {
            return c.json({ success: false, message: 'Spam detected' }, 403);
        }
        // Validate required fields:
        if (!body.nickname ||
            !body.event_experienced ||
            !body.describe_lesson_learned ||
            !body.inspirational_message_for_others) {
            return c.json({ success: false, message: 'Missing required fields' }, 400);
        }
        // Insert into Supabase:
        const { data, error } = await supabase.from('lessons_learned').insert([
            {
                nickname: body.nickname,
                event_experienced: body.event_experienced,
                describe_lesson_learned: body.describe_lesson_learned,
                inspirational_message_for_others: body.inspirational_message_for_others,
                post_created_date: body.post_created_date || new Date().toISOString(),
                year_event_happened: body.year_event_happened,
            }
        ])
            .select();
        if (error) {
            console.error('Supabase insert error:', error);
            return c.json({ success: false, message: error.message }, 500);
        }
        return c.json({ success: true, data });
    }
    catch (err) {
        console.error(err);
        return c.json({ success: false, message: 'Invalid JSON or server error' }, 500);
    }
}
// GET ALL /lessons
export async function getAllLessons(c) {
    try {
        const { data, error } = await supabase.from('lessons_learned').select('*').order('post_created_date', { ascending: false });
        if (error) {
            console.error('Supabase fetch error:', error);
            return c.json({ success: false, message: error.message }, 500);
        }
        return c.json({ success: true, data });
    }
    catch (err) {
        console.error(err);
        return c.json({ success: false, message: 'Server error' }, 500);
    }
}
