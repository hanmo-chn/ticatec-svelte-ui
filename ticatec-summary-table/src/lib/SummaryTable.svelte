<script lang="ts">

    import type Column from "./Column";
    import TableColumns from "./TableColumns";
    import {onMount} from "svelte";
    import type TableOptions from "./TableOptions";
    import {createEventDispatcher} from "svelte";
    import SummaryRow from "./SummaryRow.svelte";

    export let columns: Array<Column> = [];
    export let list: [];
    export let style: string = '';
    export let hasMore: boolean = true;
    export let table$style: string = '';
    export let bar$class: string = '';


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

    const loadMore =() => {
        if (clickEnable) {
            clickEnable = false;
            dispatch('loadMore');
            setTimeout(()=>{clickEnable = true}, 500)
        }
    }

    $: console.log("列：", columns, "数据：", list);


</script>
<div id={id} class="tsui-summary-table" {style}>
    {#if $$slots['title-bar']}
    <div class="title-bar {bar$class}">
        <slot name="title-bar"/>
    </div>
    {/if}
    {#if tableCols}
        {@html inlineStyle}
        <div class="tsui-table-header">
            <div class="" style="left: {offsetX}px">
                <table style="width: {tabWidth}px;">
                    <tr>
                        {#each columns as col, idx}
                            <th class="table-col col-{idx}">
                                <div><span>{col.label}</span></div>
                            </th>
                        {/each}
                        <th class="table-col col-{columns.length+1}"><span></span></th>
                    </tr>
                </table>
            </div>
        </div>
        <div class="summary-table-data" bind:clientWidth={width} bind:this={tableView} on:scroll={parseScroll} style={table$style}>
            {#if list && list.length > 0}
            <table style="width: {tabWidth}px;">
                {#each list as item, idx}
                <SummaryRow {item} rowNo={idx+1} isAlterRow={idx % 2 === 1} {columns} rowHeight={tableCols.rowHeight}/>
                {/each}
            </table>
            {#if hasMore}
                <div style="left: {-offsetX}px" class="load-more" on:click={loadMore}><span>点击获取更多数据...</span></div>
            {/if}
            {:else}
                <div on:click={loadMore} style="width: {tabWidth}px;text-align: center; padding-top: 8px"><span>没有符合条件的数据</span></div>
            {/if}
        </div>
    {/if}

</div>