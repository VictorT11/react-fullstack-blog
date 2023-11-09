import PostModel from '../models/Post.js';

export const getLastTags = async(req, res) =>{
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map((obj) => obj.tags).flat().slice(0, 5);
        res.json(tags);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Posts not found"
        });
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate({ path: "user", select: ["fullName", "avatarUrl"] }).exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Posts not found"
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { new: true }  // Adaugă această opțiune pentru a obține documentul actualizat
        ).exec();

        if (!updatedPost) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        res.json(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error finding or updating post"
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const deletedPost = await PostModel.findOneAndDelete(
            { _id: postId },
           ).exec();

        if (!deletedPost) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        res.json({message: 'Delete'});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error on deleting post"
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageURL: req.body.imageURL,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Post created Failed"
        });
    }
};

export const update = async (req,res)=>{
    try {
        const postId = req.params.id;

        const deletedPost = await PostModel.updateOne(
            { _id: postId },{
                title: req.body.title,
                text: req.body.text,
                imageURL: req.body.imageURL,
                tags: req.body.tags,
                user: req.userId,
            }
           ).exec();

        res.json({message: 'True'});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error on updating post"
        });
    }
}