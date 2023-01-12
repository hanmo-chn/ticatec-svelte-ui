<script lang="ts">
    import {CommonDialog} from "tsui-app-module";
    import {createEventDispatcher} from "svelte";

    export let item;

    let dispatch = createEventDispatcher();


</script>
<CommonDialog height="60%" width="80%" title="新增用户管理">
    <div>
        <span>{(item || {}).name}</span>
    </div>
    <svelte:fragment slot="control-bar">
        <button on:click={()=>{dispatch('close')}}>关闭</button>
    </svelte:fragment>
</CommonDialog>