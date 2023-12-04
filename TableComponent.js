import React, { useState } from 'react';
import Select from 'react-select';

const TableComponent = ({ data }) => {
  const allColumns = data.length > 0 ? Object.keys(data[0]) : [];
  const [selectedFilters, setSelectedFilters] = useState(allColumns.map(column => ({ value: column, label: column })));

  // Define custom grouping for columns
  const columnGroups = [
    { label: 'Name Detail', columns: ['first_name', 'last_name'] },
    { label: 'Age and Gender', columns: ['age', 'gender'] },
    { label: 'Contact Information', columns: ['email', 'country', 'postal_code'] },
    { label: 'Other Details', columns: allColumns.filter(column => !['first_name', 'last_name', 'age', 'gender', 'email', 'country', 'postal_code'].includes(column)) },
  ];

  return (
    <div>
      <h2>User Table</h2>
      <div>
        <label>Filter Columns:</label>
        <Select
          isMulti
          options={allColumns.map(column => ({ value: column, label: column }))}
          value={selectedFilters}
          onChange={(selectedOptions) => setSelectedFilters(selectedOptions)}
        />

      </div>
      <table>
        <thead>
          <tr>
            {columnGroups.map((group, groupIndex) => (
              <th key={groupIndex} colSpan={group.columns.length}>
                {group.label}
              </th>
            ))}
          </tr>
          <tr>
            {columnGroups.map((group) => (
              group.columns.map((column, columnIndex) => (
                <th key={columnIndex}>{column}</th>
              ))
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              {columnGroups.map((group) => (
                group.columns.map((column, columnIndex) => (
                  <td key={columnIndex}>{user[column]}</td>
                ))
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
