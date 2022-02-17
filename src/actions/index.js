import transformForecast from '../services/transformForecast'

export const SET_CITY = 'SET_CITY';
export const SET_FORECAST_DATA = 'SET_FORECAST_DATA'

const setCity = payload => ({ type: SET_CITY, payload: payload })
const setForecastData = payload => ({ type: SET_FORECAST_DATA, payload: payload })

const api_key = "f99bbd9e4959b513e9bd0d7f7356b38d";
const url = "http://api.openweathermap.org/data/2.5/forecast";
export const setSelectedCity = payload => {
    // payload = city
    return dispatch => {
        const url_forecast = `${url}?q=${payload}&appid=${api_key}`;

        // activar en el estado un indicador de busqueda de datos
        dispatch(setCity(payload))

        return fetch(url_forecast).then(
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