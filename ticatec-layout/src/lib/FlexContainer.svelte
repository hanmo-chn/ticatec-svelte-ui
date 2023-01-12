<script lang="ts">

    //import IPageManager from "./"

    let className: string = '';

    export let direction: 'vertical' | 'horizontal' = 'vertical';
    export {className as class }





    /*export const pageManager  ModulePage = {

    }*/

    let style:string = '';

    $: {
        style = direction == 'horizontal' ? 'flex-direction: row; ' : 'flex-direction: column; ';
    }

</script>
<div class="tsui-flex-container {className}" style="{style}">
    <slot></slot>
</div>