export default interface TableOptions {
    /**
     * 最前面固定列宽度
     */
    fixedColWidth?: number;
    /**
     * 更多信息列宽度
     */
    chevronColWidth?: number;
    /**
     * 表头行高度
     */
    headerHeight?: number;
    /**
     * 行高度
     */
    rowHeight?: number
}

const defaultOptions = {
    fixedColWidth: 30,
    chevronColWidth: 36,
    headerHeight: 32,
    rowHeight: 28
}

export {defaultOptions};