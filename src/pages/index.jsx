import React from "react"
import Layout from "../components/layout"
import Head from "../components/head"
import phrasesFile from "../phrases.jsx"
import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Typewriter from "typewriter-effect"

const IndexPage = () => {
  const data = useStaticQuery(graphql`{
  articles: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/posts/"}}
    sort: {frontmatter: {date: DESC}}
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
    filter: {fileAbsolutePath: {regex: "/projects/"}}
    sort: {frontmatter: {date: DESC}}
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
              gatsbyImageData(layout: FULL_WIDTH)
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
    filter: {extension: {regex: "/(jpg)|(png)/"}, absolutePath: {regex: "/(images/books)|(books)/"}}
    sort: {name: DESC}
    limit: 1
  ) {
    edges {
      node {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  }
}`)

  const phrases = phrasesFile

  return (
    <div className="homeBackground">
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
                    <GatsbyImage
                      image={edge.node.frontmatter.cover.childImageSharp.gatsbyImageData}
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
              <GatsbyImage
                image={edge.node.childImageSharp.gatsbyImageData}
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
