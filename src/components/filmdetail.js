import React from 'react';
import Loader from './common/loader';
import Error from './common/error';

class FilmDetail extends React.Component {
    state = {
        loading: true,
        error: null,
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: []
    }

    async componentDidMount() {
        const url = process.env.REACT_APP_BASE_URL;
        const { id } = this.props.match.params;
        try {
            const makeAPICall = url => fetch(url)
                .then(response => response.json())
                .catch(err => null)
            const response = await fetch(`${url}films/${id}`);
            const film = await response.json();
            const {
                characters = [],
                planets = [],
                starships = [],
                vehicles = [],
                species = [],
            } = film;
            const charactersPromise = Promise.all(characters.map(makeAPICall));
            const planetsPromise = Promise.all(planets.map(makeAPICall));
            const starshipsPromise = Promise.all(starships.map(makeAPICall));
            const vehiclesPromise = Promise.all(vehicles.map(makeAPICall));
            const speciesPromise = Promise.all(species.map(makeAPICall));
            const filmDetails = await Promise.all(
                [
                    charactersPromise,
                    planetsPromise,
                    starshipsPromise,
                    vehiclesPromise,
                    speciesPromise
                ]
            )
            const charactersList = filmDetails[0].filter(Boolean).map(character => character.name);
            const planetsList = filmDetails[1].filter(Boolean).map(planet => planet.name);
            const starshipsList = filmDetails[2].filter(Boolean).map(starship => starship.name);
            const vehiclesList = filmDetails[3].filter(Boolean).map(vehicle => vehicle.name);
            const speciesList = filmDetails[4].filter(Boolean).map(specie => specie.name);

            this.setState({
                loading: false,
                error: null,
                characters: charactersList,
                planets: planetsList,
                starships: starshipsList,
                vehicles: vehiclesList,
                species: speciesList
            })
        } catch (err) {
            this.setState({
                error: err.message,
                loading: false
            })
        }
    }

    render() {

        const {
            loading,
            error,
        } = this.state;

        const elements = ['Characters', 'Planets', 'Starships', 'Vehicles', 'Species']

        return (
            <React.Fragment>
                {
                    !loading && error !== null && <Error error={error} />
                }
                {
                    !loading && error === null && (
                        <div className='film-container'>
                            {
                                elements.map(el => {
                                    if (this.state[el.toLowerCase()].length > 0) {
                                        return (
                                            <section>
                                                <label>{el}</label>
                                                <ul>
                                                    {
                                                        this.state[el.toLowerCase()].map(el => <li>{el}</li>)
                                                    }
                                                </ul>
                                            </section>
                                        )
                                    }
                                    return null
                                })
                            }
                        </div>
                    )
                }
                {
                    loading && <Loader />
                }
            </React.Fragment>
        )
    }
}

export default FilmDetail;