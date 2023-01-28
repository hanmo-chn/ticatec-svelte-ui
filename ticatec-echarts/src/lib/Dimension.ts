export interface DimensionItem {
    /**
     *
     */
    code: string;
    /**
     *
     */
    label: string;
    /**
     *
     */
    data?: any;
}

/**
 * 分析维度
 */
export default interface Dimension {
    /**
     * 维度编码
     */
    code: string;
    /**
     * 维度名称
     */
    name: string;
    /**
     * 数据
     */
    data: Array<DimensionItem>;
}