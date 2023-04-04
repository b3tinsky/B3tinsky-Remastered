import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import Navbar from "../components/navbar"
import Head from "../components/head"
import { GatsbyImage } from "gatsby-plugin-image"

import * as projectsStyles from "../styles/pages/projects.module.scss"

const ProjectsPage = () => {
  const data = useStaticQuery(graphql`{
  projects: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/src/projects/"}}
    sort: {frontmatter: {date: DESC}}
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
  miniprojects: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/src/miniprojects/"}}
    sort: {frontmatter: {date: DESC}}
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
}`)

  return (
    <div>
      <Navbar />
      <Head title="Projects" />
      <div className={projectsStyles.container}>
        
          <h1 className={projectsStyles.title}>Projects</h1>
          <hr />
          <section className={projectsStyles.projectgrid}>
            {data.projects.edges.map((edge, index) => {
              return (
                <div key={index} className={projectsStyles.post}>
                  <Link to={`/projects/${edge.node.fields.slug}`}>
                    <h1 style={{ textAlign: "center" }}>{edge.node.frontmatter.title}</h1>
                    <GatsbyImage
                      image={edge.node.frontmatter.cover.childImageSharp.gatsbyImageData}
                      alt={edge.node.frontmatter.title}
                    />
                    <p>{edge.node.frontmatter.description}</p>
                    <p>
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
                    <br></br>
                    </p>
                  </Link>
                </div>
              )
            })}
          </section>



          <h1 className={projectsStyles.title}>Mini Projects</h1>
          <hr />
          <section className={projectsStyles.projectgrid}>
            {data.miniprojects.edges.map((edge, index) => {
              return (
                <div key={index} className={projectsStyles.post}>
                  <Link to={`/miniprojects/${edge.node.fields.slug}`}>
                    <h1 style={{ textAlign: "center" }}>{edge.node.frontmatter.title}</h1>
                    <GatsbyImage
                      image={edge.node.frontmatter.cover.childImageSharp.gatsbyImageData}
                      alt={edge.node.frontmatter.title}
                    />
                    <p>{edge.node.frontmatter.description}</p>
                    <p>
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
                    <br></br>
                    </p>
                  </Link>
                </div>
              )
            })}
          </section>
        
      </div>
    </div>
  )
}

export default ProjectsPage
