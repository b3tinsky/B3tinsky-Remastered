import React from "react"
import Layout from "../components/layout"
import Head from "../components/head"
import phrasesFile from "../phrases.js"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import Typewriter from "typewriter-effect"
import { random } from "lodash"
import { faHeart } from "@fortawesome/free-solid-svg-icons"


const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      articles: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/posts/" } }
        sort: { fields: frontmatter___date, order: DESC }
        limit: 3
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

      projects: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/projects/" } }
        sort: { fields: frontmatter___date, order: DESC }
        limit: 1
      ) {
        edges {
          node {
            frontmatter {
              title
              date(formatString: "MMM, DD YYYY")
              tags
              cover {
                childImageSharp {
                  fluid {
                    sizes
                    aspectRatio
                    srcSet
                    base64
                    src
                    originalImg
                  }
                }
              }
              description
            }

            fields {
              slug
            }
          }
        }
      }

      books: allFile(
        filter: {
          extension: { regex: "/(jpg)|(png)/" }
          absolutePath: { regex: "/(images/books)|(books)/" }
        }
        sort: { fields: birthTime, order: DESC }
        limit: 1
      ) {
        edges {
          node {
            childImageSharp {
              fluid {
                sizes
                aspectRatio
                srcSet
                base64
                src
                originalImg
              }
            }
          }
        }
      }
    }
  `)

  const phrases = phrasesFile

  phrases.sort(() => random() - 0.5);
  return (
    <div id="homeBackground">
      <Layout>
        <Head title="Home" />
        <div className={"typeWriterDiv"}>
        <Typewriter
          options={{loop: true, autoStart: true, strings: phrases, pauseFor: 5000, delay: 50, deleteSpeed: 10}}
          className={"typeWriterStyle"}
        />

        </div>
        <h3 className={"indexH3"}>Latest Blog Posts</h3>
        <div className={"indexCard"}>
          <ul>
            {data.articles.edges.map((edge, index) => {
              return (
                <li key={index}>
                  <Link to={`/blog/${edge.node.fields.slug}`}>
                    <p style={{ textAlign: "center" }}>
                      {edge.node.frontmatter.title}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <h3 className={"indexH3"}>Latest Project</h3>
        <div className={"indexCard"}>
          <ul>
            {data.projects.edges.map((edge, index) => {
              return (
                <li key={index}>
                  <Link to={`/projects/${edge.node.fields.slug}`}>
                    <Img
                      fluid={edge.node.frontmatter.cover.childImageSharp.fluid}
                      alt={edge.node.frontmatter.title}
                    />
                    <p style={{ textAlign: "center" }}>
                      {edge.node.frontmatter.title}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <h3 className={"indexH3"}>Latest Book Read</h3>
        <div style={{ padding: "0 25%" }}>
          {data.books.edges.map((edge, index) => {
            return (
              <Img
                fluid={edge.node.childImageSharp.fluid}
                className={"indexCard"}
              />
            )
          })}
        </div>
      </Layout>
    
    </div>
  )
}

export default IndexPage
