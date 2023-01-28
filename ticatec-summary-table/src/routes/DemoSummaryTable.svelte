<script lang="ts">
    import type Column from "../lib/Column";
    import {CellAlign} from "../lib/CellAlign";
    import TicatecSummaryTable from "../lib/SummaryTable.svelte";

    /**
     * 处理姓名单元格的超链接
     * @param data
     */
    const handleNameClick = (data):void => {
        console.log('点击name', data.name);
    }

    const displayStatus = (data):string => {
        return '测试';
    }

    let columns: Array<Column> = [
        {
            field: '#index',
            label: '序号',
            width: 30,
            align: CellAlign.Center
        },
        {
            field: 'name',
            label: '姓名',
            width: 120,
            resizable: true,
            sortable: true,
            isHref: true,
            onClick: handleNameClick,
            weight: 1
        },
        {
            field: 'gender',
            label: '性别',
            align: CellAlign.Center,
            width: 60,
            formatter: value => value == 'M' ? '男' : '女',
            escapeHTML: false
        },
        {
            field: 'age',
            label: '年龄',
            align: CellAlign.Right,
            width: 60
        },
        {
            label: '状态',
            align: CellAlign.Center,
            width: 120,
            formatter: displayStatus
        },
        {
            field: 'note',
            align: CellAlign.Left,
            label: '备注',
            width: 140,
            weight: 2
        }
    ]

    let list = [
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'},
        {name: 'Henry Feng', age: 52, gender: 'M', status: 'K', note: '备注'}/**/
    ];//];/**/
</script>

<TicatecSummaryTable style="width: 100%; font-size: 12px" {columns} {list} hasMore={true} on:chevronClick={(e)=>{console.log(e.detail)}} on:loadMore={()=>{console.log('load more data')}}>
    <div slot="topbar">顶部内容</div>
</TicatecSummaryTable>