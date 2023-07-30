import PostCard from "../../components/PostCard";
import { posts } from "../../configs/data";

const Posts = () => {
    return (
        <div className="post-container">
            <div className="post-wrapper grid">
                {posts.map(item => (
                    <div className="col-3">
                        <PostCard item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;