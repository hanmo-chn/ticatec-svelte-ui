<script lang="ts">

    export let width: string = "600px";
    export let height: string = "400px";
    export let title: string = '';

</script>
<div class="tsui-module-dialog" style="width: {width}; height: {height}">
    <div class="dialog-title-bar">
        <span>{title}</span>
    </div>
    <div class="dialog-content">
        <slot/>
    </div>
    <div class="dialog-control-bar">
        <slot name="control-bar"/>
    </div>
</div>