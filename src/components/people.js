import React from 'react';
import Loader from './common/loader';
import Error from './common/error';
import Pagination from './pagecontrols/pagination';
import Search from './pagecontrols/search';
import Table from './pagecontrols/table';


class People extends React.Component {
    state = {
        loading: true,
        error: null,
        people: [],
        total: 0,
        currentPage: 1,
    }

    async componentDidMount() {
        const url = process.env.REACT_APP_BASE_URL;
        try {
            const response = await fetch(`${url}people?page=1`)
            const json = await response.json();
            const total = json.count;
            const people = json.results.map(el => {
                return {
                    name: el.name,
                    height: el.height,
                    mass: el.mass,
                    hair_color: el.hair_color,
                    skin_color: el.skin_color,
                    eye_color: el.eye_color,
                    birth_year: el.birth_year,
                    gender: el.gender
                }
            })
            this.setState({
                people,
                total,
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

        const { loading, error, people } = this.state;

        return (
            <React.Fragment>
                {
                    !loading && error !== null && <Error error={error} />
                }
                {
                    <div className='main-container'>
                        {
                            !loading && error === null &&
                            <Table
                                heading={Object.keys(people[0])}
                                body={people}
                            />
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