const Item = require('../models/Item');
const {
    multiMongooseToObjs,
    mongooseToObj,
} = require('../../../util/mongoose');

class NewsController {
    index(req, res, next) {
        Item.find({})
            .then((items) =>
                res.render('news', { items: multiMongooseToObjs(items), pageTitle: 'Tin tức', }),
            )
            .catch(next);
    }
    watchNews(req, res, next) {
        Item.find({ slug: req.params.slug })
            .then((items) => {
                if (items.length === 0) {
                    res.render('not-found');
                    return;
                }
                res.render('watch-news', { item: mongooseToObj(items), pageTitle: 'Xem tin' });
            })
            .catch(next);
    }
    addNews(req, res) {
        res.render('add-news', { });
    }

    //[POST] /news/add-news/added
    async addedNews(req, res, next) {
        const data = req.body;
        data.image =
            'https://i.ytimg.com/vi/' + req.body.videoid + '/hq720.jpg';
        const item = new Item(data);
        item.save();
        res.render('add-news', {message: 'Đã thêm tin tức thành công', pageTitle: 'Thêm tin tức',});
    }

    modifyNews(req, res, next) {
        Promise.all([Item.findDeleted({}),Item.find({})])
            .then(([deletedItems, items]) =>
                res.render('modify-news', {
                    deletedItems,
                    items: multiMongooseToObjs(items),
                    pageTitle: 'Chỉnh sửa tin'
                }),
            )
            .catch(next);
    }
    updateNews(req, res, next) {
        Item.find({ slug: req.params.slug })
            .then((items) => {
                if (items.length === 0) {
                    res.render('not-found');
                    return;
                }
                res.render('update', { item: mongooseToObj(items), pageTitle: 'Cập nhật tin' });
            })
            .catch(next);
    }

    //[PUT] /news/modify/update
    async updatedNews(req, res) {
        const input = req.body;
        const item = await Item.findById(input.id);
        item.title = input.title;
        item.description = input.description;
        item.videoid = input.videoid;
        item.image = 'https://i.ytimg.com/vi/' + input.videoid + '/hq720.jpg';
        item.save();
        res.redirect('/news/modify');
    }

    //[PATCH] /news/modify/delete-new/:id
    deleteNews(req, res, next) {
        Item.findByIdAndDelete(req.params.id)
            .then(() =>res.redirect('back'))
            .catch(next);
    }

    //[GET] /news/trash
    trashNews(req, res, next) {
        Item.findDeleted({})
        .then(items => 
            res.render('trash-news', { items: multiMongooseToObjs(items) }))
            .catch(next);
    }
    //[DELETE] /news/trash/permanent-delete-news/:id
    permanentDeleteNews(req, res, next) {
        Item.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    restoreNews(req, res, next) {
        Item.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    deleteCheckboxes(req, res, next) {
        Item.removeMany({ _id: req.body.ids })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new NewsController();
