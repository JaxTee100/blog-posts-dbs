const db = require('../database/db');


//sqls
const selectAll = "SELECT * FROM posts";
const selectOne = "SELECT * FROM posts WHERE id = ?";
const makePost = "INSERT INTO posts (title, content) VALUES (?, ?)";
const updateAPost="UPDATE posts SET title = ?, content = ? WHERE id = ?"
const deleteAPost="DELETE FROM posts WHERE id = ?"

const getAllPosts = async (req, res) => {
    try {
        const [posts] = await db.query(selectAll);
        if(!posts){
            return res.status(401).json({
                message: "No posts to display, Make a post"
            })
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getOne = async (req, res) => {
    try {
        const [post] = await db.query(selectOne, [req.params.id]);
        if (post.length === 0){
            return res.status(404).json({ error: "Post not found" });
        } 
        res.json(post[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        const [result] = await db.query(makePost, [title, content]);
        res.json({ id: result.insertId, title, content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const updateOne = async (req, res) => {
    const { title, content } = req.body;
    try {
        await db.query(updateAPost, [title, content, req.params.id]);
        res.json({ message: "Post updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteOne = async (req, res) => {
    try {
        await db.query(deleteAPost, [req.params.id]);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {getAllPosts, createPost, getOne, updateOne, deleteOne}