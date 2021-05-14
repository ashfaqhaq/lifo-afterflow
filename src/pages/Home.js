import React, { useContext , useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid, Transition, Menu, Button } from 'semantic-ui-react';
import _ from 'lodash'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';



function Home() {
  const { user } = useContext(AuthContext);
  const [openHighlight, setOpenHighlight] = useState(false);

  const { data, loading, error } = useQuery(FETCH_POSTS_QUERY);
  if (data) {
    // console.log(data);
    var { getPosts: posts } = data;

    var mostLiked = _.sortBy(posts, function (a) { return a.likeCount }).reverse();
    var mostCommented = _.sortBy(posts, function (a) { return a.commentCount }).reverse();


  }
  if (error) {
    console.log(error);
    return "error"; // blocks rendering
  }

  
  return (

    <div>
      <Grid textAlign='left' columns='equal'>
        <Grid.Row only="tablet mobile" style={{ display: 'block' }} >
          <center>
          <Button color={!openHighlight? "black" : "teal"} active={!openHighlight}  onClick={()=>setOpenHighlight(false)}>
              Feed
            </Button>
            <Button color={openHighlight? "black" : "teal"} active={openHighlight}  onClick={()=>setOpenHighlight(true)}>
              Top Posts
            </Button>
           
          </center>
        </Grid.Row>
        <Grid.Row>


          <Grid.Column only="computer">
            <Menu fluid vertical>

              {user ?
                <Menu.Item className='header'>{user.username}</Menu.Item>
                :
                null
              }

            </Menu>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8}>
           {openHighlight?  <Highlight /> :   <Grid.Row>
              <PostForm />
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
            </Grid.Row>  }
           
           
          
          </Grid.Column>
          <Grid.Column only="computer">

            <Highlight />

          </Grid.Column>

        </Grid.Row>
      </Grid>


    </div>




  );

  function Highlight() {
    return (<Transition.Group>
      { mostLiked &&

        <Grid.Column key={mostLiked[0].id} style={{ marginBottom: 20 }}>
          <h4>Top Liked Post </h4>
          <Menu.Item>
            <PostCard post={mostLiked[0]} deleteDisabled={true} />
          </Menu.Item>
        </Grid.Column>

      }
      { mostCommented &&

        <Grid.Column key={mostCommented[0].id} style={{ marginBottom: 20 }}>
          <h4>Top Commented Post </h4>
          <Menu.Item>
            <PostCard post={mostCommented[0]} deleteDisabled={true} />
          </Menu.Item>
        </Grid.Column>

      }
    </Transition.Group>)
  }


}



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
