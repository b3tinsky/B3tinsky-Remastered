/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const { faTemperatureEmpty } = require("@fortawesome/free-solid-svg-icons");

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'B3TINSKY',
    author: 'Beto Rendon'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              showLineNumbers: false,
              prompt: {
                user: "B3TINSKY",
                host: "localhost",
                global: false,
              },
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
              disableBgImageOnAlpha: true,
              backgroundColor: "none"
            }
          }
        ]
      }
    },
    `gatsby-plugin-image`,
  ],
}
