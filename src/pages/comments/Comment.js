import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
  const { profile_id, profile_image, owner, updated_at, content, is_owner } = props;
  const currentUser = useCurrentUser();
  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          <p>{content}</p>
        </Media.Body>
        {is_owner && ( 
                <MoreDropdown
                
              />)}
      </Media>
    </div>
  );
};

export default Comment;