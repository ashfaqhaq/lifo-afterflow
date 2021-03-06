import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import MyPopup from '../util/MyPopup';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },deleteDisabled
}) {
  
  const { user } = useContext(AuthContext);
  // console.log(deleteDisabled);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={`https://avatars.dicebear.com/v2/avataaars/${username}.svg?options%5bmood%5d%5b%5d=happy`}
        />
     
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description style={{wordBreak: "break-word"}}>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
      <LikeButton user={user} post={{ id, likes, likeCount }} />
      <MyPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
        </Button>
        </MyPopup>
        {!deleteDisabled ? user && user.username === username && <DeleteButton postId={id} /> : null }
      </Card.Content>
      
    </Card>
  );
}

export default PostCard;