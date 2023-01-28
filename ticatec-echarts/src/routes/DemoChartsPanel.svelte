<script lang="ts">

    import ChartPanel from "../lib/ChartPanel.svelte";
    import {onMount} from "svelte";
    import echartUtils from "../lib/EchartUtils";
    import TicatecChart from "../lib/TicatecChart";
    import {ApprovedCars, BarOption, PieOption} from "./DemoData";
    import TwoDimensionDataSeries from "../lib/TwoDimensionDataSeries";
    import SingleDimensionDataSeries from "../lib/SingleDimensionDataSeries";
    let charts = [];

    let originData = {
        list: [
            {
                "code": "BRSB",
                "text": "宝日希勒露天矿"
            },
            {
                "code": "BR",
                "text": "宝日希勒"
            },
            {
                "code": "DYYN",
                "text": "大雁雁南矿"
            },
            {
                "code": "DY",
                "text": "大雁能源"
            },
            {
                "code": "MD",
                "text": "敏东一矿"
            },
            {
                "code": "BRZN",
                "text": "扎泥河露天矿"
            },
            {
                "code": "0CG4",
                "text": "敏东一矿"
            },
            {
                "code": "bq",
                "text": "宝清矿"
            },
            {
                "code": "bqk1",
                "text": "宝清一矿"
            }
        ],
        key: "code",
        label: "text"
    }

    const createPieChart1 = () => {
        let chart = new TicatecChart(PieOption);
        let dmOrigin = echartUtils.createDimension('origin', '矿源', originData);
        let ds: SingleDimensionDataSeries = <SingleDimensionDataSeries>echartUtils.createDataSeries(dmOrigin);
        chart.setTitle('承认车煤源分布比例');
        ds.buildDataSeries([
            {"code":"BRSB","value":104610},
            {"code":"DYYN","value":8986},
            {"code":"BRZN","value":19757}
        ], 'code', 'value', {radius: '66%'});
        console.log('Data series', ds.get())
        chart.option.series = ds.get();
        console.log(chart.option);
        charts.push(chart);
    }

    const createSimpleBarChar = () => {
        let chart = new TicatecChart(BarOption);
        chart.setTitle('承认车煤源分布比例');
        let dmOrigin = echartUtils.createDimension('origin', '矿源', originData);
        let dmType = echartUtils.createDimension('type', '类别', {
            list: [
                {
                    code: 'P',
                    text: '计划量'
                },
                {
                    code: 'A',
                    text: '实际量'
                }
            ],
            key: 'code',
            label: 'text'
        });
        let ds = <TwoDimensionDataSeries>echartUtils.createDataSeries(dmOrigin, dmType);
        chart.option.xAxis = [ds.buildCategoryAxis({axisLabel: {
                show: true,
                interval: 0,
                rotate: 45,
            }})];
        chart.option.yAxis = [ds.buildValueAxis()];
        ds.buildDataSeries("P", "计划量", ApprovedCars, "code", "totalPlanCars", {type: 'line'}, (item,idx) => 0);
        ds.buildDataSeries("A", "实际量", ApprovedCars, "code", "totalActualCars", {type: 'bar'}, (item,idx) => 0);
        chart.option.series = ds.get();
        console.log(chart.option)
        charts.push(chart);
    }

    onMount(()=>{
        createPieChart1();
        createSimpleBarChar();
        charts = [...charts]
    })

</script>
{#each charts as chart}
    <div style="width: 600px; height: 400px; padding: 5px; position: relative; box-sizing: border-box">
        <div style="width: 100%; height: 100%; box-sizing: border-box; border: 1px solid; border-radius: 5px; margin: 5px auto">
            <ChartPanel {chart}/>
        </div>
    </div>
{/each}