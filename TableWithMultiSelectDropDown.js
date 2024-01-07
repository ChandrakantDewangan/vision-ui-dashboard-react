import React, { useState, useEffect } from 'react';

const TableWithMultiSelect = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleFilterChange = (columnName, selectedValues) => {
    setFilters({
      ...filters,
      [columnName]: selectedValues,
    });
  };

  const applyFilters = () => {
    let result = data;
    Object.entries(filters).forEach(([columnName, selectedValues]) => {
      if (selectedValues.length > 0) {
        result = result.filter((row) => selectedValues.includes(row[columnName]));
      }
    });
    setFilteredData(result);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <div>
      <div>
        {Object.keys(data[0]).map((columnName) => (
          <div key={columnName}>
            <label htmlFor={columnName}>{columnName}</label>
            <select
              id={columnName}
              multiple
              value={filters[columnName] || []}
              onChange={(e) =>
                handleFilterChange(columnName, Array.from(e.target.selectedOptions, (option) => option.value))
              }
            >
              {[...new Set(filteredData.map((row) => row[columnName]))].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            {Object.keys(data[0]).map((columnName) => (
              <th key={columnName}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleRowSelection(row.id)}
                  checked={selectedRows.includes(row.id)}
                />
              </td>
              {Object.keys(row).map((columnName) => (
                <td key={columnName}>{row[columnName]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>Selected Rows: {selectedRows.join(', ')}</p>
      </div>
    </div>
  );
};

export default TableWithMultiSelect;
