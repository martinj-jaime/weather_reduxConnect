import PropTypes from 'prop-types'
import React, { Component } from 'react'

import ForecastExtended from '../components/ForecastExtended'
import { connect } from 'react-redux'
import { getForecastDataFromCities, getCity } from '../reducers'

class ForecastExtendedContainer extends Component {

  render() {
    const { city, forecastData } = this.props
    return (
        city &&
        <ForecastExtended 
        city={city} 
        forecastData={forecastData} 
        />
    )
  }
}

ForecastExtendedContainer.propTypes = {
    city: PropTypes.string.isRequired,
    forecastData: PropTypes.array
}

// mapStateToProps = recibe el estado
// const mapStateToProps = (state) => ({ city: state.city })
const mapStateToProps = state => (
  { city: getCity(state), forecastData: getForecastDataFromCities(state) }
)

export default connect(mapStateToProps)(ForecastExtendedContainer)
