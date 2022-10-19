import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { postDataAtom, commentDataAtom, currentUserAtom } from '../../atom';
import DetailComment from './DetailComment';
import { FaArrowLeft } from 'react-icons/fa';
import {
  responsive,
  menuGray,
  mainGray,
  mainBlack,
  lightGray,
} from '../../styles/theme';
import styled from 'styled-components';

const Detail = () => {
  const params = useParams();
  const commentsRef = useRef();
  const [commentValue, setCommentValue] = useState('');
  const currentUser = useRecoilValue(currentUserAtom);
  const [postData, setPostData] = useRecoilState(postDataAtom);
  const [commentData, setCommentData] = useRecoilState(commentDataAtom);

  const currentPost = postData.filter(el => Number(params.id) === el.postId)[0];
  const nextPost = postData.filter(
    el => Number(params.id) + 1 === el.postId
  )[0];
  const prevPost = postData.filter(
    el => Number(params.id) - 1 === el.postId
  )[0];
  const currentComments = commentData.filter(
    el => Number(params.id) === el.postId
  )[0].comments;

  const handleComment = e => {
    setCommentValue(e.target.value);
  };

  const handleLeaveComment = e => {
    if (commentValue) {
      const currentIndex = commentData.indexOf(
        commentData.filter(el => Number(params.id) === el.postId)[0]
      );
      const copiedData = JSON.parse(JSON.stringify(commentData));
      const copiedComments = copiedData[currentIndex].comments;
      copiedComments.push({
        id: copiedComments.length
          ? copiedComments[copiedComments.length - 1].id + 1
          : 1,
        writerId: currentUser.userInfo.id,
        writerName: currentUser.userInfo.name,
        commentBody: commentValue,
      });
      setCommentData(copiedData);
      setCommentValue('');
      document.getElementsByClassName('comments').scrollTo(1, 1);
    }
  };

  const handleKeyPress = e => {
    if (e.key == 'Enter') {
      handleLeaveComment();
    }
  };

  return (
    <DetailContainer>
      <div className='post-container'>
        <div className='title-wrapper'>
          <Link to='/board'>
            <FaArrowLeft className='go-back' size={32} />
          </Link>
          <h2 className='title'>{currentPost.title}</h2>
        </div>
        <div className='wrapper'>
          <p className='writer'>작성자 : {currentPost.writerName}</p>
          <p className='date'>{currentPost.date}</p>
        </div>
        <div className='body'>{currentPost.body}</div>
        <div className='comments' ref={commentsRef}>
          {currentComments.map(el => (
            <DetailComment data={el} currentUser={currentUser} key={el.id} />
          ))}
        </div>
        <div className='leave-comment'>
          <input
            type='text'
            className='comment-input'
            placeholder={
              currentUser ? '댓글을 입력하세요.' : '로그인 후 이용해주세요.'
            }
            onChange={handleComment}
            onKeyDown={handleKeyPress}
            value={commentValue}
            maxLength={24}
            disabled={!currentUser}
          />
          <button onClick={handleLeaveComment} disabled={!currentUser}>
            등록
          </button>
        </div>
        <div className='navigator'>
          {nextPost && (
            <Link to={`/detail/${nextPost.postId}`}>
              <div className='next-post'>
                <p className='bold'>다음 글</p> {nextPost.title}
              </div>
            </Link>
          )}
          {prevPost && (
            <Link to={`/detail/${prevPost.postId}`}>
              <div className='prev-post'>
                <p className='bold'>이전 글</p> {prevPost.title}
              </div>
            </Link>
          )}
        </div>
      </div>
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70.35px;
  margin: 2.5vw;

  .post-container {
    width: 810px;

    .title-wrapper {
      display: flex;
      align-items: center;

      .go-back {
        margin-right: 10px;
        color: ${mainBlack};
      }

      .title {
        font-size: 32px;
        font-weight: 700;
      }
    }

    .wrapper {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      .date {
        color: ${mainGray};
      }
    }

    .body {
      height: 25vh;
      padding: 20px;
      background-color: ${menuGray};
      font-size: 17px;
      overflow-y: scroll;
    }

    .comments {
      height: 15vh;
      padding: 20px;
      margin-top: 30px;
      background-color: ${menuGray};
      overflow-y: scroll;
    }

    .leave-comment {
      display: flex;
      align-items: center;
      .comment-input {
        width: 80%;
        padding: 15px;
        border: none;
        border-bottom: 1px solid ${mainBlack};
        background-color: transparent;
        font-family: 'Pretendard', sans-serif;

        &:focus {
          outline: none;
        }
      }
      button {
        width: 20%;
        padding: 15px;
        border: none;
        background-color: transparent;
        font-size: 18px;
        font-weight: 700;
        font-family: 'Pretendard', sans-serif;
        white-space: nowrap;

        &:active {
          background-color: ${lightGray};
        }
      }
    }

    .navigator {
      position: absolute;
      bottom: 20px;
      width: 810px;
      .prev-post,
      .next-post {
        display: flex;

        padding: 10px;
        background-color: ${menuGray};
        color: ${mainBlack};

        .bold {
          font-weight: 700;
          margin-right: 10px;
        }
      }
    }
  }

  @media ${responsive.tablet} {
    .post-container {
      width: 90vw;
      .leave-comment {
        button {
          font-size: 14px;
        }
      }

      .navigator {
        width: 90vw;
      }
    }
  }
`;

export default Detail;
