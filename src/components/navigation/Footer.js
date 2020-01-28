import React from 'react'
import PropTypes from 'prop-types'

import {
    Link,
    StaticQuery,
    graphql,
} from 'gatsby'
import config from '../../utils/siteConfig'
import SocialWidget from '../sidebar/SocialWidget'

const Footer = ({ navigation, site, data, template }) => {
    const authorLinks = data.allGhostAuthor.edges
    const topTags = data.tags.edges
    const siteTitle = site.title
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null
    const isHome = template === `home-template`
    const seriesLinks = data.series.edges
    const logo = site.logo
    const description = site.description

    return (
        <>
            {/* The footer at the very bottom of the screen */}
            <footer className="site-footer">
                <div className="footer-wrapper">
                    <div className="footer-widgets">
                        <div className="widget about">
                            <Link to="/" className="footer-logo">
                                { logo ? <img className="lazyload" data-src={logo} alt={site.title}/> : <h1 className="site-headline">{site.title} </h1> }
                            </Link>
                            <p className="description">{description}</p>
                            <SocialWidget />
                        </div>
                        <div className="widget pages">
                            <h5 className="footer-widget-title">Pages</h5>
                            <div className="link-grid">
                                {navigation.map((navItem, i) => {
                                    if (navItem.url.includes(config.siteUrl)) {
                                        return <Link className={`footer-navigation-link ${navItem.label}`} to={`/${navItem.url.split(`/`).pop()}/`} key={i} >{navItem.label}</Link>
                                    } else {
                                        return <a className="footer-navigation-link donate" href={navItem.url} key={i} target="_blank" rel="noopener noreferrer">{navItem.label}</a>
                                    }
                                })}
                            </div>
                        </div>
                        {/*<div className="widget tags">
                            <h5 className="footer-widget-title">Tags</h5>
                            <div className="link-grid">
                                {topTags.map(({ node }) => (
                                    <Link to={`/tag/${ node.slug }`} className="footer-navigation-link" key={`${ node.slug }-footer-link`}>{ node.name }</Link>
                                ))}
                            </div>
                        </div>*/}
                        <div className="widget series">
                            <h5 className="footer-widget-title">Series</h5>
                            <div className="link-grid">
                                {seriesLinks.map(({ node }) => (
                                    <Link to={`/series/${ node.slug}`} className="footer-navigation-link" key={`${ node.slug }-footer-link`}>{ node.name.replace(`#`, ``) }</Link>
                                ))}
                            </div>
                        </div>
                        <div className="widget authors">
                            <h5 className="footer-widget-title">Authors</h5>
                            <div className="link-grid">
                                {authorLinks.map(({ node }) => (
                                    <Link to={`/author/${ node.slug }`} className="footer-navigation-link" key={`${ node.name }-footer-link`} >{ node.name }</Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <p className="copyright-txt">{config.siteCopyright}</p>
                </div>
            </footer>
        </>
    )
}

Footer.propTypes = {
    data: PropTypes.shape({
        allGhostAuthor: PropTypes.object.isRequired,
        tags: PropTypes.object,
        series: PropTypes.object,
    }).isRequired,
    site: PropTypes.shape({
        title: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        twitter: PropTypes.string,
        facebook: PropTypes.string,
    }),
    navigation: PropTypes.arrayOf(
        PropTypes.shape({
            slug: PropTypes.string,
            name: PropTypes.string,
        })
    ).isRequired,
    template: PropTypes.string,
}

const FooterQuery = props => (
    <StaticQuery query = {
        graphql `
            query FooterQuery {
              allGhostAuthor(sort: {order: DESC, fields: postCount}) {
                edges {
                  node {
                    url
                    name
                    slug
                  }
                }
              }
              tags: allGhostTag(limit: 12, sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "public"}, slug: {nin: ["roundup", "excel"]}}) {
                edges {
                  node {
                    name
                    slug
                  }
                }
              }
              series: allGhostTag(limit: 7, sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "internal"}, postCount: {gt: 3}, slug: {nin: "adventures-in-excel"}}) {
                edges {
                  node {
                    slug
                    name
                  }
                }
              }
            }`
    }
    render={data => <Footer data={data} {...props} />}
    />
)

export default FooterQuery
