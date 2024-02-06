const mongoose = require('mongoose');
const slug = require('mongoose-slug-plugin');
const softDelete = require('mongoosejs-soft-delete')


const Item = new mongoose.Schema(
    {
        title: { type: String, require: true },
        description: { type: String },
        videoid: { type: String },
        image: { type: String, require: true },
        slug: { type: String, unique: true },
    },
    {
        timestamps: true,
    },
);

Item.plugin(slug, { tmpl: '<%=title%>' });
Item.plugin(softDelete);

module.exports = mongoose.model('Item', Item);
