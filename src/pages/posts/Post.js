import React from 'react'
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Post.module.css";
import { axiosRes } from '../../api/axiosDefaults';

function Post(props) {
    const {
        id,
        owner,
        profile_id,
        image_field,
        comments_count,
        likes_count,
        is_liked,
        title,
        content,
        image,
        updated_at,
        postPage,
        setPosts
      } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const handleLike = async ()=>{
        try{
            const {data} = await axiosRes.post("likes/", {post: id})
            // handle checking if it has  
            // the right post id before applying the like to it.
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    console.log(post.id, id)
                  return post.id === id
                    ? { ...post, likes_count: post.likes_count + 1, is_liked: data.id }
                    : post;
                }),
              }));
        }catch(e){
            console.log(e)
        }

    }
    const handleUnlike = async () => {
      try {
        await axiosRes.delete(`/likes/${is_liked}/`);
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
              ? { ...post, likes_count: post.likes_count - 1, is_liked: null }
              : post;
          }),
        }));
      } catch (err) {
        console.log(err);
      }
    };
    return (
        <Card className={styles.Post}>
          <Card.Body>
            <Media className="align-items-center justify-content-between">
              <Link to={`/profiles/${profile_id}`}>
                <Avatar src={image_field} height={55} />
                {owner}
              </Link>
              <div className="d-flex align-items-center">
                <span>{updated_at}</span>
                {/* using postPage we knw if to display the edit/delte  */}
                {is_owner && postPage && "..."}
              </div>
            </Media>
          </Card.Body>
          <Link to={`/posts/${id}`}>
            <Card.Img src={image} alt={title} />
          </Link>
          <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : is_liked ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
        </Card>
      );
    };

export default Post
