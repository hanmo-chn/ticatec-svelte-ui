export function clickOutside(node:Node) {

    const handleClick = (event:MouseEvent) => {
        console.log('Mouse click');
        // @ts-ignore
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(
                // @ts-ignore
                new CustomEvent('outerClick', node)
            );
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}