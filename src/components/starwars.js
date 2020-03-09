import React from 'react';
import Loader from './common/loader';
import Error from './common/error';
import {
    Switch,
    Route,
    Link
} from "react-router-dom";

class Starwars extends React.Component {
    state = {
        categories: {},
        loading: true,
        error: null,
    }

    async componentDidMount() {
        const url = process.env.REACT_APP_BASE_URL;
        try {
            const response = await fetch(url);
            const json = await response.json();
            const categories = Object.keys(json).sort().reduce((acc, el) => {
                if(['species', 'starships', 'vehicles'].includes(el)){
                    return acc;
                }
                acc[el] = json[el];
                return acc;
            }, {});
            this.setState({
                categories,
                error: null,
                loading: false
            })
        } catch (err) {
            this.setState({
                error: err.message,
                loading: false
            })
        }
    }

    render() {

        const { categories, loading, error } = this.state;


        return (
            <React.Fragment>
                {
                    !loading && error !== null && <Error error={error} />
                }
                <div className='main-container'>
                    {
                        !loading && error === null && (
                            <div className='card-container'>
                                {
                                    Object.keys(categories).map(category => <Link to={`/${category}`}>{category}</Link>)
                                }
                            </div>
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

export default Starwars;