<script lang="ts">

    import {createEventDispatcher} from "svelte";
    import Popover from 'tsui-common'
    import iconClose from './close.svg';
    import iconMore from './more.svg';

    export let tabItems: Array<any>;
    export let maxCount: number = 8;

    let activeItem: any = null;

    let visItems: Array<any> = [];
    let hideItems: Array<any>;
    let popover;

    const dispatch = createEventDispatcher();

    const handleTabClick = (item: any) => {
        console.log("tab clicked", item);
        activeItem = item;
        dispatch('select', item);
    }

    const handleIconCloseClick = (e, item: any) => {
        dispatch('close', item);
        if (item == activeItem) {
            let activeIdx = tabItems.indexOf(item);
            tabItems.splice(activeIdx, 1);
            activeIdx--;
            if (activeIdx < 0) {
                activeIdx = 0;
            }
            activeItem = tabItems.length > 0 ? tabItems[activeIdx] : null;
            dispatch('select', activeItem);
        }
        tabItems = [...tabItems];
        e.stopPropagation();
        e.stopImmediatePropagation();
    }

    const showHiddenTab = (item: any): void => {
        activeItem = item;
        const activeIdx = tabItems.indexOf(item);
        tabItems.splice(activeIdx, 1);
        tabItems.splice(0, 0, item);
        dispatch('select', item);
        tabItems = [...tabItems];
    }

    $: if (tabItems) {
        if (tabItems.length > maxCount) {
            visItems = tabItems.slice(0, maxCount);
            hideItems = tabItems.slice(maxCount);
        } else {
            visItems = [...tabItems];
            hideItems = [];
        }
        console.log(visItems, hideItems)
    }


</script>
<div class="tsui-tab-page-container">
    <div class="tsui-tab-bar" style="grid-template-columns: repeat({maxCount}, auto) 60px">
        {#each visItems as item, i}
            <div class="tsui-tab" class:active={item===activeItem} on:click={()=>{handleTabClick(item)}}>
                <div>
                    <span>{item.title}</span>
                    <img src={iconClose} on:click={(e)=>{handleIconCloseClick(e, item)}}>
                </div>
            </div>
        {/each}
        {#if hideItems && hideItems.length > 0}
            <div class="tsui-tab-more">
                <img src={iconMore} on:click={popover.doOpen()}/>
            </div>
        {/if}
    </div>
    <div class="tsui-tab-page-panel">
        <slot/>
    </div>
    {#if hideItems && hideItems.length > 0}
    <div class="tsui-tab-pop-items">
        <Popover bind:this={popover} posX="right">
            <div class="tsui-backup-tabs">
                {#each hideItems as item, i}
                    <div on:click={()=>{showHiddenTab(item)}}>{item.title}</div>
                {/each}
            </div>
        </Popover>
    </div>
    {/if}
</div>
<div class="ticatec-tab-wrap">

</div>