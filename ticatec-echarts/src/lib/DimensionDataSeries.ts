import type Dimension from "./Dimension";
import DataSeries from "./DataSeries";

/**
 * 带分析维度的数据序列
 */
export default class DimensionDataSeries extends DataSeries{

    /**
     * 用户分组的维度，通常是x轴或者饼图的分类
     * @protected
     */
    protected category: Dimension;

    /**
     * 构造新的维度数列
     * @param dmCategory 维度
     */
    constructor(dmCategory: Dimension) {
        super()
        this.category = dmCategory;
    }

    /**
     * 将数据映射到map中
     * @param list
     * @param keyField
     * @param valueField
     * @protected
     */
    protected fillingData(list: Array<any>, keyField: string, valueField: string): Map<string, number> {
        let map: Map<string, number> = new Map<string, number>;
        list.forEach(item => {
            let keyCode = item[keyField];
            let value =map.get(keyCode) || 0;
            value += this.getItemValue(Number(item[valueField]));
            map.set(keyCode, value);
        });
        return map;
    }

    /**
     * 判断是否是有效的数值，如果不是，返回0
     * @param value
     * @private
     */
    private getItemValue(value: number):number {
        return isNaN(value) ? 0 : value;
    }
}