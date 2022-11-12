import React from 'react'
import "./Posts.css"
import { PostsData } from '../../data/PostData'
import Post from "../Post/Post"
const Posts = () => {
    return (
        <div className='Post'>
            {PostsData.map((post, id) => {
                return <Post data={post} id={id} />
            })}
        </div>
    )
}

export default Posts