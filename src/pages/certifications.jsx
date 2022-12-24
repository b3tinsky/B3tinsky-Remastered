import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Navbar from "../components/navbar"
import Head from "../components/head"
import * as certificationStyles from "../styles/pages/certifications.module.scss"
import { GatsbyImage } from "gatsby-plugin-image"

const CertificationsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allDirectory(
        filter: { relativeDirectory: { regex: "/images/certifications/" } }
        sort: { fields: base, order: DESC }
      ) {
        edges {
          node {
            relativePath
            base
            name
          }
        }
      }
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(png)/" }
          relativeDirectory: {
            regex: "/(images/certifications)|(certifications)/"
          }
        }
        sort: { fields: base, order: ASC }
      ) {
        totalCount
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


  let years = []

  data.allDirectory.edges.map(({ node }) => years.push(node.base))

  let certs = []

  data.allFile.edges.map(({ node }) => certs.push(node))

  const [displayCert, setDisplayCert] = useState(certs[0])


  const handleMouseEnter = e => {
    e.target.style.color = "orange"
    setDisplayCert(certs[e._targetInst.index])
  }
  const handleMouseLeave = e => {
    e.target.style.color = "white"
  }

  return (
    <div>
      <Head title="Certifications" />
      <Navbar />

      <section className={certificationStyles.photogrid}>
        <ul className={certificationStyles.certs_text}>
          {certs.map((cert, index) => (
            <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={`${`certificationStyles.box_grading_${cert.name.match(/\(\*\)/) ? "LEG" : "NUL"}`}`}>{cert.name}</li>
          ))}
        </ul>

        <div className={certificationStyles.certs_image}>
            <GatsbyImage image={displayCert.childImageSharp.gatsbyImageData} />
        </div>
      </section>
    </div>
  )
}

export default CertificationsPage
