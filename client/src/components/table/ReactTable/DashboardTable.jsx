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

  const handleFocus = (event) => event.target.select();
  return (
    <>
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
    </>
  );
};

export default Table;
