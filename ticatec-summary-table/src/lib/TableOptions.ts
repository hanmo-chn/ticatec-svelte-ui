export default interface TableOptions {

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
    headerHeight: 32,
    rowHeight: 28
}

export {defaultOptions};