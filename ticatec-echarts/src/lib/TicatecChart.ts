import * as echarts from "echarts";

export default class TicatecChart {

    #chart:any;
    #option:any;
    protected title: string = '';

    constructor(option: any) {
        this.#option = option;
    }

    /**
     * 初始化一个图表组件
     * @param el
     */
    init(el:HTMLElement):void {
        if (this.#chart == null) {
            this.#chart = echarts.init(el);
            this.invalidate();
            this.postInitialize(this.#chart);
            this.#chart.on('click', (e) => {
                console.log(e);
            })
        }
    }

    /**
     * 初始化后的回调函数
     * @param chart
     * @protected
     */
    protected postInitialize(chart:any):void {

    }

    /**
     * 设置标题
     * @param value
     */
    setTitle(value: string): void {
        this.title = value;
        if (this.option && this.option.title) {
            this.option.title.text = value;
        }
    }

    /**
     * 获取当前的chart
     * @protected
     */
    protected get chart():any {
        return this.#chart;
    }

    /**
     * 刷新当前的图表
     */
    invalidate(): void {
        this.#chart.setOption({...this.#option},true);
    }

    /**
     * 更改图表的大小
     */
    resize(): void {
        this.#chart.resize();
    }

    get option():any {
        return this.#option;
    }


    /**
     * 安装指定精度格式化数字
     * @param value
     * @param precision
     */
    protected formatNumber(value:number, precision:number=0):string {
        if (isNaN(value)) {
            value = 0;
        } else if (typeof(value)=="string") {
            value = parseFloat(value);
        }
        return value.toLocaleString("en-US",{minimumFractionDigits: precision, maximumFractionDigits: precision});
    }
}