<script lang="ts">

    import {onMount} from "svelte";

    import TicatecChart from "./TicatecChart";

    export let chart:TicatecChart = null;

    let chartDiv = null;

    let parentWidth:number = 0;

    const initChart = () => {
        if (chart != null) {
            chart.init(chartDiv);
        }
    };

    onMount(()=>{
        initChart();
    });


    $: if (parentWidth != 0) {
        chart && chart.resize();
    }

    $: if (chart!=null && chartDiv != null) {
        initChart();
    }

</script>
<svelte:window bind:innerWidth={parentWidth}/>
<div style="height: 100%; width: 100%" bind:this={chartDiv}></div>
