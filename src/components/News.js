import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>{
  const [articles, setArticles] = useState([])                
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

   const capitalizeFirstLetter = (string) => {                
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
    const updateNews = async () =>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true);
    
    let data = await fetch(url);          //the fetch API takes a URL and returns a promise.
    //Async can wait inside its body to resolve for some of the promises.
    // The await keyword will stop the execution until a defined task is completed. In our case, it will wait for the promise to be resolved. 
    
    let parsedData = await data.json() 
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}-News`;  
    updateNews();
    // eslint-disable-next-line
  }, [])

   const fetchMoreData = async() =>{  
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page+1)   
    let data = await fetch(url);    
    let parsedData = await data.json() 
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
   };
  
    return (
      <>
      <h1 className="text-center head" style={{margin:'35px 0px' , marginTop:'90px'}}>Top <span className="top-head">{capitalizeFirstLetter(props.category)}</span> Headlines</h1>
      
      {loading && <Spinner/>}  
      <InfiniteScroll                                       
          dataLength={articles.length}          
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}        
          loader={<Spinner/>}       
        >
          <div className="container">
          <div className="row"> 
          {articles.map((element)=>{                          
              return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} 
                  imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}          // title,description,urlToImage,url,author,publishedAt,source.name :- all the names are from sampleOutput.json
                  source={element.source.name}
                  />
              </div> 
          })} 
          </div>
          </div>
          </InfiniteScroll>     
          </>
  )
  }

  News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'                  
  }
  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
export default News
