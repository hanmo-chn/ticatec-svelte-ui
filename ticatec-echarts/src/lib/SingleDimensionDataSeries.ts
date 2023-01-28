import DimensionDataSeries from "./DimensionDataSeries";
import type {NullConvert} from "./TwoDimensionDataSeries";
import type Dimension from "./Dimension";

/**
 * 单一维度数据序列，通常用于做饼形图
 */
export default class SingleDimensionDataSeries extends DimensionDataSeries {

    /**
     *
     * @param dmCategory
     */
    constructor(dmCategory: Dimension) {
        super(dmCategory);
    }


    /**
     *
     * @param list
     * @param keyField
     * @param valueField
     * @param attr
     * @param processNullValue
     * @param appendNull
     */
    buildDataSeries(list: Array<any>, keyField: string, valueField: string,
                    attr: any = null, processNullValue: NullConvert | null = null, appendNull: boolean = false): void {
        let code = this.category.code;
        let series = this.series.find(item => item.code == code);
        if (series == null) {
            series = {...attr, code, name: this.category.name, type: 'pie'};
            this.series.push(series);
        }
        series.data = [];
        let map = this.fillingData(list, keyField, valueField);
        console.log("分类维度：", this.category.data);
        this.category.data.forEach((dim, idx)=>{
            let value = map.get(dim.code);
            if (value == null && processNullValue != null) {
                value = processNullValue(code, idx);
            }
            if (value != null || appendNull) {
                series.data.push({value, name: dim.label});
            }
        });
    }
}