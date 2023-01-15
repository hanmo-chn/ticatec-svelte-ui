<script lang="ts">

    import type Column from "./Column";
    import TableColumns from "./TableColumns";
    import {onMount} from "svelte";
    import type TableOptions from "./TableOptions";
    import chevron from './chevron_icon.svg';
    import {createEventDispatcher} from "svelte";
    import SummaryRow from "./SummaryRow.svelte";

    export let columns: Array<Column> = [];
    export let list: [];
    export let style: string = '';
    export let hasMore: boolean = true;

    const dispatch = createEventDispatcher();

    const id:string = 'table_' + (new Date()).getTime().toString(36);
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
            inlineStyle = tableCols.toInlineStyle(id);
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
        inlineStyle = tableCols.toInlineStyle(id);
        tabWidth = tableCols.width;
    })

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
<div id={id} class="tsui-summary-table" bind:clientWidth={width} {style}>
    {#if tableCols}
        {@html inlineStyle}
        <div class="tsui-table-header" style="height: {tableCols.headerHeight}px">
            <div class="" style="left: {offsetX}px">
                <table style="width: {tabWidth}px;">
                    <tr>
                        <th class="table-col col-0" style="height: {tableCols.headerHeight}px">
                            <span></span>
                        </th>
                        {#each columns as col, idx}
                            <th class="table-col col-{idx+1}">
                                <span>{col.label}</span>
                            </th>
                        {/each}
                        <th class="table-col col-{columns.length+1}"><span></span></th>
                    </tr>
                </table>
            </div>
        </div>
        <div class="summary-table-data" bind:this={tableView} on:scroll={parseScroll}>
            {#if list && list.length > 0}
            <table style="width: {tabWidth}px;">
                {#each list as item, idx}
                <SummaryRow {item} isAlterRow={idx % 2 === 1} {columns} rowHeight={tableCols.rowHeight}/>
                {/each}
            </table>
            {:else}
                <div style="width: {tabWidth}px;text-align: center; padding-top: 8px"><span>没有符合条件的数据</span></div>
            {/if}
        </div>
        <div class="fixed-col-panel" style="padding-top: {tableCols.headerHeight}px">
            <div>
                <table style="top: {offsetY}px">
                    {#each list as item, idx}
                    <tr class:alternative={idx % 2 === 1}>
                        <td class="table-col col-0" style="height: {tableCols.rowHeight}px">
                            <span>{idx+1}</span>
                        </td>
                    </tr>
                    {/each}
                </table>
            </div>
        </div>
        <div class="indicator-col-panel" style="padding-top: {tableCols.headerHeight}px">
            <div>
                <table style="top: {offsetY}px" >
                    {#each list as item, idx}
                        <tr class:alternative={idx % 2 === 1}>
                            <td class="table-col col-{columns.length+1}" style="height: {tableCols.rowHeight}px" >
                                <img on:click={()=>handleChevronClick(item)} src={chevron} style="width: 20px; height: 20px"/>
                            </td>
                        </tr>
                    {/each}
                </table>
            </div>
        </div>
    {/if}
    {#if hasMore}
        <div class="load-more" on:click={loadMore}><span>点击获取更多数据...</span></div>
    {/if}
</div>