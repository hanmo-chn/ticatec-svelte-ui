<script lang="ts">
    import { fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    import Toast, {initialize} from './Toast';

    /**
     * 显示一个Toast信息
     * @param msg
     * @param type
     * @param duration 默认的时间为3秒
     */
    const showToast = (msg: string, type: string = 'error', duration: number = 3) => {
        msgText = msg;
        isError = type === 'error';
        elapse = 0;
        toastDuration = duration;
        if (!visible) {
            visible = true;
            const timer = setInterval(() => {
                elapse++;
                if (elapse >= toastDuration) {
                    visible = false;
                    clearInterval(timer);
                }
            }, 1000);
        }
    }

    Toast.show == null && initialize(showToast);

    let visible: boolean = false;
    let isError: boolean = true;
    let msgText: string = '';
    let elapse: number = 0;
    let toastDuration: number = 0;
</script>

{#if visible}
<div class="tsui-toast-panel" transition:fly="{{delay: 50, duration: 800, x: 0, y: 500, opacity: 0.5, easing: quintOut}}">
    <div class:info={!isError}>
        <span>{msgText}</span>
    </div>
</div>
{/if}