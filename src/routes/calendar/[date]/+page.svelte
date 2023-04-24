<script>
    export let data;
    import { goto, invalidate } from '$app/navigation';
    import { page } from '$app/stores';
    import { compute, compute_now } from '$lib/calendar/events_compute';
    import { browser } from '$app/environment';
    import { onDestroy } from 'svelte';
    import { post, http_delete } from '$lib/fetch';
    import dayjs from 'dayjs';
    const date_now = dayjs().format('YYYY-MM-DD');

    $: events = compute(data.events);

    $: ({ date } = $page.params)
    $: today = date === date_now;
    const change_date = () => {
        goto(`/calendar/${date}`);
    }

    // now
    let now = compute_now();
    if (today && browser) {
        let interval = setInterval(() => {
            now = compute_now();
        }, 15000);
        onDestroy(() => {
            clearInterval(interval);
        });
    }

    // duplicate tomorrow
    const duplicate_tomorrow = () => {
        post(data.url + '/duplicate_tomorrow')
        .then(response => {
            console.log(response);
        });
    }

    const delete_event = id => {
        http_delete(`/calendar/event/${id}`)
        .then(response => {
            console.log(response);
            invalidate('events');
        });
    }
</script>

<div class="w3-bar">
    <input class="w3-bar-item w3-hover-light-grey w3-input" type="date" bind:value={date} on:change={change_date}>
    <a class="w3-bar-item w3-hover-light-grey w3-right" href={`/calendar/${date}/new`}>Add New</a>
    <a class="w3-bar-item w3-hover-light-grey w3-right" href={"#"} on:click|preventDefault={duplicate_tomorrow}>Duplicate Tomorrow</a>
</div>
<div class="w3-border canvas">
    {#each events as event (event.id)}
        <div class="w3-border event" style="top: {event.style.top}px; height: {event.style.height}px;">
            <div class="w3-center">
                {#if event.problem !== ''}
                <div class:w3-red={event.problem !== ''} >
                    <i>{event.problem}</i>
                </div>
                {/if}
                <b>{event.name} ({event.start_time})</b> - <a href="/calendar/event/{event.id}">Edit</a> - <a href={"#"} on:click|preventDefault={() => delete_event(event.id)}>Delete</a>
            </div>
            <div class="pre w3-container">
                {event.note}
            </div>
        </div>
    {/each}
    {#if today}
        <div class="now" style="top: {now}px;" />
    {/if}
</div>

<style>
    .canvas {
        position: relative;
        height: 1440px;
        background-color: whitesmoke;
    }
    .event {
        position: absolute;
        width: 100%;
        background-color: white;
        overflow: scroll;
    }
    .now {
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: red;
    }
    .pre {
        white-space: pre-line;
    }
</style>