<script>
    export let data;
    import { post } from '$lib/fetch';
    import Event from '$lib/calendar/event.svelte';
    const add = e => {
        post(data.url, e.detail)
        .then(response => {
            console.log(response);
            history.back();
        });
    }
</script>

<Event on:submit={add} />