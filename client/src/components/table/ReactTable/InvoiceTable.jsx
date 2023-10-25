import React from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
  useSortBy,
} from "react-table";
// import { GlobalFilter } from './GlobalFilter';
import "./ReactTable.css";

const InvoiceTable = ({ columns, data }) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    gotoPage,
    pageCount,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
  } = tableInstance;

  const { pageIndex } = state;
  const count = data.length;

  return (
    <>
      <div className="table-responsive" style={{marginBottom:"20px"}}>
        <span>
          Total No of Records :<strong> {count}</strong>
        </span>
        <span style={{ float: "right" }}>
          Records Per Page
          <select style={{marginLeft:"10px"}}
            className="text-black"
            value={state.pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 15, 20, 25].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </span>
      </div >
      <div className="table-responsive">
        {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}

        <table {...getTableProps()} className="table  display">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} 
                  
                  >
                    <span className="ml-1" {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <i className="fa fa-arrow-down" />
                        ) : (
                          <i className="fa fa-arrow-up" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                    {column.canFilter ? column.render("Filter") : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <div className="d-flex justify-content-between">
        
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
            {""}
          </span>
          <span className="table-index">
            Go to page :{" "}
            <input
              type="number"
              min="1"
              max={pageOptions.length}
              className="ml-2"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
            />
          </span>
        </div>
        <div className="text-center">
          <div className="filter-pagination  mt-3">
            <button
              className=" previous-button"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>

            <button
              className="previous-button"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Previous
            </button>
            <button
              className="next-button"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </button>
            <button
              className=" next-button"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default InvoiceTable;
