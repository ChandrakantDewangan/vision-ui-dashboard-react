// Import statements
import React, { useState, useEffect } from 'react';
import './TableWithMultiSelect.css';
import CheckboxMultiselectDropdown from './CheckboxMultiselectDropdown';

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
        <div className="container">
            <div className="header-table">
                <table>
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((columnName) => (
                                <th key={columnName} className="header-cell">
                                    {columnName}
                                    <CheckboxMultiselectDropdown
                                        options={[...new Set(filteredData.map((row) => row[columnName]))]}
                                        selectedValues={filters[columnName] || []}
                                        onChange={(selectedValue, isChecked) => {
                                            const newSelectedValues = isChecked
                                                ? [...(filters[columnName] || []), selectedValue]
                                                : filters[columnName].filter((value) => value !== selectedValue);

                                            handleFilterChange(columnName, newSelectedValues);
                                        }}
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="body-table">
                <table>
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
            </div>
            <div className="selected-rows">
                <p>Selected Rows: {selectedRows.join(', ')}</p>
            </div>
        </div>
    );
};

export default TableWithMultiSelect;
