<script lang="ts">
    import TicatecToast from "./toast/TicatecToast.svelte";
    import TicatecIndicator from "./indicator/TicatecIndicator.svelte";
    import MessageBoxPanel from "./message-box/MessageBoxPanel.svelte";
    import {onMount, SvelteComponent} from "svelte";

    export let style: string = '';
    export let DialogButton: SvelteComponent = null;

    onMount(()=>{

    });
</script>
<div class="tsui-app-container-wrapper">
    <div class="tsui-app-container" {style}>
        {#if $$slots['header']}
        <div class="tsui-header">
            <slot name="header"/>
        </div>
        {/if}
        <div class="tsui-content-panel">
            {#if $$slots['sidebar']}
            <div class="tsui-sidebar">
                <slot name="sidebar"/>
            </div>
            {/if}
            <div class="tsui-main-panel">
                <slot/>
            </div>
            {#if $$slots['sidebar-right']}
                <div class="tsui-sidebar-right">
                    <slot name="sidebar-right"/>
                </div>
            {/if}
        </div>
        {#if $$slots['footer']}
        <div class="tsui-footer">
            <slot name="footer"/>
        </div>
        {/if}
    </div>
</div>

<MessageBoxPanel buttonClass={DialogButton}/>
<TicatecIndicator/>
<TicatecToast/>