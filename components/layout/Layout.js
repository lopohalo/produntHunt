import React from 'react'
import Header from '../Header'
import { css, Global } from '@emotion/react'
import Head from 'next/head'


const Layout = props => {
    return (
        <>
        <Global 
         styles={css`
          :root { 
            --gris: #3d3d3d;
            --gris2: #6F6F6F;
            --gris3: #e1e1e1;
            --naranja: #da552f;
          }
          html { 
              font-size: 62.5%; 
              box-sizing: border-box;
          }
          *, *:before, *:after { 
              box-sizing: inherit;
          }
          body { 
              font-size:1.6rem; 
              line-height: 1.5;
              font-family: 'PT Slab', serif;
          }
          h1, h2, h3{
              margin: 0 0 2rem 0;
              line-height: 1.5;
          }
          h1,h2{
           font-family: 'Roboto Slab', serif;
           font-weight: 700;
          }
          h3{
           font-family: 'PT Slab', serif;

          }
          
          ul { 
              list-style: none;
              margin:0;
              padding:0;
          }
          a{
              text-decoration: none;
          }
          img{
              max-width: 100%;
          }
          
         `}
        />
        <Head>
            <title>Product Hunt Firebase y Next.js</title>
            <link 
                rel="stylesheet" 
                href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" i
                ntegrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" 
                crossorigin="anonymous"
                referrerpolicy="no-referrer" 
            />
            <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700|Roboto+Slab:400,700&display=swap" rel="stylesheet" />
            <link href="/static/css/app.css" rel="stylesheet" />
        </Head>
        <Header/>
       <main>
           {props.children}
       </main>
       </>
    )
}

export default Layout
