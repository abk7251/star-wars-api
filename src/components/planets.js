import React from 'react';
import Loader from './common/loader';
import Error from './common/error';
import Pagination from './pagecontrols/pagination';
import Table from './pagecontrols/table';
import debounce from '../utils/debounce';
import { sortUp, sortDown } from '../utils/sort';

class Planets extends React.Component {
    state = {
        loading: true,
        error: null,
        planets: [],
        total: 0,
        current: 1,
        search: '',
        sortState: null,
    }

    componentDidMount() {
        this.debouncedSearch = debounce(this.fetchData, 300)
        this.navigateToPage(1, this.state.search)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.search !== prevState.search) {
            this.setState({ loading: true })
            this.debouncedSearch(1, this.state.search)
        }
    }

    navigateToPage = (pageNo) => {
        this.setState({
            loading: true
        })
        this.fetchData(pageNo, this.state.search)
    }

    handleSearch = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSort = el => {
        const { sortState, planets } = this.state;
        let newSortState;
        let data;
        if (sortState === 'down') {
            data = sortUp(el, planets);
            newSortState = 'up';
        } else {
            data = sortDown(el, planets);
            newSortState = 'down';
        }
        this.setState({
            planets: data,
            sortState: newSortState
        })
    }

    fetchData = async (pageNo, search) => {
        const url = process.env.REACT_APP_BASE_URL;
        const testValue = value => value === "unknown" || value === "n/a" || value === "none" ? undefined : value;
        try {
            const response = await fetch(`${url}planets?page=${pageNo}&search=${search}`)
            const json = await response.json();
            const total = json.count;
            const planets = json.results.map(el => {
                return {
                    Name: testValue(el.name),
                    Climate: testValue(el.climate),
                    Diameter: testValue(el.diameter),
                    'Orbital period': testValue(el.orbital_period),
                    Population: testValue(el.population),
                    'Rotation Period': testValue(el.rotation_period),
                    'Surface water': testValue(el.surface_water),
                    Terrain: testValue(el.terrain)
                }
            })
            this.setState({
                planets,
                total,
                current: pageNo,
                loading: false,
                error: null,
            })
        } catch (err) {
            this.setState({
                error: err.message,
                loading: false
            })
        }
    }

    render() {

        const { loading, error, planets, current, total } = this.state;

        return (
            <React.Fragment>
                {
                    !loading && error !== null && <Error error={error} />
                }
                {
                    <div className='main-container'>
                        <React.Fragment>
                            {
                                error === null && (
                                    <div className='search-bar'>
                                        <input
                                            type="text"
                                            placeholder="search here..."
                                            name="search"
                                            autoComplete="off"
                                            value={this.state.search}
                                            onChange={this.handleSearch}
                                            spellcheck="false"
                                        />
                                    </div>
                                )
                            }
                            {
                                !loading && error === null ? (
                                    <React.Fragment>
                                        {
                                            planets.length > 0 ? (
                                                <Table
                                                    heading={Object.keys(planets[0])}
                                                    body={planets}
                                                    handleSort={this.handleSort}
                                                />
                                            ) : <h1 style={{ textAlign: 'center' }}>
                                                    Sorry !!! Nothing was found
                                                </h1>
                                        }
                                    </React.Fragment>
                                ) : loading && <Loader />
                            }
                            {
                                !loading && error === null && planets.length > 0 && (
                                    <div className='pagination'>
                                        <Pagination
                                            current={current}
                                            total={total}
                                            navigateToPage={this.navigateToPage}
                                        />
                                    </div>
                                )
                            }
                        </React.Fragment>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default Planets;