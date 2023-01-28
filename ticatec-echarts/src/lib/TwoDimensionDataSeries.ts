import type Dimension from "./Dimension";
import DimensionDataSeries from "./DimensionDataSeries";

export type NullConvert = (code: string, idx: number) => number | undefined;

export default class TwoDimensionDataSeries extends DimensionDataSeries {


    #relevant: Dimension;

    /**
     *
     * @param dmCategory
     * @param dmRelevant
     */
    constructor(dmCategory: Dimension, dmRelevant: Dimension) {
        super(dmCategory);
        this.#relevant = dmRelevant;
    }

    /**
     * 建立分类坐标轴
     * @param attr
     */
    buildCategoryAxis(attr:any = null):any {
        const axis = {...attr, data:[]};
        this.category.data.forEach((item: any)=>{
            axis.data.push(item.label);
        })
        return axis;
    }

    /**
     * 建立数值轴
     * @param attr
     */
    buildValueAxis(attr: any = null): any {
        return {
            ...attr,
            type: 'value'
        }
    }

    /**
     *
     * @param list
     * @param categoryField
     * @param relevantField
     * @param valueField
     * @param attr
     * @param processNullValue
     */
    buildAllDataSeries(list: Array<any>, categoryField: string, relevantField: string, valueField: string,
                       attr: any = null, processNullValue: NullConvert | null = null): void {
        this.series = [];
        this.#relevant.data.forEach(item => {
            let series = {...attr, code: item.code, name: item.label};
            this.series.push(series);
            series.data = [];
            let fList = list.filter(el => item.code == el[relevantField]);
            let map:Map<string, number> = this.fillingData(fList, categoryField, valueField);
            this.generateData(map, item.code, series, processNullValue);
        })
    }

    /**
     *
     * @param code
     * @param name
     * @param list
     * @param categoryField
     * @param valueField
     * @param attr
     * @param processNullValue
     */
    buildDataSeries(code: string, name: string, list: Array<any>, categoryField: string, valueField: string,
                    attr: any = null, processNullValue: NullConvert | null = null): void {
        let series = this.series.find(item => item.code == code);
        if (series == null) {
            series = {...attr, code, name};
            this.series.push(series);
        }
        series.data = [];
        let map:Map<string, number> = this.fillingData(list, categoryField, valueField);
        this.generateData(map, code, series, processNullValue);
    }

    /**
     *
     * @param map
     * @param code
     * @param series
     * @param processNullValue
     * @private
     */
    private generateData(map: Map<string, number>, code: string, series: any, processNullValue: NullConvert | null): void {
        this.category.data.forEach((cg, idx) => {
            let value = map.get(cg.code);
            if (value == null && processNullValue != null) {
                value = processNullValue(code, idx);
            }
            series.data.push(value);
        });
    }
}