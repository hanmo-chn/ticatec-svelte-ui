<script lang="ts">

    import type Column from "./Column";

    export let isAlterRow: boolean;
    export let rowHeight: number;
    export let columns: Array<Column> = [];
    export let item: any;

    const getCellContent = (item: any, col: Column) => {
        let value = col.field == null ? item : item[col.field];
        let text = (col.formatter != null ? col.formatter(value) : value) || text;
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
    <td class="table-col col-0" style="height: {rowHeight}px">
        <span></span>
    </td>
    {#each columns as col, colIdx}
        <td class="table-col col-{colIdx+1}" hint={getCellHint(item, col)}>
            {#if (col.isHref === true && col.onClick != null)}
                <a href="javascript:void(0)" on:click={()=>{col.onClick(item)}}>{@html getCellContent(item, col)}</a>
            {:else}
                {@html getCellContent(item, col)}
            {/if}
        </td>
    {/each}
    <td class="table-col col-{columns.length+1}"><span></span></td>
</tr>