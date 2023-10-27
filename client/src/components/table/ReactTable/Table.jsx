import React, { useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
  useSortBy,
} from "react-table";
// import { GlobalFilter } from './GlobalFilter';
import "./ReactTable.css";

const Table = ({ columns, data }) => {
  const [gotoPageValue, setgotoPageValue] = useState("1");

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

  // const handleFocus = (event) => event.target.select();
  return (
    <>
      <div className="table-responsive" style={{ marginBottom: "20px" }}>
        <span style={{ float: "right" }}>
          Records Per Page
          <select style={{ marginLeft: "10px" }}
            className="text-black"
            value={state.pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 25, 50, 100, 200].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </span>
      </div>
      <div className="table-responsive">

        <table {...getTableProps()} className="table  display">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
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
      </div>

      <div className="d-flex justify-content-between" style={{ marginTop: "20px" }}>
        <span>
          Total No of Records :<strong> {count}</strong>
        </span>
        {pageOptions.length > 1 && (
          <>
            <div className="text-center">
              <div className="filter-pagination ">
                <button
                  className=" previous-button"
                  onClick={(e) => {
                    setgotoPageValue(1);
                    gotoPage(0);
                  }}
                  disabled={!canPreviousPage}
                  title="Go to First Page"
                >
                  {"<<"}
                </button>

                <button
                  className="previous-button"
                  onClick={(e) => {
                    setgotoPageValue(pageIndex);
                    previousPage();
                  }}
                  disabled={!canPreviousPage}
                  title="Go to Previous Page"
                >
                  Previous
                </button>
                <span style={{margin:"3px"}}>
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>
                  {""}
                </span>
                <button
                  className="next-button"
                  onClick={(e) => {
                    setgotoPageValue(pageIndex + 2);
                    nextPage();
                  }}
                  disabled={!canNextPage}
                  title="Go to Next Page"
                >
                  Next
                </button>
                <button
                  className=" next-button"
                  onClick={(e) => {
                    setgotoPageValue(pageCount);
                    gotoPage(pageCount - 1);
                  }}
                  disabled={!canNextPage}
                  title="Go to Last Page"
                >
                  {">>"}
                </button>
              </div>
            </div>
          </>
        )}
        {pageOptions.length > 1 && (
          <span className="table-index">
            Go to page :{" "}
            <input
              type="number"
              min="1"
              max={pageOptions.length}
              className="ml-2"
              defaultValue={pageIndex + 1}
              autoComplete="off"
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
                // const pageNumbers = pageNumber != " " ? pageNumber >= Number(pageOptions.length)-1 ? Number(pageOptions.length)-1 : pageNumber < 0 ? 0 : pageNumber: pageNumber;
                // let pageNumbers = "";
                // if (e.target.value != "") {
                //   if (pageNumber >= Number(pageOptions.length) - 1) {
                //     pageNumbers = Number(pageOptions.length) - 1;
                //   } else if (pageNumber < 0) {
                //     pageNumbers = 1;
                //   } else {
                //     pageNumbers = pageNumber;
                //   }
                //   setgotoPageValue(Number(pageNumbers) + 1);
                // } else {
                //   setgotoPageValue(pageNumbers);
                // }
                // gotoPage(Number(pageNumber));
              }}
            // onFocus={handleFocus}
            value={gotoPageValue}
            />
          </span>
        )}
      </div>


    </>
  );
};

export default Table;
