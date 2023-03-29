import React, { useState } from "react"

import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Head from "../components/head"
import Navbar from "../components/navbar"
import * as horrorStyles from "../styles/pages/horrorfilms.module.scss"
import GradingModal from "../components/horrorfilms/GradingModal"

const HorrorFilmsPage = () => {
  const [modalShow, setModalShow] = useState(true);
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(png)|(webp)|(jpeg)/" }
          relativeDirectory: { regex: "/(images/horrorfilms)|(horrorfilms)/" }
        }
      ) {
        edges {
          node {
            base
            name
            relativeDirectory
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
      }
    }
  `)
  return (
    <div>
      <Navbar />
      <Head title="Horror Films" />
      <section className={horrorStyles.photogrid}>
        {data.allFile.edges.map(({ node }, index) => (
          
          <div className={`${horrorStyles.box} ${`horrorStyles.box_grading_${node.name.match(/\[[A-Z]{3}\]/) ? node.name.match(/\[[A-Z]{3}\]/)[0].substr(1,3) : "NUL"}`}`} key={index}>
            {/* {
              console.log( node.name.match(/\[[A-Z]{3}\]/) ? node.name.match(/\[[A-Z]{3}\]/)[0].substr(1,3) : node.name )
            } */}
            <div className={horrorStyles.imgBox}>
              <GatsbyImage image={node.childImageSharp.gatsbyImageData} className={horrorStyles.img} alt={node.name}></GatsbyImage>
              <div className={horrorStyles.content}>
                <h3>{node.name.slice(0, node.name.length-12)}</h3>
                <a
                  href={`https://www.google.com/search?q=intext%3A${node.name.slice(0, node.name.length-5)}`}
                  className={
                    horrorStyles.btnD
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Search
                </a>
              </div>
            </div>
          </div>
        ))}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </section>
        <GradingModal show={modalShow} onHide={() => setModalShow(false)}/>
    </div>
  )
}

export default HorrorFilmsPage
