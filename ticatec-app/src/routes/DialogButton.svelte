<script lang="ts">
    import Buttons from "../lib/message-box/Buttons";

    export let button: number;

    let text = "关闭";

    $: {
        switch (button) {
            case Buttons.BTN_YES:
                text = "是";
                break;
            case Buttons.BTN_CLOSE:
                text = "关闭";
                break;
            case Buttons.BTN_NO:
                text = "否";
                break;
            case Buttons.BTN_CANCEL:
                text = "放弃";
                break;
            case Buttons.BTN_OK:
                text = "确认";
                break;
            default:
                text = "未知"
        }
    }
</script>
<button style="width: 80px" on:click>{text}</button>