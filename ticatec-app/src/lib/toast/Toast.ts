type ShowToast = (msg: string, type?: string, duration?: number) => void;

interface IToast {
    show?: ShowToast;
}

declare global {
    interface Window {Toast: IToast;}
}

const Toast: IToast = {

};
// @ts-ignore
var global = global || window;

global.Toast = global.Toast || Toast;

export function initialize(fun: ShowToast): void {
    Toast.show = fun;
}

export default Toast;
