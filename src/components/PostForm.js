/* eslint-disable no-unused-vars */
import React ,{useState} from 'react';
import gql from 'graphql-tag';
import { Button, Form } from 'semantic-ui-react';
import {useMutation} from '@apollo/client';
// import Picker from 'emoji-picker-react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import {useForm} from './../util/hooks';
import {FETCH_POSTS_QUERY} from './../util/graphql'

function PostForm() {
 
   const [isOpen,setIsOpen] = useState(false);
   const [chosenEmoji, setChosenEmoji] = useState();

  

   const setClose = () => setIsOpen(true);
   const addEmoji = (emoji)=>
   {
     console.log(emoji)
     setChosenEmoji(emoji)
  //  const onEmojiClick = async(event, emojiObject) => {
  //  await setChosenEmoji(emojiObject) 
   
  //     console.log(chosenEmoji)

      values.body = values.body + (emoji?.native || '')
  }
    
  // };
    const {onChange,values,onSubmit }= useForm(createPostCallback,{
        body:''
    });


    const [createPost, { error }] = useMutation(CREATE_POST, {
      variables: values,
      refetchQueries: [
        { query: FETCH_POSTS_QUERY }
      ],
       update:(proxy, result)=> {

         values.body = "";
       },
       onError(err) {
        console.log(err)
        console.log(error)
        return err;
      },
    })
  
    function createPostCallback() {
      createPost();
      setIsOpen(false);
    }
    return (
        <div>
       <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
        
            <Form.Field label='Create a post' control='textarea' rows='3'  
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}/>
            
            
            
         
        {/* <Picker set='apple' /> */}

{/* <Picker onSelect={addEmoji} /> */}
{/* <Picker title='Pick your emoji…' emoji='point_up' /> */}
{/* <Picker style={{ position: 'absolute', bottom: '0px', right: '0px' }} /> */}
{/* <Picker i18n={{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }} />  */}
        {/* {console.log(isOpen)} */}
         {/* {isOpen  && <Picker onEmojiClick={onEmojiClick} />}  */}
        
        </Form.Field>
        <div   style={{ display: 'flex',marginBottom:"1rem" }}  >
          <Button type="submit" color="teal">
            Submit
          </Button>
          <span onClick={()=>setIsOpen(!isOpen)}  style={{ backgroundColor:'#00b5ad',color:'white',padding:'0.5rem',cursor:'pointer',borderRadius:'5%' }}> {isOpen?  "Hide panel" : "Show me emojis"  } </span>
          </div>
          { isOpen  
               &&  <Picker onSelect={addEmoji}  emoji='point_up' style={{ position: 'static'}}  />
          }
     
        {/* {isOpen  && <Picker onSelect={addEmoji}  emoji='point_up' style={{ position: 'absolute', bottom: '0px', right: '0px' }} />} */}
      </Form>
     
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
        </div>
    )
}


const CREATE_POST = gql`
mutation createPost($body:String!){
        createPost(body:$body){
            id
        body
        createdAt
        username
        likes {
                id
                username
                createdAt
            }
        likeCount
        comments {
                    id
                    body
                    username
                    createdAt
                 }
        commentCount
            }
    }
`;

export default PostForm
