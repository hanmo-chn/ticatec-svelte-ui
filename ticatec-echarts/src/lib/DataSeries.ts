
export default class DataSeries {
    /**
     * 数据序列
     * @protected
     */
    protected series: Array<any>;

    /**
     *
     */
    constructor() {
        this.series = [];
    }

    /**
     * 获取指定的数据序列，如果没有指定code，则返回所有的
     */
    get(code: string | null = null): Array<any> | any {
        if (code) {
            this.series.find(item=>item.code==code);
        } else {
            return this.series;
        }
    }
}