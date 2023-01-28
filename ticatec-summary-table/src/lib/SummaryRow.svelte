<script lang="ts">

    import type Column from "./Column";

    export let isAlterRow: boolean;
    export let rowHeight: number;
    export let columns: Array<Column> = [];
    export let item: any;
    export let rowNo: number;

    const getCellContent = (item: any, col: Column) => {
        let value = col.field == null ? item : item[col.field];
        let text = (col.formatter != null ? col.formatter(value) : value) || value;
        if (col.escapeHTML != true) {
            text = `<span>${text}</span>`
        }
        return text;
    }

    const getCellHint = (item: any, col: Column) => {
        if (col.showHint) {
            let value = col.field == null ? item : item[col.field];
            let text = col.buildHint ? col.buildHint(col.field == null ? item : item[col.field]) : value;
            return `<span>${text}</span>`
        } else {
            return null;
        }
    }

</script>
<tr class:alternative={isAlterRow} >
    {#each columns as col, colIdx}
        <td class="table-col col-{colIdx}" hint={getCellHint(item, col)} style="height: {rowHeight}px">
            <div>
                {#if col.field==='#index'}
                    <span>{rowNo}</span>
                {:else if (col.isHref === true && col.onClick != null)}
                    <a href="javascript:void(0)" on:click={()=>{col.onClick(item)}}>{@html getCellContent(item, col)}</a>
                {:else}
                    {@html getCellContent(item, col)}
                {/if}
            </div>
        </td>
    {/each}
    <td class="table-col col-{columns.length+1}"><span></span></td>
</tr>