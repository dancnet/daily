import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';

export function load() {
    const date = dayjs().format('YYYY-MM-DD');
    throw redirect(302, `/calendar/${date}`);
}