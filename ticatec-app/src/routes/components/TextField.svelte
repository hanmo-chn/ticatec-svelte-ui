<script lang="ts">
    let style:string='';
</script>
<div class="tsui-input">
    <slot name="leading"></slot>
    <input {style}/>
    <slot name="trailing"></slot>
</div>

<style>
    .tsui-input {
        width: 100%;
        box-sizing: border-box;
    }
    .tsui-input input {
        width: 100%;
        border-radius: 4px;
        padding: 6px 8px;
        box-sizing: border-box;
        border-width: 1px;
    }

    .tsui-input input:focus {
        border-color: var(--tsui-primary-color);
        outline: var(--tsui-primary-color) solid 1px;
    }
</style>