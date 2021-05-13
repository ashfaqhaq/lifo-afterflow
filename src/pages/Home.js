import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid, Transition,Menu } from 'semantic-ui-react';
import _ from 'lodash'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard';

function Home() {
  
  const { data, loading, error } = useQuery(FETCH_POSTS_QUERY);
  if(data) {
    // console.log(data);
    var { getPosts: posts } = data;
   
    var mostLiked = _.sortBy(posts, function (a) {return a.likeCount }).reverse();
    var mostCommented = _.sortBy(posts, function (a) {return a.commentCount }).reverse();
   

  }
  if(error) {
    console.log(error);
    return "error"; // blocks rendering
  }
  return (

    <div>
       <Grid textAlign='left' columns='equal'>
    <Grid.Row>
      <Grid.Column only="computer">
        <Menu fluid vertical>
          <Menu.Item className='header'>Cats</Menu.Item>
        </Menu>
      </Grid.Column>
      <Grid.Column tablet={12} computer={8}>
      <Grid.Row>
<PostForm/>
  {loading ? (
    <h1>Loading posts..</h1>
  ) : (
    <Transition.Group>
   { posts &&
    posts.map((post) => (
      <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
        <PostCard post={post} />
      </Grid.Column>
    ))}
    </Transition.Group>
  )}
</Grid.Row>
      </Grid.Column>
      <Grid.Column only="computer">
       
          <Transition.Group>
   { mostLiked &&
 
      <Grid.Column key={mostLiked[0].id} style={{ marginBottom: 20 }}>
         <h4>Top Liked Post </h4>
        <Menu.Item>
        <PostCard post={mostLiked[0]} deleteDisabled={true}/>
        </Menu.Item>
      </Grid.Column>
      
   }
   { mostCommented &&
 
 <Grid.Column key={mostCommented[0].id} style={{ marginBottom: 20 }}>
     <h4>Top Commented Post </h4>
   <Menu.Item>
   <PostCard post={mostCommented[0]} deleteDisabled={true}/>
   </Menu.Item>
 </Grid.Column>
 
}
    </Transition.Group>
       
      </Grid.Column>
      <Grid.Column only="mobile">
        <Menu fluid vertical>
          <Menu.Item className='header'>ssd</Menu.Item>
        </Menu>
      </Grid.Column>
    </Grid.Row>
  </Grid>

  
    </div>



    
  );
}

// function Home(){
//   <Grid columns='equal'>
//     <Grid.Row stretched>
//       <Grid.Column>
//         <Segment>Home</Segment>
//         <Segment>Network</Segment>
//       </Grid.Column>
//       <Grid.Column width={6}>
//         <Segment>
//           <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
//         </Segment>
//       </Grid.Column>
//       <Grid.Column>
//         <Segment>1</Segment>
//         <Segment>2</Segment>
//       </Grid.Column>
//     </Grid.Row>
//     <Grid.Row>
//       <Grid.Column>
//         <Segment>1</Segment>
//         <Segment>2</Segment>
//       </Grid.Column>
//       <Grid.Column width={6}>
//         <Segment>
//           <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
//         </Segment>
//       </Grid.Column>
//       <Grid.Column>
//         <Segment>1</Segment>
//         <Segment>2</Segment>
//       </Grid.Column>
//     </Grid.Row>
//   </Grid>
// }


const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
      
        body
      }
    }
  }
`;

export default Home;
