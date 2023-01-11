import "./ticatec-summary-table.css"
import TicatecSummaryTable from "./TicatecSummaryTable.svelte";
import type Column from "./Column";
import type {CellAlign} from "./CellAlign";
import type TableOptions from "./TableOptions";
import type {Formatter, HrefClickHandler} from "./Column";

export default TicatecSummaryTable;
export {Column, CellAlign, TableOptions}
export {Formatter, HrefClickHandler}