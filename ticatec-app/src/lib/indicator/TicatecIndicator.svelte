<script lang="ts">

    import Indicator, {initialize} from "./Indicator";
    import {onMount} from "svelte";
    import { fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    let indicatorMessage: string = '';
    let visible = false;

    const showIndicator = (msg) => {
        indicatorMessage = msg;
        visible = true;
    }

    const hideIndicator = () => {
        visible = false;
    }

    onMount(()=>{
        Indicator.show == null && initialize(showIndicator, hideIndicator);
    })

</script>
{#if visible}
<div class="tsui-indicator-panel" transition:fade="{{delay: 50, duration: 500, opacity: 0.5, easing: quintOut}}">
    <div>
        <span>{indicatorMessage}</span>
    </div>
</div>
{/if}