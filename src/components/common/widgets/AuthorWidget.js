import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const AuthorWidget = ({ data }) => {
    const site = data.allGhostSettings.edges[0].node

    return (
    <>
        <div className="widget author">
            <Link to="/" className="about-logo-link">
                {site.logo ? <img className="site-logo" src={site.logo} alt={site.title} /> : <h1> {site.title} </h1> }
            </Link>
            <p className="description">{site.description}</p>
        </div>
    </>
    )
}

AuthorWidget.propTypes = {
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

export default AuthorWidget
