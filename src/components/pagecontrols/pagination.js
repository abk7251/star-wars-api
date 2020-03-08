import React from 'react';

function Pagination(props) {
    const perPage = 10;
    const { current, total, navigateToPage } = props;
    const totalBtns = Math.ceil(total / perPage);
    const lastPage = totalBtns;
    const buttonArray = new Array(totalBtns).fill(0).map((e, i) => i + 1);

    return (
        <ul>
            <li key='first'><button
                disabled={current === 1}
                onClick={() => navigateToPage(1)}
            >first</button></li>
            <li key='prev'><button
                disabled={current === 1}
                onClick={() => navigateToPage(current - 1)}
            >prev</button></li>
            {
                buttonArray.map((btn, index) =>
                    <li key={index}><button className={btn === current ? 'active' : ''} onClick={() => navigateToPage(btn)}>{btn}</button></li>
                )
            }
            <li key='next'><button
                disabled={current === lastPage}
                onClick={() => navigateToPage(current + 1)}
            >next</button></li>
            <li key='last'><button
                disabled={current === lastPage}
                onClick={() => navigateToPage(lastPage)}
            >last</button></li>
        </ul>
    )
}

export default Pagination;