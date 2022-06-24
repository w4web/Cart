
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

module.exports = { treeView }