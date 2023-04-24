<script>
    export let data = null;
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let name = data ? data.event.name : '';
    let start_time = data ? data.event.start_time : '';
    let duration = data ? data.event.duration : '';
    let note = data ? data.event.note : '';

    const submit = () => {
        dispatch('submit', {
            name,
            start_time,
            duration,
            note
        });
    }
</script>

<form class="w3-section w3-border w3-round" autocomplete="off" on:submit|preventDefault={submit}>
    <div class="w3-container">
        <p>
            <label class="" for="name"><b>Name</b></label>
            <input class="w3-input w3-border" type="text" id="name" bind:value={name} required>
        </p>
        <p>
            <label class="" for="start_time"><b>Start Time</b></label>
            <input class="w3-input w3-border" type="text" id="start_time" bind:value={start_time} pattern="^([0-1]?[0-9]h|2[0-3]h)([0-5][0-9])$" required>
        </p>
        <p>
            <label class="" for="duration"><b>Duration</b></label>
            <input class="w3-input w3-border" type="text" id="duration" bind:value={duration} pattern="^([0-1]?[0-9]h|2[0-3]h)([0-5][0-9])?$" required>
        </p>
        <p>
            <label class="" for="note"><b>Note</b></label>
            <textarea class="w3-input w3-border" type="text" id="note" bind:value={note} />
        </p>
        <p class="w3-center">
            <button class="w3-btn w3-border" type="submit">{data ? 'Edit' : 'Add'}</button>
        </p>
    </div>
</form>

<style>
    textarea {
        resize: vertical;
    }
</style>