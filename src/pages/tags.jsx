import React from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import * as blogStyles from "../styles/pages/blog.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faTags } from "@fortawesome/free-solid-svg-icons"



// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <div>
    <Helmet title={title} />
    <Layout>
      <div>
        
        <h1><FontAwesomeIcon icon={faTags}/> Tags</h1>
        <ul style={{listStyle:'none'}}>
          {group.map(tag => (
            <li key={tag.fieldValue}>
              <span className={`tagPill-${tag.fieldValue}`} style={{float:'left', borderRadius: '0'}}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              [ {tag.totalCount} ] {tag.fieldValue}
              </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  </div>
)

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}
        // filter: { fileAbsolutePath: { regex: "/posts/" } }

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
