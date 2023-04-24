import { db } from "$lib/server/db";

export const load = async ({ params, depends }) => {
    depends('events');
    const events = db.prepare('SELECT * FROM calendar WHERE date=@date').all(params);
    return { events };
}