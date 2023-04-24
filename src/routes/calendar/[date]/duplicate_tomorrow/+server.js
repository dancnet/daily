import { json } from '@sveltejs/kit'
import { db } from "$lib/server/db";
export async function POST({ params }) {
    db.prepare("INSERT INTO calendar (date, name, duration, start_time) SELECT date('now','+1 day') as date, name, duration, start_time FROM calendar WHERE date=@date")
    .run({...params});
    return json({message: `added duplicates`}, {status: 201});
}