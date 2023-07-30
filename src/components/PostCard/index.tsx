import React from "react";
import ImageGallery from "react-image-gallery";
import './style.scss';

interface PostCardProps {
    item: any
}
 
const PostCard: React.FC<PostCardProps> = ({ item }) => {
    return ( 
        <section className="post-card">
            <div className="image-container">
                <ImageGallery items={item.image.map((it: any) => {
                    return {
                        original: it,
                        thumbnail: it
                    }
                })} showFullscreenButton={false} showPlayButton={false} showThumbnails={false} autoPlay />
            </div>
            <div className="info-container">
                <div className="info-head">
                    <span>{item.address}</span>
                    <span><i className="pi pi-star-fill"></i> &nbsp;{item.rating}</span>
                </div>
                <span>Chủ nhà: {item.owner}</span>
                <span>{item.date}</span>
                <span>{item.price} / đêm</span>
            </div>
        </section>
    );
}
 
export default PostCard;