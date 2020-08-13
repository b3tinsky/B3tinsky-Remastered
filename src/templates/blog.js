import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Head from '../components/head'
export const query = graphql`
query (
    $slug: String!
  ) {
    markdownRemark  (
      fields: {
        slug: {
          eq : $slug
        }
      }
    ){
     frontmatter {
      title
      date
    }
    html
  }
  }
  `

const Blog = (props) => {
    return (
        <Layout>
          <Head title={props.data.markdownRemark.frontmatter.title} />
          <h1 style={{textAlign: "center"}}>{props.data.markdownRemark.frontmatter.title}</h1>
          <p style={{textAlign: "center"}}>{props.data.markdownRemark.frontmatter.date}</p>
          <div dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}} style={{textAlign: "justify"}}></div>
        </Layout>
    )
}

export default Blog