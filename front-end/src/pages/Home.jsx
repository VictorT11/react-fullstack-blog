import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';


import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/post';

export const Home = () => {
  const dispatch = useDispatch();
  const {posts, tags} = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);

  const isPostsLoading = posts.status ==='loading';
  const isTagsLoading = tags.status ==='loading';

React.useEffect(()=>{
  dispatch(fetchPosts());
  dispatch(fetchTags());
}, []);


  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostsLoading ? <Post key={index} isLoading={true} /> : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={userData ?._id === obj.user._id}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Petrica',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Test ',
              },
              {
                user: {
                  fullName: 'Vania',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel eleifend nisl. Vivamus risus lorem, tincidunt eu quam at, aliquam aliquam diam. Pellentesque fermentum urna sed turpis posuere pharetra. Suspendisse consectetur tincidunt nunc at scelerisque. In hac habitasse platea dictumst. Suspendisse in tincidunt orci.t the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};