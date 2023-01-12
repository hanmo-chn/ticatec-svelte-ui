<script lang="ts">

    import ModulePagePanel from "tsui-app-module";
    import {onMount} from "svelte";
    import DemoDialog from "./DemoDialog.svelte";

    let board;

    onMount(()=>{
        setTimeout(()=>{
            console.log('显示对话框', board)
            board.pageBoard.showDialog(DemoDialog, {item: {name: 'Henry'}})
        }, 1000)
    });
</script>
<ModulePagePanel bind:this={board}>
    <div style="width: 100%; height: 100%; background-color: lightyellow">

    </div>
</ModulePagePanel>
