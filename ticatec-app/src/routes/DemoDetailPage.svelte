<script lang="ts">
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();


</script>
<div style="width: 100%; height: 100%; background-color: #ff45ff">
    <a href="javascript:void(0)" on:click={()=>{dispatch('close')}}>关闭</a>
</div>