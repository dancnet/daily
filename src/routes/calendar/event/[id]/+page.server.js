import { db } from "$lib/server/db";

export const load = async ({ params }) => {
    const event = db.prepare('SELECT * FROM calendar WHERE id=@id').get(params);
    return { event };
}