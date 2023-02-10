
import React from 'react'
import noContent from "./noContent.jpeg"

const NewsItem = (props) =>{
    let {title, description,imageUrl,newsUrl,author,date,source} = props;     
    return (
      <div className="my-3 mx-5">
      <div className="card">
      <div style = {{
           display: 'flex',
           justifyContent:'flex-end',
           position:'absolute'
           

      }
      }>
      <span className="badge rounded-pill bg-danger"> {source} </span>
      </div>
      <img src={!imageUrl?noContent:imageUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
        <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
        <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read more</a>
      </div>
    </div>
    </div>
    )
  }



export default NewsItem