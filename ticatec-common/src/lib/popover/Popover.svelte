<script lang="ts">
  import {createEventDispatcher} from 'svelte';
  import {slide} from "svelte/transition";
  import {clickOutside} from '../tsui-utils';

  const ALIGN = ['left', 'center', 'right'];
  const VALIGN = ['top', 'middle', 'bottom'];

  const dispatch = createEventDispatcher();

  let popover;
  let translateY = 0;
  let translateX = 0;
  let top = 0;
  let left = 0;

  export let open = false;
  export let shrink;
  export let posX = 'left';
  export let posY = 'top';
  export let width = 300;
  export let height;

  let pos;

  export const close = () => {
    open = false;
    dispatch('closed');
  };

  const getTranslate = async () => {
    let rect = popover.parentNode.getBoundingClientRect();
    let x = ALIGN[0] === posX ? 0 : ALIGN[2] === posX ? (-width + rect.width) : ((-width + rect.width) / 2);
    let y = VALIGN[0] === posY ? -rect.height : VALIGN[2] === posY ? (-height) : ((-height + rect.height) / 2);
    pos = `${posX == 'left' ? 'left: 0' : 'right: 0'}; ${posY == 'top' ? 'top: 0' : 'bottom: 0'}`;
    console.log(pos, x, y);
    return {x, y};
  };

  export const doOpen = async (offsetY: number) => {
    if (open == false) {
      const {x, y} = await getTranslate();
      translateX = x;
      translateY = y;
      open = true;
      dispatch('opened');
    }
  };

  $: {
    pos = `${posX == 'left' ? 'left: 0' : 'right: 0'}; ${posY == 'top' ? 'top: 0' : 'bottom: 0'}`;
    console.log(pos)
  }


  let w, h;


  $: console.log(`client size: ${w}x${h}`)
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h}/>
<div bind:this={popover} >
{#if open}
<div class="tsui-popover" transition:slide use:clickOutside on:outerClick={()=>{close()}}>
  <div class="contents-wrapper" class:shrink={shrink}
       style="{pos}"
       >
    <div class="contents">
      <div class="contents-inner" style="width: {width}px; height:{height}px">
        <slot></slot>
      </div>
    </div>
  </div>
</div>
{/if}
</div>
