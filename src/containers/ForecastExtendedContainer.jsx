import PropTypes from 'prop-types'
import React, { Component } from 'react'

import ForecastExtended from '../components/ForecastExtended'
import { connect } from 'react-redux'

class ForecastExtendedContainer extends Component {

  render() {
    return (
        this.props.city &&
        <ForecastExtended city={this.props.city} />
    )
  }
}

ForecastExtendedContainer.propTypes = {
    city: PropTypes.string.isRequired
}

// mapStateToProps = recibe el estado
// const mapStateToProps = (state) => ({ city: state.city })
const mapStateToProps = ({ city }) => ({ city })

export default connect(mapStateToProps)(ForecastExtendedContainer)
