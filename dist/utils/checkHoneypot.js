// src/utils/checkHoneypot.ts
export function isHoneypotFilled(body) {
    // Check if the honeypot field 'year_event_happened' is set and not zero/null/empty
    const value = body.year_event_happened;
    return value !== undefined && value !== null && value !== 0 && value !== '';
}
