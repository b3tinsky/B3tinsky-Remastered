import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Navbar from "../components/navbar"
import Head from "../components/head"
import * as photographyStyles from "../styles/pages/photography.module.scss"
import { GatsbyImage } from "gatsby-plugin-image"

const PhotographyPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(png)/" }
          relativeDirectory: { regex: "/(images/photography)|(photography)/" }
        }
        sort: { fields: name, order: ASC }
      ) {
        edges {
          node {
            base
            name
            relativeDirectory
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  `)
  return (
    <div>
      <Head title="Photography" />
      <Navbar />
      <section className={photographyStyles.photogrid}>
        {data.allFile.edges.map(({ node }, index) => (
            <GatsbyImage
              key={index}
              image={node.childImageSharp.gatsbyImageData}
              alt={node.name}
            />
        ))}
      </section>
    </div>
  )
}

export default PhotographyPage
