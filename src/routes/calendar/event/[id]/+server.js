import { json } from '@sveltejs/kit'
import { db } from "$lib/server/db";
export async function POST({ request, params }) {
    const event = await request.json();
    db.prepare('UPDATE calendar SET name=@name, start_time=@start_time, duration=@duration, note=@note WHERE id=@id')
    .run({...event, ...params});
    return json({message: `edited event ${params.id}`}, {status: 201});
}
export async function DELETE({params}) {
    db.prepare('DELETE FROM calendar WHERE id=@id')
    .run(params);
    return json({message: `deleted event ${params.id}`}, {status: 201});
}