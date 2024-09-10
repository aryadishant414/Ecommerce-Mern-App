import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import {Helmet} from "react-helmet";


const Layout = ({children , title, description, keywords, author}) => {
  return (
    <div>

        {/* SEO */}
        <Helmet>
          <meta charSet="utf-8" />

          {/* below 3 lines taken from w3 schools*/}
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords}/>
          <meta name="author" content={author} />


          <title>{title}</title>
        </Helmet>

        <Header />
          <main style={{minHeight: '70vh'}}>
            {children}
          </main>
        <Footer />
    </div>
  );
};


Layout.defaultProps = {
  title: 'Ecommerce App - Shop Now',
  description: 'mern stack project',
  keywords: 'mern, react, node, mongodb, express',
  author: 'aryadishant',
}


export default Layout