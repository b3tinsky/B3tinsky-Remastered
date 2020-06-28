import React, {useState} from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import Head from '../components/head'
import booksStyles from '../styles/pages/books.module.scss'
import Img from 'gatsby-image'

const BooksPage = () => {
    const [curr, setCurr] = useState(null);
    const data = useStaticQuery(graphql`
    query {
      allDirectory ( filter: {
                  relativeDirectory: {regex: "/images/books/"
              }
            }
          ){
      edges {
        node {
          relativePath
          base
          name
        }
      }
      },
      allFile( filter: {
                extension : {regex: "/(jpg)|(png)/"}
                relativeDirectory: {regex: "/(images/books)|(books)/"
              }
            }
          ) {
        edges {
          node {
            base
            name
            relativeDirectory
            childImageSharp {
              fluid {
                aspectRatio
                base64
                sizes
                src
                srcSet
              }
            }
          }
        }
      }
    }
  `)
  // let books = [];
  // {data.allFile.edges.map(({node})=>(
  //   books.push({
  //     year: node.relativeDirectory.slice(13, 17),
  //     title: node.name,
  //     cover: node.childImageSharp.fluid
  //   })
  // ))}
    return (
            <Layout>
            <Head title="Books" />
            <h1>Books</h1>
            <div className={booksStyles.row}>
                <div className={booksStyles.listColumn} >

                        <div>
                          {data.allFile.edges.map(({node})=>(
                    
                          <p 
                          onMouseEnter={() =>  setCurr(node.childImageSharp.fluid)}
                          onMouseLeave={() =>  setCurr(null)}
                          style={{margin:0, direction: "ltr"}}
                          className={booksStyles.bookTitle}
                          >
                          {node.name}
                          </p>
                          
                          ))}
                        </div>
             

                </div>

                <div className={booksStyles.imageColumn}>
                        {curr ? ( 
                        <Img fluid={curr}/> 
                        ) : (<h3 style={{fontSize: "20px", paddingTop: "200px", textAlign: "center"}}>Hover Over A Title ;)</h3>)}
                </div>

            </div>




            </Layout>
    )
}

export default BooksPage
