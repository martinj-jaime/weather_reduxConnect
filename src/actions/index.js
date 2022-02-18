import transformForecast from '../services/transformForecast'
import transformWeather from '../services/transformWeather';

export const SET_CITY = 'SET_CITY';
export const SET_FORECAST_DATA = 'SET_FORECAST_DATA'
export const GET_WEATHER_CITY = 'GET_WEATHER_CITY'
export const SET_WEATHER_CITY = 'SET_WEATHER_CITY'

const setCity = payload => ({ type: SET_CITY, payload: payload })
const setForecastData = payload => ({ type: SET_FORECAST_DATA, payload: payload })

const getWeatherCity = payload => ({ type: GET_WEATHER_CITY, payload: payload })
const setWeatherCity = payload => ({ type: SET_WEATHER_CITY, payload: payload })

const api_key = "f99bbd9e4959b513e9bd0d7f7356b38d";
// setSelectedCity //
const url_forecast = "http://api.openweathermap.org/data/2.5/forecast";
export const setSelectedCity = payload => {
    // payload = city
    return (dispatch, getState) => {
        const api_forecast = `${url_forecast}?q=${payload}&appid=${api_key}`;

        // activar en el estado un indicador de busqueda de datos
        dispatch(setCity(payload))

        const state = getState()
        const date = state.cities[payload] && state.cities[payload].forecastDataDate

        const now = new Date()

        if (date && (now-date) < 1 *60 *1000) {
            return
        }
        
        return fetch(api_forecast).then(
            data => (data.json())
        ).then(
            weather_data => {
                // console.log(weather_data);
                const forecastData = transformForecast(weather_data);
                console.log(forecastData);

                // modificar el estado con el resultado de la promise
                dispatch(setForecastData({ city: payload, forecastData }))
            }
        );
    }
}

// setWeather //
const url_weather = "http://api.openweathermap.org/data/2.5/weather";
export const setWeather = payload => {

    // thunk     // payload = array of cities
    return dispatch => {
        payload.forEach(city => {
            // pedir datos de  ciudad
            dispatch(getWeatherCity(city))

            const api_weather = `${url_weather}?q=${city}&appid=${api_key}`;
            fetch(api_weather).then( data => {
                return data.json();
            }).then( weather_data => {
                const weather = transformWeather(weather_data);
                
                // setear los datos
                dispatch(setWeatherCity({ city, weather }))
            });
        })
    }
}