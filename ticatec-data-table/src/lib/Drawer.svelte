<script lang="ts">
    import {fly} from "svelte/transition";
    import {clickOutside} from './ClickOutside';

    export let open: boolean = false;
    export let width:number = 300;

</script>
{#if open}
<div use:clickOutside on:click_outside={()=>{open=false}}
     class="tsui-drawer-wrapper" style="width: {width}px" transition:fly={{ x: -width, duration: 1000, opacity: 0.5 }}>
    <slot></slot>
</div>
{/if}