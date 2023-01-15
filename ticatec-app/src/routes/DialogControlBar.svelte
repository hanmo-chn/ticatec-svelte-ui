<script lang="ts">
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    let enable = true;

    const handleSaveClick = () => {
        if (enable) {
            enable = false;
            dispatch('save');
            setTimeout(()=>{enable = true}, 500);
        }
    }


</script>
<button style="width: 80px" on:click={handleSaveClick}>保存</button>
<button style="width: 80px" on:click={()=>{dispatch('close')}}>关闭</button>