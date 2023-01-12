<script lang="ts">

    import {onMount} from "svelte";
    import {fade} from "svelte/transition";

    export let component;
    export let isTop: boolean = true;
    export let props;

    onMount(()=>{
        console.log("参数:", props);
    })

</script>

<div transition:fade class="tsui-app-module-dialog-board" class:transparent={isTop===false}>
    <div>
        <svelte:component this={component} {...props} on:close/>
    </div>
</div>