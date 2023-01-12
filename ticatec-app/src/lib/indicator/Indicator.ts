type ShowIndicator= (msg: string) => void;
type HideIndicator = () => void;

interface _Indicator {
    show?: ShowIndicator,
    hide?: HideIndicator
}

declare global {
    interface Window { Indicator: _Indicator; }
}

const Indicator:_Indicator = {}

const initialize = (show: ShowIndicator, hide: HideIndicator): void => {
    Indicator.show = show;
    Indicator.hide = hide;
    window.Indicator = Indicator;
}

export {initialize}

export default Indicator;