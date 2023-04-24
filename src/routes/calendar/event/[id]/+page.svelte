<script>
    export let data;
    import Event from '$lib/calendar/event.svelte';
    import { post } from '$lib/fetch';

    const edit = e => {
        post(data.url, e.detail)
        .then(response => {
            console.log(response);
            history.back();
        });
    }
</script>

<Event {data} on:submit={edit} />