import React from 'react';

function Table(props) {

    const { heading, body, handleSort } = props;

    const handleSortClick = el => handleSort(el)

    return (
        <table>
            <thead>
                {
                    <tr>
                        {
                            heading.map(el =>
                                <th>
                                    <span onClick={() => handleSortClick(el)}>{el}<i className="fa fas fa-sort"></i></span>
                                </th>
                            )
                        }
                    </tr>
                }
            </thead>
            <tbody>
                {
                    body.map(row =>
                        <tr>
                            {
                                Object.keys(row).map(el => <td>{row[el]}</td>)
                            }
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default Table;