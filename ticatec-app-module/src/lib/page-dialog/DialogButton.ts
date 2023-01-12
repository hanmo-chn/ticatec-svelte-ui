export type ActionCallback = (data?: any) => Promise<boolean>;

export default interface DialogButton {
    /**
     * button的文字
     */
    label: string;

    /**
     * 如果action不存在，就关闭当前对话框
     */
    action?: ActionCallback;
}