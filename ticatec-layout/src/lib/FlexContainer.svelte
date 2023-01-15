<script lang="ts">

    let className: string = '';

    export let direction: 'vertical' | 'horizontal' = 'vertical';
    export {className as class }


    let style:string = '';

    $: {
        style = direction == 'horizontal' ? 'flex-direction: row; ' : 'flex-direction: column; ';
    }

</script>
<div class="tsui-flex-container {className}" style="{style}">
    <slot></slot>
</div>