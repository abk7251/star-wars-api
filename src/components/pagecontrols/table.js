import React from 'react';

function Table(props) {

    const {
        heading,
        body,
        handleSort,
        title = null,
        handleRowClick = null
    } = props;

    const handleSortClick = el => handleSort(el)

    const rowClickHandler = (id) => {
        if (handleRowClick !== null) {
            handleRowClick(id)
        }
    }

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
                        <tr
                            title={title !== null && title}
                            onClick={() => rowClickHandler(row['Episode no'] || undefined)}
                        >
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