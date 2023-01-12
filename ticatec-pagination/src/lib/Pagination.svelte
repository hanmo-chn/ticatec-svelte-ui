<script lang="ts">
    import {onMount, createEventDispatcher} from "svelte";

    export let pageCount: number = 0;
    export let pageNo: number = 1;
    export let style: string = '';

    const dispatch = createEventDispatcher();

    let pagination: Array<number | null> = [];

    const buildPagination = () => {
        if (pageCount > 1) {
            let arr = [1];
            if (pageCount < 6) {
                for (let i=2; i<=pageCount; i++) {
                    arr.push(i);
                }
            } else {
                if (pageNo == 1 || pageNo == 2) {
                    arr = arr.concat([2, 3, null, pageCount]);
                } else if (pageNo == pageCount || pageNo == pageCount - 1) {
                    arr = arr.concat([null, pageCount - 2, pageCount - 1, pageCount])
                } else if (pageNo == 3) {
                    arr = arr.concat([2, 3, 4, null, pageCount]);
                } else if (pageNo == pageCount - 2) {
                    arr = arr.concat([null, pageCount - 3,pageCount - 2, pageCount - 1, pageCount])
                } else {
                    arr.push(null);
                    for (let i=pageNo-1; i<=pageNo+1; i++) {
                        arr.push(i);
                    }
                    arr.push(null);
                    arr.push(pageCount);
                }
            }
            pagination = arr;
        }
    }

    const selectPage = (value: number) => {
        if (pageNo != value) {
            pageNo = value;
            dispatch('change', value);
            buildPagination();
        }
    }

    $: if (pageCount > 1) {
        buildPagination();
    }

    onMount(()=>{
        buildPagination();
    })
</script>
{#if pageCount > 1}
<div class="ticatec-pagination-panel" {style}>
    {#each pagination as page, idx}
        {#if page}
            <div class="ticatec-pagination-number" class:active={page===pageNo}>
                <span on:click={()=>{selectPage(page)}} tabindex={idx} >
                    {page}
                </span>
            </div>
        {:else}
            <span>...</span>
        {/if}
    {/each}
</div>
{/if}