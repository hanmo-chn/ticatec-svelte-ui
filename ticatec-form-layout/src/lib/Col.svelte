<script lang="ts">
    export let span:number = 1;
    export let style = '';
</script>
<div class="tsui-form-col span-{span}" {style}>
    <slot></slot>
</div>