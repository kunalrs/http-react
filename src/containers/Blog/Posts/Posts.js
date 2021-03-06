import React, { Component } from "react";
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import './Posts.css';

class Posts extends Component {

    state = {
        posts:[]
    }

    componentDidMount() {
        axios.get("/posts")
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPost = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });

                this.setState({
                    posts: updatedPost
                });
                
            }).catch(exc => {
                console.log(exc);
            });
    }

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id
        });
    }

    render() {

        let posts = <p style={ {textAlign:"center"} }>Something went wrong :(</p>
        
        posts = this.state.posts.map(post => {
            return <Post clicked={()=> this.postSelectedHandler(post.id)} key={post.id} title={post.title} author={post.author} />
        });
        

        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
};

export default Posts;