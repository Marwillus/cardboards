import likeBtn from "../images/like-dark.png";
import likeBtnActive from "../images/like-white.png";

function Item({ id, boardNr, text, likes, handleLike, liked }) {
  return (
    <div className="item">
      <p>{text}</p>
      <button
        className="like-btn"
        onClick={() => handleLike(id, boardNr)}
        style={
          liked
            ? { background: "#ff6600", color: "#ffffff" }
            : { background: "#EAEEF1", color: "#273343" }
        }
      >
        <img src={!liked ? likeBtn : likeBtnActive} alt="like" />
        <p>{likes}</p>
      </button>
    </div>
  );
}

export default Item;
