import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";

export const FullPost = () => {
const [data, setData] = React.useState();
const [isLoading, setisLoading] = React.useState(true);
const { id } = useParams();

React.useEffect(()=>{
  axios
  .get(`/posts/${id}`)
  .then((res)=>{
    setData(res.data);
    setisLoading(false)
    console.log(res.data)
  })
  .catch((err) =>{
    console.warn(err);
    alert("Error on posts rendering");
  });
},[])

if(isLoading){
  return <Post isLoading={isLoading} isFullPost/>
}

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={`http://localhost:4444${data.imageUrl}`}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children= {data.text}/>
        

      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Petrica",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Test 555555",
          },
          {
            user: {
              fullName: "Vania",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel eleifend nisl. Vivamus risus lorem, tincidunt eu quam at, aliquam aliquam diam. Pellentesque fermentum urna sed turpis posuere pharetra. Suspendisse consectetur tincidunt nunc at scelerisque. In hac habitasse platea dictumst. Suspendisse in tincidunt orci.",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};