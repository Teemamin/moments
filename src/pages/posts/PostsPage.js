import React,{useState,useEffect} from "react";
import Post from "./Post";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import NoResults from "../../assests/no-results.png"
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import styles from "../../styles/PostsPage.module.css";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");

  // To detect the url change uselocation returns an object with data about
  //  the current URL that the user is on
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
 //setHasLoaded to false before we fetch the posts, so that our  loading
 // spinner will be displayed to our users.
    setHasLoaded(false);
    const timer = setTimeout(() => {
        fetchPosts();
      }, 1000);
  
      return () => {
          //clean up function
        clearTimeout(timer);
      };
  }, [filter, query, pathname]);

  
  return (
    <Row className="h-100">
    <Col className="py-2 p-0 p-lg-2" lg={8}>
      <p>Popular profiles mobile</p>
      <i className={`fas fa-search ${styles.SearchIcon}`} />
      {/* Our API requests will be  handled by an onChange event, not the onSubmit. */}
      <Form
        className={styles.SearchBar}
        onSubmit={(event) => event.preventDefault()}
      >
        <Form.Control
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="text"
          className="mr-sm-2"
          placeholder="Search posts"
        />
      </Form>

      {hasLoaded ? (
        <>
          {posts.results.length ? (
            <InfiniteScroll
              children={posts.results.map((post) => (
                <Post key={post.id} {...post} setPosts={setPosts} />
              ))}
              dataLength={posts.results.length}
              loader={<Asset spinner />}
              hasMore={!!posts.next}
              next={() => fetchMoreData(posts, setPosts)}
            />
            
          ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message={message} />
            </Container>
          )}
        </>
      ) : (
        <Container className={appStyles.Content}>
          <Asset spinner />
        </Container>
      )}
    </Col>
    <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
      <p>Popular profiles for desktop</p>
    </Col>
  </Row>
);
}
export default PostsPage;
{/* the hasMore prop tells the InfiniteScroll component whether there is more data
               to load on  reaching the bottom of the current page of data */}