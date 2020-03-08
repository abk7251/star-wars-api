import React from 'react';
import Loader from './common/loader';
import Error from './common/error';
import Pagination from './pagecontrols/pagination';
import Table from './pagecontrols/table';
import debounce from '../utils/debounce';
import { sortUp, sortDown } from '../utils/sort';

class People extends React.Component {
    state = {
        loading: true,
        error: null,
        people: [],
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
        const { sortState, people } = this.state;
        let newSortState;
        let data;
        if (sortState === 'down') {
            data = sortUp(el, people);
            newSortState = 'up';
        } else {
            data = sortDown(el, people);
            newSortState = 'down';
        }
        this.setState({
            people: data,
            sortState: newSortState
        })
    }

    fetchData = async (pageNo, search) => {
        const url = process.env.REACT_APP_BASE_URL;
        const testValue = value => value === "unknown" || value === "n/a" || value === "none" ? undefined : value;
        try {
            const response = await fetch(`${url}people?page=${pageNo}&search=${search}`)
            const json = await response.json();
            const total = json.count;
            const people = json.results.map(el => {
                return {
                    name: testValue(el.name),
                    height: testValue(el.height),
                    mass: testValue(el.mass),
                    hair_color: testValue(el.hair_color),
                    skin_color: testValue(el.skin_color),
                    eye_color: testValue(el.eye_color),
                    birth_year: testValue(el.birth_year) !== undefined ? parseInt(testValue(el.birth_year)) : undefined,
                    gender: testValue(el.gender)
                }
            })
            this.setState({
                people,
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

        const { loading, error, people, current, total } = this.state;

        return (
            <React.Fragment>
                {
                    !loading && error !== null && <Error error={error} />
                }
                {
                    <div className='main-container'>
                        {
                            !loading && error === null && (
                                <React.Fragment>
                                    <div className='search-bar'>
                                        <input
                                            type="text"
                                            placeholder="search..."
                                            name="search"
                                            autoComplete="off"
                                            value={this.state.search}
                                            onChange={this.handleSearch}
                                        />
                                    </div>
                                    <Table
                                        heading={Object.keys(people[0])}
                                        body={people}
                                        handleSort={this.handleSort}
                                    />
                                    <div className='pagination'>
                                        <Pagination
                                            current={current}
                                            total={total}
                                            navigateToPage={this.navigateToPage}
                                        />
                                    </div>
                                </React.Fragment>
                            )
                        }
                    </div>
                }
                {
                    loading && <Loader />
                }
            </React.Fragment>
        )
    }
}

export default People;