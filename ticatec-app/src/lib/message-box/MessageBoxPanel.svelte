
<script lang="ts">

    import {fade} from "svelte/transition";
    import MessageBox, {initialize} from "./MessageBox";
    import {onMount, SvelteComponent} from "svelte";
    import Buttons from "./Buttons";

    export let title = '信息提示';
    export let buttonClass: SvelteComponent;
    export let cancellable:boolean = false;

    let visible = false;
    let type: 'warning' | 'question' = 'question';
    let message: string = '';
    let buttons: number = Buttons.BTN_OK | Buttons.BTN_CLOSE;
    let callback: ActionCallback;
    type ActionCallback = (result: any) => void;

    const show = (_message: string, _callback: ActionCallback, _type: 'warning' | 'question' = 'question' ): void => {
        visible = true;
        buttons = Buttons.BTN_YES | Buttons.BTN_OK | Buttons.BTN_CLOSE;
        // @ts-ignore
        document.activeElement.blur();
        type = _type;
        callback = _callback;
        message = _message;
    }

    export const handleConfirmClick = () => {
        visible = false;
        callback(MessageBox.MR_YES);
    }

    export const handleCancelClick = () => {
        visible = false;
        callback(MessageBox.MR_CANCEL);
    }

    let enableClick = true;

    const handleButtonClick = async (e:MouseEvent, btn: number):Promise<void> => {
        if (enableClick) {
            enableClick = false;
            visible = false;
            if (btn == Buttons.BTN_OK || btn == Buttons.BTN_YES || btn == Buttons.BTN_NO) {
                await callback(0);
            }
            e.stopPropagation();
            setTimeout(()=>{
                enableClick = true;
            }, 100);
        }
    }

    onMount(()=>{
        initialize(show);
    })


</script>

{#if visible}
    <div tabindex="-1" class="tsui-message-box-wrapper" transition:fade on:click={()=>{if (cancellable) visible=false}}>
        <div class="tsui-message-box">
            <div class="tsui-title-bar">
                <span>{title}</span>
            </div>
            <div class="tsui-message-content" class:question={type==='question'}>
                <span>{message}</span>
            </div>
            {#if buttonClass}
                <div class="tsui-message-box-control-bar">
                    {#if (buttons & Buttons.BTN_YES) === Buttons.BTN_YES}
                        <svelte:component this={buttonClass} button={Buttons.BTN_YES}
                                          on:click={e=>{handleButtonClick(e, Buttons.BTN_YES)}}/>
                    {/if}
                    {#if (buttons & Buttons.BTN_NO) === Buttons.BTN_NO}
                        <svelte:component this={buttonClass} button={Buttons.BTN_NO}
                                          on:click={e=>{handleButtonClick(e, Buttons.BTN_NO)}}/>
                    {/if}
                    {#if (buttons & Buttons.BTN_OK) === Buttons.BTN_OK}
                        <svelte:component this={buttonClass} button={Buttons.BTN_OK}
                                          on:click={e=>{handleButtonClick(e, Buttons.BTN_OK)}}/>
                    {/if}
                    {#if (buttons & Buttons.BTN_CANCEL) === Buttons.BTN_CANCEL}
                        <svelte:component this={buttonClass} button={Buttons.BTN_CANCEL}
                                          on:click={e=>{handleButtonClick(e, Buttons.BTN_CANCEL)}}/>
                    {/if}
                    {#if (buttons & Buttons.BTN_CLOSE) === Buttons.BTN_CLOSE}
                        <svelte:component this={buttonClass} button={Buttons.BTN_CLOSE}
                                          on:click={e=>{handleButtonClick(e, Buttons.BTN_CLOSE)}}/>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
{/if}