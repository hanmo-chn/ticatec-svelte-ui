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
    #fixedColWidth: number;
    #chevronColWidth: number;


    constructor(columns: Array<Column>, width: number, options: TableOptions) {
        this.#columns = columns;
        this.#rowHeight = options.rowHeight || defaultOptions.rowHeight;
        this.#headerHeight = options.headerHeight || defaultOptions.headerHeight;
        this.#fixedColWidth = options.fixedColWidth || defaultOptions.fixedColWidth;
        this.#chevronColWidth = options.chevronColWidth || defaultOptions.chevronColWidth;
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
        let tw: number = this.#fixedColWidth + this.#chevronColWidth;
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
        this.#cellsStyle[0]=`.col-0 \n{width: ${this.#fixedColWidth}px}\n`;
        this.#columns.forEach((col, idx) => {
            this.#cellsStyle[idx+1] = `.col-${idx+1}\n {
                width: ${col.displayWidth}px;
                text-align: ${col.align || 'left'};
            }\n`;
        })
        this.#cellsStyle[this.#columns.length+1] = `.col-${this.#columns.length+1} \n{width: ${this.#chevronColWidth}px}\n`;
    }

    toInlineStyle():string {
        let style = `.summary-table-fixed-rows>div, .summary-table-indicator-rows>div {\n
            height: ${this.#rowHeight}px; 
            line-height: ${this.#rowHeight}px;
        }\n
        
            .summary-table-fixed-rows {
                width: ${this.#fixedColWidth}px;
            }\n
            
            .summary-table-indicator-col {
                width: ${this.#chevronColWidth}px;              
            }\n
         `;
        this.#cellsStyle.forEach((cellStyle, idx) => {
            style += cellStyle;
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