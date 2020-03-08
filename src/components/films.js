import React from 'react';
import Loader from './common/loader';
import Error from './common/error';
class Films extends React.Component {
    state = {
        loading: true,
        films: [],
        error: null,
    }

    async componentDidMount() {
        const url = process.env.REACT_APP_BASE_URL;
        try {
            const response = await fetch(`${url}films`);
            const json = await response.json();
            const films = json.results
                .map(res => res)
                .sort((a, b) => a.episode_id > b.episode_id ? 1 : -1);
            this.setState({
                error: null,
                loading: false,
                films
            })
        } catch (err) {
            this.setState({
                error: err.message,
                loading: false
            })
        }
    }

    handleRowClick = e => {
        const id = e.currentTarget.dataset.filmid;
        this.props.history.push(`/films/${id}`)
    }

    render() {

        const { films, loading, error } = this.state;

        return (
            <React.Fragment>
                {
                    !loading && error !== null && <Error error={error} />
                }
                <div className='main-container'>
                    {
                        !loading && error === null && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Episode No</th>
                                        <th>Title</th>
                                        <th>Director</th>
                                        <th>Producer(s)</th>
                                        <th>Release date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        films.map(film =>
                                            <tr
                                                title='click for film detail'
                                                data-filmid={film.episode_id}
                                                onClick={this.handleRowClick}
                                            >
                                                <td>{film.episode_id}</td>
                                                <td>{film.title}</td>
                                                <td>{film.director}</td>
                                                <td>{film.producer}</td>
                                                <td>{film.release_date}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
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