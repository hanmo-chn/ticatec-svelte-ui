import type Dimension from "./Dimension";
import TwoDimensionDataSeries from "./TwoDimensionDataSeries";
import SingleDimensionDataSeries from "./SingleDimensionDataSeries";
import type DimensionDataSeries from "./DimensionDataSeries";
import dayjs from "dayjs";

export type SliceUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';

/**
 * 按照指定的时间单位进行切片
 * @param code 分析维度的编码
 * @param name 分析维度的名称
 * @param from 开始时间
 * @param to 结束时间
 * @param formatter 格式化时间
 * @param sliceUnit 切片单位
 * @param span 跨度
 */
const createTimeSliceDimension = (code: string, name: string, from: Date, to: Date, formatter: string,
                                  sliceUnit: SliceUnit, span: number = 1 ): Dimension => {
    let dim: Dimension = {
        code, name, data:[]
    }
    let start = dayjs(from);
    while (start.isBefore(to)) {
        let end = start.add(span, sliceUnit);
        dim.data.push({
            code: start.toJSON(),
            label: start.format(formatter),
            data: {
                start: start.toDate(),
                end: end.toDate()
            }
        });
        start = end;
    }
    return dim;
}

/**
 * 创建一个分析维度
 * @param code 维度的编码
 * @param name 维度的名称
 * @param data 维度的数据
 */
const createDimension = (code: string, name: string, data: any): Dimension => {
    let dim: Dimension = {
        code,
        name,
        data: []
    }
    let keyField = data.key;
    let labelField = data.label;
    data.list.forEach((item:any)=>{
        dim.data.push(
            {
                code: item[keyField],
                label: item[labelField],
                data: item
            }
        )
    })
    return dim;
}

/**
 *
 * @param category
 * @param relevant
 */
const createDataSeries = (category: Dimension, relevant: Dimension | null = null): DimensionDataSeries => {
    if (relevant == null) {
        return new SingleDimensionDataSeries(category)
    } else {
        return new TwoDimensionDataSeries(category, relevant);
    }
}


export default {createDimension, createDataSeries, createTimeSliceDimension}