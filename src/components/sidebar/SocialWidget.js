import React from 'react'
import PropTypes from 'prop-types'
import { AiOutlineTwitter, AiFillMediumSquare, AiFillLinkedin, AiOutlineGithub, AiFillFacebook } from 'react-icons/ai'
import { FiRss } from 'react-icons/fi'

import config from '../../utils/siteConfig'

/**
* Social widget
*/

const SocialWidget = ({ site }) => {
  const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
  const facebookUrl = site.twitter ? `https://facebook.com/${site.facebook.replace(/^@/, ``)}` : null

  return (
    <>
      <div className="widget social">
        <a href={twitterUrl} className="twitter" key="twitter-sidebar" target="_blank" rel="noopener noreferrer"><button aria-label="twitter"><AiOutlineTwitter /></button></a>
        <a href={config.social.medium} className="medium" key="medium-sidebar" target="_blank" rel="noopener noreferrer"><button aria-label="medium"><AiFillMediumSquare /></button></a>
        <a href={config.social.linkedin} className="linkedin" key="linkedin-sidebar" target="_blank" rel="noopener noreferrer"><button aria-label="linkedin"><AiFillLinkedin /></button></a>
        <a href={config.social.github} className="github" key="github-sidebar" target="_blank" rel="noopener noreferrer"><button aria-label="github"><AiOutlineGithub /></button></a>
        <a href={facebookUrl} className="facebook" key="facebook-sidebar" target="_blank" rel="noopener noreferrer"><button aria-label="facebook"><AiFillFacebook /></button></a>
        <a href={config.social.feedly} className="rss" key="rss-sidebar" target="_blank" rel="noopener noreferrer"><button aria-label="rss"><FiRss /></button></a>
      </div>
    </>
  )
}

SocialWidget.propTypes = {
  site: PropTypes.shape({
    twitter: PropTypes.string,
    facebook: PropTypes.string,
  }),
}

export default SocialWidget
