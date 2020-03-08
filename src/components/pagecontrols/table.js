import React from 'react';

function Table(props) {

    const { heading, body } = props;

    return (
        <table>
            <thead>
                {
                    <tr>
                        {
                            heading.map(el => <th>{el}</th>)
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