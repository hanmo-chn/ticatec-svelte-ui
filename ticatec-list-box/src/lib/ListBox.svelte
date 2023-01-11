<script lang="ts">
    import './tsui-listbox.scss';
    import {createEventDispatcher, SvelteComponent} from "svelte";
    import type {FunFilter} from "./types";

    export let list:Array<any>;
    export let itemRender: SvelteComponent;
    export let selectable: boolean = true;
    export let filter: FunFilter = null;

    const dispatch = createEventDispatcher();

    let filteredList: Array<any>;
    let selectedItem: any;

    const handleItemClick = (item) => {
        if (selectable) {
            if (selectedItem != item) {
                selectedItem = item;
                dispatch("selectChange", item);
            }
        }
    }

    $: if (list) {
        if (filter) {
            const list = [];
            list.forEach(item => {
                if (filter(item)) {
                    list.push(item)
                }
            });
            filteredList = list;
        } else {
            filteredList = list;
        }

    }

</script>
<div class="tsui-listbox-wrapper">
    <div class="tsui-listbox">
        {#if $$slots.header}
            <div class="listbox-header">
                <slot name="header"></slot>
            </div>
        {/if}
        <div class="listbox-content" class:unselectable={selectable===false}>
            {#if list && itemRender}
                {#each list as item}
                    <div class="listview-item" class:selected={item===selectedItem} on:click={()=>{handleItemClick(item)}}>
                        <svelte:component this={itemRender} {item} selected={item===selectedItem}/>
                    </div>
                {/each}
            {/if}
            <slot></slot>
        </div>
        {#if $$slots.footer}
            <div class="listbox-footer">
                <slot name="footer"></slot>
            </div>
        {/if}
    </div>
</div>