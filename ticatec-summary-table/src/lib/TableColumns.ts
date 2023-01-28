import type Column from "./Column";
import type TableOptions from "./TableOptions";
import {defaultOptions} from "./TableOptions";

export default class TableColumns {

    readonly #columns: Array<Column>;
    #cellsStyle: Array<string>;
    #width: number;
    #options: TableOptions;
    #rowHeight: number;
    #headerHeight: number;


    constructor(columns: Array<Column>, width: number, options: TableOptions) {
        this.#columns = columns;
        this.#rowHeight = options.rowHeight || defaultOptions.rowHeight;
        this.#headerHeight = options.headerHeight || defaultOptions.headerHeight;
        this.#cellsStyle = [];
        this.#width = width;
        this.#options = Object.assign(defaultOptions, options);
        this.initializeTableWidth();
        this.adjustTableWidth();
    }

    private initializeTableWidth(): void {
        this.#columns.forEach(col => {
            col.displayWidth = col.width;
        });
    }

    private adjustTableWidth(): void {
        let tw: number = 0;
        let weight: number = 0;
        this.#columns.forEach(col => {
            tw += col.width;
            weight += col.weight == null ? 0 : col.weight;
        });
        if (tw < this.#width) {
            let space = this.#width - tw;
            let es = space / weight;
            this.#columns.forEach(col => {
                col.displayWidth = col.width + es * (col.weight || 0);
            });
        } else {
            this.#width = tw;
        }
        this.buildCellsStyle();
    }

    private buildCellsStyle() {
        this.#cellsStyle = [];
        this.#columns.forEach((col, idx) => {
            this.#cellsStyle[idx+1] = `.col-${idx} {
                width: ${col.displayWidth}px;
                text-align: ${col.align || 'left'};
            }\n`;
        })
    }

    toInlineStyle(id: string):string {
        let style = '';
        this.#cellsStyle.forEach((cellStyle, idx) => {
            style += `#${id} ${cellStyle}`;
        })
        return `<style>${style}</style>`;
    }

    setClientWidth(w: number):void {
        this.#width = w;
        this.adjustTableWidth();
    }

    get width(): number {
        return this.#width;
    }

    get rowHeight(): number {
        return this.#rowHeight;
    }

    get headerHeight(): number {
        return this.#headerHeight;
    }

}