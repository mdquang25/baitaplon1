class SiteController {
    index(req, res) {
        res.render('home', {pageTitle: 'Trang chủ'});
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
