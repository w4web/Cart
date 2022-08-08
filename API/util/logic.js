
const treeView = (categories, parentId = null) => {

  const categoryTree = [];
  let cates;

  if (parentId == null) {
      cates = categories.filter((cat) => cat.parentId == undefined);
  } else {
      cates = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of cates) {
      categoryTree.push({
          _id: cate._id,
          name: cate.name,
          slug: cate.slug,
          image: cate.image,
          parentId: cate.parentId,
          children: treeView(categories, cate._id),
      });
  }

  return categoryTree;
	
};

const commentTreeView = (comments, parentId = null) => {

    const commentTree = [];
    let comms;
  
    if (parentId == null) {
        comms = comments.filter((com) => com.parentId == undefined);
    } else {
        comms = comments.filter((com) => com.parentId == parentId);
    }
  
    for (let comm of comms) {
        commentTree.push({
            _id: comm._id,
            commentText: comm.commentText,
            parentId: comm.parentId,
            contentId: comm.contentId,
            userId: comm.userId,
            children: commentTreeView(comments, comm._id),
        });
    }
  
    return commentTree;
      
};

module.exports = { treeView, commentTreeView }