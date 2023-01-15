<script lang="ts">

    import type PageEntry from "./PageEntry";
    import {SvelteComponent} from "svelte";
    import type DialogEntry from "./page-dialog/DialogEntry";
    import ModuleDialog from "./page-dialog/ModuleDialog.svelte";
    import {fade} from "svelte/transition";
    import ModulePage from "./ModulePage.svelte";

    let className: string = '';
    export {className as class };
    export let style: string = "";

    let pages: Array<PageEntry> = [];
    let dialogs: Array<DialogEntry> = [];
    /**
     * 打开一个新页面
     * @param page
     * @param props
     * @param tag
     */
    const push = (page: SvelteComponent, props: any, tag?: string) => {
        const currPage = pages.length > 0 ? pages[pages.length -1] : null;
        const inactiveCallback = currPage == null ? null : currPage.component['onActive'];
        if (inactiveCallback != null) {
            inactiveCallback();  //TODO 检查是否是函数
        }
        pages = [...pages, {component: page, props, tag}]
    }

    /**
     * 返回指定的页面，如果没有指定，就是上一页
     * @param tag
     */
    const pop = (tag?: string) => {
        if (tag == null || tag.trim()=='') {
            pages.pop();
            pages = [...pages];
        } else {
            let idx = pages.findIndex(page=> page.tag == tag);
            if (idx == -1) {
                throw new Error('tag not found!');
            }
            pages = pages.slice(0, idx);
        }
        const page = pages.length > 0 ? pages[pages.length -1] : null;
        const activeCallback = page == null ? null : page.component['onActive'];
        if (activeCallback != null) {
            activeCallback();  //TODO 检查是否是函数
        }
    }

    /**
     * 打开一个对话框
     * @param component
     * @param props
     */
    const showDialog = (component:any, props: any) => {
        const dialogEntry: DialogEntry = {
            component: component,
            props:props
        };
        dialogs.push(dialogEntry);
        dialogs = [...dialogs];
        console.log('当前模块的对话框:', dialogs);
    }

    const handleDialogCloseEvent = (entry, data) => {
        console.log('关闭对话框', entry);
        const idx = dialogs.indexOf(entry);
        console.log('当前窗体列表', dialogs, idx);
        if (idx > -1) {
            dialogs.splice(idx, 1);
            dialogs = [...dialogs];
        }
    }


    export let pageBoard:any = {
        push, pop, showDialog
    }

</script>

<svelte:options accessors/>
<div class="tsui-app-module-page-board-wrapper {className}" {style}>
    <div class="tsui-module-home-page">
        <slot></slot>
    </div>

    {#if pages && pages.length > 0}
        {#each pages as page, i}
            <ModulePage {pageBoard} {page} active={i===pages.length} on:close={()=>{pop()}}/>
        {/each}
    {/if}
    {#if dialogs && dialogs.length > 0}
        {#each dialogs as entry, i}
            <ModuleDialog on:close={(evt)=>{handleDialogCloseEvent(entry, evt.detail)}} props={entry.props}
                         component={entry.component} />
        {/each}
    {/if}
</div>