import type {CellAlign} from "./CellAlign";

export type Formatter = (data: any) => string;
export type HrefClickHandler = (data: any) => void;

export default interface Column {
    /**
     * 字段
     */
    field?: string;
    /**
     * 标题
     */
    label: string;
    /**
     * 对齐方式
     */
    align?: CellAlign;
    /**
     * 格式转换
     */
    formatter?: Formatter;
    /**
     * 是否做html转码
     */
    escapeHTML?: boolean;
    /**
     * 是否是超链接
     */
    isHref?: boolean;
    /**
     * 超链接的单击处理函数
     */
    onClick?: HrefClickHandler;
    /**
     * 是否可以排序
     */
    sortable?: boolean;
    /**
     * 是否可以调整宽度
     */
    resizable?:boolean;
    /**
     * 宽度
     */
    width: number;
    /**
     * 实际的显示宽度
     */
    displayWidth?: number;
    /**
     * 自动扩充的时候占比重
     */
    weight?:number;
    /**
     *
     */
    showHint?: boolean;

    /**
     *
     * @param data
     */
    buildHint?: (data: any) => string;
}