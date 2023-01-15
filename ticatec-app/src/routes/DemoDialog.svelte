<script lang="ts">
    import {CommonDialog} from "tsui-app-module";
    import {createEventDispatcher} from "svelte";
    import DialogControlBar from "./DialogControlBar.svelte";
    import FormContainer, {Row, Col} from 'tsui-form-layout';
    import FormField from 'tsui-form-field';
    import TextField from "./components/TextField.svelte";

    export let item;

    let dispatch = createEventDispatcher();


    const handleSaveData = () => {
        console.log('处理保存数据');
        Indicator.show('保存数据...');
    }

</script>
<CommonDialog height="60%" width="80%" title="新增用户管理">
    <FormContainer class="app-form">
        <Row>
            <Col span="3">
                <FormField label="姓名" required={true} error="用户不存在">
                    <input style="width: 100%; box-sizing: border-box" value={item.name}>
                </FormField>
            </Col>
            <Col span="3">
                <FormField label="生日">
                    <input style="width: 100%; box-sizing: border-box" value={item.name}>
                </FormField>
            </Col>
            <Col span="3">
                <FormField label="电话">
                    <textarea rows="6"/>
                </FormField>
            </Col>
            <Col span="3">
                <FormField label="电话">
                    <TextField/>
                </FormField>
            </Col>
        </Row>
        <Row>
            <Col span="4">
                <span>col 1</span>
            </Col>
            <Col span="4">
                <span>col 2</span>
            </Col>
            <Col span="4">
                <span>col 3</span>
            </Col>
        </Row>
        <Row>
            <Col span="4">
                <span>col 1</span>
            </Col>
            <Col span="4">
                <span>col 2</span>
            </Col>
            <Col span="4">
                <span>col 3</span>
            </Col>
        </Row>
    </FormContainer>
    <svelte:fragment slot="control-bar">
        <DialogControlBar on:close on:save={handleSaveData}/>
    </svelte:fragment>
</CommonDialog>