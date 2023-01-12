import type {SvelteComponent} from "svelte";

let buttonClass:SvelteComponent;

export function setButtonClass(component: SvelteComponent) {
    buttonClass = component;
}

export function getButtonClass() {
    return buttonClass;
}