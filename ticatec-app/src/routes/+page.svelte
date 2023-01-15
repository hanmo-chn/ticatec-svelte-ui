<script lang="ts">
    import TicatecAppBoard from "../lib/TicatecAppBoard.svelte";
    import DialogButton from "./DialogButton.svelte";
    import DemoHome from "./DemoHome.svelte";
    import Drawer from "tsui-drawer"

    let drawOpen: boolean = false;

</script>
<TicatecAppBoard style="min-width: 1200px; min-height: 960px" DialogButton={DialogButton}>
    <div slot="header" style="height: 60px; background-color: aliceblue">
        <a href="" on:click={()=>{drawOpen=true}}><span>header</span></a>
    </div>
    <div slot="footer" style="height: 24px; background-color: #f0f0f0">
        <span>footer</span>
    </div>

    <DemoHome input$style="width: 100%"/>

</TicatecAppBoard>
<Drawer bind:open={drawOpen}>
    <div>Nav main menu</div>
</Drawer>



