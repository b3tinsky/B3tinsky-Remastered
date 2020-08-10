import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import Head from "../components/head"
import { faTags } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import blogStyles from "../styles/pages/blog.module.scss"

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
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
  `)

  return (
    <Layout>
      <Head title="Blog" />
      <h1>
        Blog{" "}

      </h1>
      <ol className={blogStyles.posts}>
        {data.allMarkdownRemark.edges.map((edge, index) => {
          return (
            <li key={index} className={blogStyles.post}>
              <hr />
              <Link to={`/blog/${edge.node.fields.slug}`}>
                <h2>{edge.node.frontmatter.title}</h2>
                <p>
                  {edge.node.frontmatter.date}{" "}
                  {edge.node.frontmatter.tags
                    ? edge.node.frontmatter.tags.map((tag, i) => {
                        return (
                          <span key={i} className={`tagPill-${tag}`}>
                            {tag}
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
    </Layout>
  )
}

export default BlogPage
