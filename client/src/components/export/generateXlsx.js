import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const generateXlsx = (data, header, title) => {
  const ws = XLSX.utils.book_new();
  XLSX.utils.sheet_add_aoa(ws, [header]);
  XLSX.utils.sheet_add_json(ws, data, { origin: "A2", skipHeader: true });
  const wb = { Sheets: { Sheet: ws }, SheetNames: ["Sheet"] };
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true,
  });
  const finalData = new Blob([excelBuffer], { type: "buffer" });
  //FileSaver.saveAs(finalData, "Data.xlsx");
  saveAs(finalData, title + ".xlsx");

  // const worksheet = XLSX.utils.json_to_sheet(data)
  //     const Workbook = XLSX.utils.book_new()
  //     XLSX.utils.book_append_sheet(Workbook, worksheet, title)
  //     //Buffer
  //     XLSX.write(Workbook, { bookType: 'xlsx', type: 'buffer' })
  //     //Binary strnig
  //     XLSX.write(Workbook, { bookType: 'xlsx', type: 'binary' })
  //     //download
  //     XLSX.writeFile(Workbook, title+'.xlsx')
};
export default generateXlsx;
