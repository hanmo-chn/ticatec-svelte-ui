<script lang="ts">
    import ListBox from "../lib/ListBox.svelte";
    import SimpleItemAdapter from "./SimpleItemAdapter.svelte";
    let list = ["item1", "item2", "item3", "item4","item11", "item12", "item13", "item14","item21", "item22", "item23", "item24"];

</script>
<h1>List Box Demo</h1>
<div style="width: 320px; height: 600px">
    <ListBox {list} itemRender={SimpleItemAdapter} on:selectChange={(e)=>{console.log('选择项目：', e.detail)}}>
        <!--<div slot="header">List Box Header</div> -->
        <div class="load-more"><span>读取更多数据...</span></div>
        <!-- <div class="footer-panel" slot="footer"></div>-->
    </ListBox>
</div>

<style>
    .load-more {
        padding: 8px;
        box-sizing: border-box;
        width: 100%;
    }
    .load-more span {
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        text-align: center;
        white-space: nowrap;
        font-size: 0.9em;
        font-style: italic;
        cursor: pointer;
    }
</style>
