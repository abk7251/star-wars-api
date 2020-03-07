import React from 'react';
import {
    Switch,
    Route,
    Link
} from "react-router-dom";

class Starwars extends React.Component {
    state = {
        categories: {},
        loading: true,
    }

    async componentDidMount() {
        const url = process.env.REACT_APP_BASE_URL;
        try {
            const response = await fetch(`${url}/`);
            const json = await response.json();
            const categories = Object.keys(json).sort().reduce((acc, el) => {
                acc[el] = json[el];
                return acc;
            }, {});
            this.setState({
                categories,
                loading: false
            })
        } catch (err) {
            console.error(err)
        }
    }

    render() {

        const { categories, loading } = this.state;

        return (
            <div className='categories'>
                {
                    !loading ? (
                        <div className ='card-container'>
                            {
                                Object.keys(categories).map(category => <Link to={`/${category}`}>{category}</Link>)
                            }
                        </div>
                    ) : (
                            <div className='loader'>
                                <span><i className="fa fa-circle-o-notch fa-spin"></i></span>
                                <p>Loading</p>
                            </div>
                        )
                }
            </div>
        )
    }
}

export default Starwars;