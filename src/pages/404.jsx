import React from 'react'
import { Link, graphql, useStaticQuery } from "gatsby"
import Layout from '../components/layout'
import Head from '../components/head'
import { GatsbyImage } from "gatsby-plugin-image"


const NotFound = () => {
    const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          name: { regex: "/MS/"}
          relativeDirectory: { regex: "/(styles/Images)/" }
        }
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
        <Layout>
            <Head title="404"/>
            {data.allFile.edges.map(({ node }, index) => (
                <GatsbyImage
                key={index}
                image={node.childImageSharp.gatsbyImageData}
                style={{
                    gridColumn: "2 / 5",
                    width: "50%",
                    marginLeft: "25%",
                    borderRadius: "50%",
                    boxShadow: `
                                0 0 0 5px  rgb(255, 199, 46),
                                0 0 0 10px  rgb(255, 89, 89),
                                0 0 0 15px  rgb(155, 48, 255)
                                `,
                }}
                alt="TheBert"
                />
            ))}
            <br></br>
            <h1 style={{ textAlign: "center" }}>You missed </h1>
            <p style={{ textAlign: "center" }}><Link to="/">Click of shame</Link></p>
        </Layout>
    )
}

export default NotFound