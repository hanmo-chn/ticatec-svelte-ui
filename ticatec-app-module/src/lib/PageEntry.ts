import type {SvelteComponent} from "svelte";

export default interface PageEntry {
    /**
     * 标志符
     */
    tag?: string;
    /**
     * 页面的组件
     */
    component: SvelteComponent;
    /**
     * 待传递的数据
     */
    props: any;
}