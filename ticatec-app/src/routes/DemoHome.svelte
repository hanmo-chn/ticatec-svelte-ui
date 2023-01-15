<script lang="ts">

    import ModulePagePanel from "tsui-app-module";
    import {onMount} from "svelte";
    import DemoDialog from "./DemoDialog.svelte";
    import DemoDetailPage from "./DemoDetailPage.svelte";
    import TabBar from "tsui-tab-bar";

    let board;

    let tabItems = [
        {title: '计划管理'},
        {title: '质量管理'},
        {title: '调度管理'},
        {title: '设备管理'},
        {title: '能源管理'},
        {title: '物料平衡'},
        {title: '工艺管理'},
        {title: '物料平衡1'},
        {title: '工艺管理2'}
    ]

    const handleButtonClick = () => {
        board.pageBoard.push(DemoDetailPage, {});
    }

    const openDialog = () => {
        board.pageBoard.showDialog(DemoDialog, {item: {name: 'Henry'}});
    }

    onMount(()=>{
        console.log('组件参数:', $$props)
    });
</script>
<ModulePagePanel bind:this={board} style="padding: 8px; box-sizing: border-box">
    <TabBar maxCount={6} {tabItems}>
        <div style="width: 100%; height: 100%; ">
            <a href="javascript:void(0)" on:click={handleButtonClick}>打开新页面</a>
            <a href="javascript:void(0)" on:click={openDialog}>打开对话框</a>
        </div>
    </TabBar>
</ModulePagePanel>
