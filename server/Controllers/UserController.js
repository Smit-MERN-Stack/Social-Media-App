import User from "../Modals/userModel.js"

//get a user

export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id)

        if (user) {
            const { password, ...otherdetails } = user._doc
            res.status(200).json(otherdetails)
        } else {
            res.status(404).json("No User found")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//update user

// export const updateUser = async (req, res) => {
//     const id = req.params.id
//     const { currentUserId, currentUserAdminStatus, password } = req.body

//     if (id === currentUserId || currentUserAdminStatus) {
//         try {
//             if (password) {
//                 const salt = await bcrypt.genSalt(10);
//                 req.body, password = await bcrypt.hash(password, salt)
//             }
//             const user = await User.findByIdAndUpdate(id, req.body, { new: true })

//             res.status(200).json(user)
//         } catch (error) {
//             res.status(500).json(error.message)
//         }
//     } else {
//         res.status(403).json("Access denied, you can only update your profile")
//     }
// }

// update a user
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId, currentUserAdminStatus, password } = req.body;

    if (id === currentUserId || currentUserAdminStatus === "true") {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }

            const user = await User.findByIdAndUpdate(id, req.body, {
                new: true,
            });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("Access Denied! you can only update your own profile");
    }
};

//deleteUser


export const deleteUser = async (req, res) => {
    const id = req.params.id

    const { currentUserId, currentUserAdminStatus } = req.body;
    if (id === currentUserId || currentUserAdminStatus === "true") {
        try {
            await User.findByIdAndDelete(id)
            res.status(200).json("User Deleted Successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can only delete your profile");
    }


}


// Follow user
export const followUser = async (req, res) => {
    const id = req.params.id;

    const { currentUserId } = req.body;

    if (currentUserId === id) {
        res.status(403).json("Action forbidden");
    } else {
        try {
            const followUser = await User.findById(id);
            const followingUser = await User.findById(currentUserId);

            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $push: { followers: currentUserId } });
                await followingUser.updateOne({ $push: { following: id } });
                res.status(200).json("User followed!");
            } else {
                res.status(403).json("User is Already followed by you");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

// UnFollow a User
export const UnFollowUser = async (req, res) => {
    const id = req.params.id;

    const { currentUserId } = req.body;

    if (currentUserId === id) {
        res.status(403).json("Action forbidden");
    } else {
        try {
            const followUser = await User.findById(id);
            const followingUser = await User.findById(currentUserId);

            if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $pull: { followers: currentUserId } });
                await followingUser.updateOne({ $pull: { following: id } });
                res.status(200).json("User Unfollowed!");
            } else {
                res.status(403).json("User is not followed by you");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
};



