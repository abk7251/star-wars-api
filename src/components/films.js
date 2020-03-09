import React from 'react';
import Loader from './common/loader';
import Error from './common/error';
import Pagination from './pagecontrols/pagination';
import Table from './pagecontrols/table';
import { sortUp, sortDown } from '../utils/sort';

class Films extends React.Component {
    state = {
        loading: true,
        films: [],
        error: null,
        current: 1,
        total: 0,
    }

    async componentDidMount() {
        const url = process.env.REACT_APP_BASE_URL;
        try {
            const response = await fetch(`${url}films`);
            const json = await response.json();
            const total = json.count;
            const films = json.results
                .map(res => ({
                    'Episode no': res.episode_id,
                    Title: res.title,
                    Director: res.director,
                    Producer: res.producer,
                    'Release date': res.release_date
                }))
                .sort((a, b) => a['Episode no'] > b['Episode no'] ? 1 : -1);
            this.setState({
                error: null,
                loading: false,
                total,
                films
            })
        } catch (err) {
            this.setState({
                error: err.message,
                loading: false
            })
        }
    }

    handleRowClick = id => this.props.history.push(`/films/${id}`);

    handleSort = el => {
        const { sortState, films } = this.state;
        let newSortState;
        let data;
        if (sortState === 'down') {
            data = sortUp(el, films);
            newSortState = 'up';
        } else {
            data = sortDown(el, films);
            newSortState = 'down';
        }
        this.setState({
            films: data,
            sortState: newSortState
        })
    }

    render() {

        const { films, loading, error, current, total } = this.state;

        return (
            <React.Fragment>
                {
                    !loading && error !== null && <Error error={error} />
                }
                <div className='film-container'>
                    {
                        !loading && error === null && (
                            <React.Fragment>
                                <Table
                                    heading={Object.keys(films[0])}
                                    body={films}
                                    handleSort={this.handleSort}
                                    title='click to see film details'
                                    handleRowClick={this.handleRowClick}
                                />
                                <div className='pagination'>
                                    <Pagination
                                        current={current}
                                        total={total}
                                    />
                                </div>
                            </React.Fragment>
                        )
                    }
                    {
                        loading && <Loader />
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default Films;


// <table>
//     <thead>
//         <tr>
//             <th>Episode No</th>
//             <th>Title</th>
//             <th>Director</th>
//             <th>Producer(s)</th>
//             <th>Release date</th>
//         </tr>
//     </thead>
//     <tbody>
//         {
//             films.map(film =>
//                 <tr
//                     title='click for film detail'
//                     data-filmid={film.episode_id}
//                     onClick={this.handleRowClick}
//                 >
//                     <td>{film.episode_id}</td>
//                     <td>{film.title}</td>
//                     <td>{film.director}</td>
//                     <td>{film.producer}</td>
//                     <td>{film.release_date}</td>
//                 </tr>
//             )
//         }
//     </tbody>
// </table>