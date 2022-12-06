import React from "react";


const Navigation = ({nPages, currentPage, setCurrentPage}: { nPages: any, currentPage: any, setCurrentPage: any }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)


    const nextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <div>
            {nPages > 1 && (
                <div className="pagination-wrapper">
                    <ul className='pagination'>
                        <li className="page-item">
                            {currentPage !== 1 && (
                                <a className="page-link" onClick={prevPage} href='javascript:;'>Previous </a>)}
                        </li>
                        {pageNumbers.map(pgNumber => (
                            <li key={pgNumber}
                                className={`page-item ${currentPage == pgNumber ? 'active' : ''} `}>

                                <a onClick={() => setCurrentPage(pgNumber)}
                                   className='page-link'
                                   href='#'>

                                    {pgNumber}
                                </a>
                            </li>
                        ))}
                        <li className="page-item">
                            {nPages !== currentPage && (<a className="page-link" onClick={nextPage} href='#'>Next</a>)}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Navigation