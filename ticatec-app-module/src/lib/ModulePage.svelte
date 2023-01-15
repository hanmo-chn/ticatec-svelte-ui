<script lang="ts">
    import {fly} from "svelte/transition";
    import {onMount, tick} from "svelte";

    export let page;
    export let pageBoard;
    export let active: boolean = true;

    onMount(async ()=>{
        await tick();
    })

</script>
<div transition:fly="{{ x: 600, duration: 500 }}" class="tsui-stack-page-board" style="{active ? 'background-color: #ffffff00' : ''}">
    <div>
        <svelte:component this={page.component} {pageBoard} {...page.props} on:close/>
    </div>
</div>