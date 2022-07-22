import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import Head from "../components/head"
import { faArrowLeftLong, faArrowRightLong, faTags } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as blogStyles from "../styles/pages/blog.module.scss"

export const data = graphql`
query ($skip: Int!, $limit: Int!){
  allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/posts/"}}, 
    sort: { fields: frontmatter___date, order: DESC }
    limit: $limit
    skip: $skip
    ) {
    edges {
      node {
        frontmatter {
          title
          date(formatString: "MMM, DD YYYY")
          tags
        }
        fields {
          slug
        }
      }
    }
  }
}
`

const BlogPage = (props) => {
  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/blog" : (currentPage - 1)
  const nextPage = isFirst ? (currentPage + 1).toString() : (currentPage + 1)

  return (
    <Layout>
      <Head title="Blog" />
      <h1 className={blogStyles.title}>
        Blog{" "}
        <span style={{ float: "right" }} >
          {" "}
          <Link to="/tags">
          <p>
            <FontAwesomeIcon icon={faTags} transform="grow-5 up-5" />
          </p>
          </Link>
        </span>
      </h1>
      {/* {console.log(props)} */}
      <ol className={blogStyles.posts}>
        {props.data.allMarkdownRemark.edges.map(edge => {
          return (
            <li className={blogStyles.post}>
              <hr />
              <Link to={`/blog/${edge.node.fields.slug}`}>
                <h2>{edge.node.frontmatter.title}</h2>
                <p>
                  {edge.node.frontmatter.date}{" "}
                  {edge.node.frontmatter.tags
                    ? edge.node.frontmatter.tags.map((tag, i) => {
                        return (
                          <span key={i} className={`tagPill-${tag}`}>
                            <Link to={`/tags/${tag.toLowerCase()}`}>
                            {tag}
                            </Link>
                          </span>
                        )
                      })
                    : null}
                </p>
              </Link>
            </li>
          )
        })}
      </ol>
      <hr />

      <div className={blogStyles.pagination}>
      {!isFirst && (
        <Link to={prevPage} rel="prev" className={blogStyles.pagination}>
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </Link>
      )}


      {Array.from({ length: numPages }, (_, i) => (
        <Link key={`pagination-number${i + 1}`} to={`/blog/${i === 0 ? "" : i + 1}`} className={blogStyles.pagination}>
          &ensp;{i + 1}&ensp;
        </Link>
      ))}

    {!isLast && (
      <Link to={nextPage} rel="next" className={blogStyles.pagination}>
          <FontAwesomeIcon icon={faArrowRightLong} />
        </Link>
      )}

    </div>

    </Layout>
  )
}

export default BlogPage
