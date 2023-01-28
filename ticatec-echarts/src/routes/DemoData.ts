export const PieOption:any = {
    title: {
        text: '',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    }
}

export const BarOption:any = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        top: 30,
        orient: 'vertical',
        left: 'right'
    },
    grid: {

    }
};

export const ApprovedCars = [
    {code:"BRSB",totalPlanCars:104610, totalActualCars: 104650},
    {code:"DYYN",totalPlanCars:8986, totalActualCars: 9120},
    {code:"BRZN",totalPlanCars:19757, totalActualCars: 19800}
]