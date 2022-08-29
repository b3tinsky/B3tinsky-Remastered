import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import Head from "../components/head"
import { GatsbyImage } from "gatsby-plugin-image"
import * as AboutStyles from "../styles/pages/about.module.scss"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faDatabase } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// import { WindupChildren, useWindupString } from "windups"

const AboutPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          name: { regex: "/ItsAMe/"}
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
      <Head title="About" />
      <Link to="/horrorfilms">
        <h3 className={AboutStyles.showMeTheRiddle}>
          <span role="img" aria-label="knife">🔪</span>
        </h3>
      </Link>
      <br />
      <br />
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
      <br />

      <p style={{ color: "white" }}>
            "I'm a Computer Science student with an interest in software & web development. I love building things and learning new stuff. The purpose of this website is documenting my learning in a public manner (kind of like a Feynman Technique) while also giving a small glimpse into my world."
      </p>
      {/* <br /> */}

      <Link to="/certifications">
        <h3>
          <span role="img" aria-label="paper">
          📃
          </span>{" "}
          Certifications
        </h3>
      </Link>
      <p>
        A small showroom for my digital certifications. This page also helps me identify which certifications are more relevant when applying to a new job.{" "}
        <Link to="/certifications" style={{ color: "orange" }}>
          See my certifications here
        </Link>
        .
      </p>

      <Link to="/books">
        <h3>
          <span role="img" aria-label="book">
            📚
          </span>{" "}
          Books
        </h3>
      </Link>
      <p>
        I love reading and I've always wanted to have my own library, but being
        in the era of eBooks I don't think thats reasonable. So, I tried making
        a virtual library, while also keeping count of how many I've read, all
        in{" "}
        <Link to="/books" style={{ color: "orange" }}>
          this page
        </Link>
        .
      </p>

      <Link to="/photography">
        <h3>
          <span role="img" aria-label="camera">
            📷
          </span>{" "}
          Photography
        </h3>
      </Link>
      <p>
        I also like photography and do it as my hobby and side job.{" "}
        <Link to="/photography" style={{ color: "orange" }}>
          Here
        </Link>{" "}
        you can see some of the projects i've done, and if you are interested in
        a photography session, contact me ;)
      </p>

      <h3>
        <span role="img" aria-label="phone">📞 </span> Contact Me
      </h3>
      <br/>
      <Link to="https://github.com/betorendon">
        <FontAwesomeIcon icon={faGithub} className={AboutStyles.brandIcon} transform="grow-20"/>
      </Link>
      
      <Link to="https://www.linkedin.com/in/betorendon/">
        <FontAwesomeIcon icon={faLinkedin} className={AboutStyles.brandIcon} transform="grow-20" />
      </Link>
      
      <Link to="https://www.datacamp.com/profile/betorendonruiz">
        <FontAwesomeIcon icon={faDatabase} className={AboutStyles.brandIcon} transform="grow-20" />
      </Link>
    </Layout>
  )
}

export default AboutPage
