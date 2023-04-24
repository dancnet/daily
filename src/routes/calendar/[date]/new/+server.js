import { json } from '@sveltejs/kit'
import { db } from "$lib/server/db";
export async function POST({ request, params }) {
    const event = await request.json();
    db.prepare('INSERT INTO calendar (name, date, start_time, duration, note) VALUES (@name, @date, @start_time, @duration, @note)')
    .run({...event, ...params});
    return json({message: 'created new event'}, {status: 201});
}