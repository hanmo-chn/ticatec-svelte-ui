<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import iconMore from './more.svg';
    import Popover from 'tsui-common';

    export let hideItems: Array<any>
    const dispatch = createEventDispatcher();
    let popover;

</script>

