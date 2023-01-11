<script lang="ts">

    import "./ticatec-summary-table.css"
    import type Column from "./Column";
    import TableColumns from "./TableColumns";
    import {onMount} from "svelte";
    import type TableOptions from "./TableOptions";
    import chevron from './chevron_icon.svg';
    import {createEventDispatcher} from "svelte";

    export let columns: Array<Column> = [];
    export let list: [];
    export let style: string = '';
    export let hasMore: boolean = true;

    const dispatch = createEventDispatcher();
    let offsetX: number = 0;
    let offsetY: number = 0;
    let width: number;
    let tabWidth: number;
    let tableCols: TableColumns;
    let options: TableOptions = {};
    let inlineStyle: string = '';


    $: {
        if (tableCols != null) {
            tableCols.setClientWidth(width);
            inlineStyle = tableCols.toInlineStyle();
            tabWidth = tableCols.width;
        }
    }

    let tableView;

    const parseScroll = () => {
        offsetX = - tableView.scrollLeft;
        offsetY = - tableView.scrollTop;
    }

    onMount(async () => {
        tableCols = new TableColumns(columns, width, options);
        inlineStyle = tableCols.toInlineStyle();
        tabWidth = tableCols.width;
    })

    const getCellContent = (item: any, col: Column) => {
        let value = col.field == null ? item : item[col.field];
        let text = (col.formatter != null ? col.formatter(value) : value) || text;
        if (col.escapeHTML != true) {
            text = `<span>${text}</span>`
        }
        return text;
    }

    let clickEnable = true;
    const handleChevronClick = (item: any) => {
        if (clickEnable) {
            clickEnable = false;
            dispatch('chevronClick', item);
            setTimeout(()=>{clickEnable = true}, 500)
        }
    }

    const loadMore =() => {
        if (clickEnable) {
            clickEnable = false;
            dispatch('loadMore');
            setTimeout(()=>{clickEnable = true}, 500)
        }
    }

</script>
<div class="ticatec-summary-table" bind:clientWidth={width} {style}>
    {#if tableCols}
        {@html inlineStyle}
        <div class="summary-table-header-wrapper" style="height: {tableCols.headerHeight}px">
            <div class="summary-table-header" style="left: {offsetX}px">
                <table style="width: {tabWidth}px;">
                    <tr>
                        <th class="summary-col col-0" style="height: {tableCols.headerHeight}px">
                            <span></span>
                        </th>
                        {#each columns as col, idx}
                            <th class="summary-col col-{idx+1}">
                                <span>{col.label}</span>
                            </th>
                        {/each}
                        <th class="summary-col col-{columns.length+1}"><span></span></th>
                    </tr>
                </table>
            </div>
        </div>
        <div class="summary-table-data" bind:this={tableView} on:scroll={parseScroll}>
            {#if list && list.length > 0}
            <table style="width: {tabWidth}px;">
                {#each list as item, idx}
                <tr>
                    <td class="summary-col col-0" class:alternative={idx % 2 == 1} style="height: {tableCols.rowHeight}px">
                        <span></span>
                    </td>
                    {#each columns as col, colIdx}
                        <td class="summary-col col-{colIdx+1}" class:alternative={idx % 2 == 1}>
                            {#if (col.isHref == true && col.onClick != null)}
                                <a href="javascript:void(0)" on:click={()=>{col.onClick(item)}}>{@html getCellContent(item, col)}</a>
                            {:else}
                                {@html getCellContent(item, col)}
                            {/if}
                        </td>
                    {/each}
                    <td class="summary-col col-{columns.length+1}" class:alternative={idx % 2 == 1}><span></span></td>
                </tr>
                {/each}
            </table>
            {:else}
                <div style="width: {tabWidth}px;text-align: center; padding-top: 8px"><span>没有符合条件的数据</span></div>
            {/if}
        </div>
        <div class="summary-table-fixed-col-wrapper" style="padding-top: {tableCols.headerHeight}px">
            <div class="summary-table-fixed-col">
                <div class="summary-table-fixed-rows" style="top: {offsetY}px">
                    {#each list as item, idx}
                        <div class:alternative={idx % 2 == 1} style="height: {tableCols.rowHeight}px; line-height: {tableCols.rowHeight}px;"><span>{idx+1}</span></div>
                    {/each}
                </div>
            </div>
        </div>
        <div class="summary-table-indicator-col-wrapper" style="padding-top: {tableCols.headerHeight}px">
            <div class="summary-table-indicator-col">
                <div class="summary-table-indicator-rows" style="top: {offsetY}px">
                    {#each list as item, idx}
                        <div class:alternative={idx % 2 == 1}>
                            <img on:click={()=>handleChevronClick(item)} src={chevron} style="width: 20px; height: 20px"/>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
    {#if hasMore}
        <div class="load-more" on:click={loadMore}><span>点击获取更多数据...</span></div>
    {/if}
</div>