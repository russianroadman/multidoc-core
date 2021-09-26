const Sequelize = require('sequelize')
const db = require('../database/database')

const Content = db.define('content', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, { timestamps: false })

const Version = db.define('version', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preferred: {
        type: Sequelize.BOOLEAN,
        allowNullL: false
    }
}, { timestamps: false })

const Block = db.define('block', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { timestamps: false })

const Document = db.define('document', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { timestamps: false })

Document.hasMany(Block, { onDelete: 'cascade'})
Block.hasMany(Version, { onDelete: 'cascade'})
Version.hasOne(Content, { onDelete: 'cascade'})

Content.belongsTo(Version)
Version.belongsTo(Block)
Block.belongsTo(Document)

module.exports = {
    Document: Document,
    Block: Block,
    Version: Version,
    Content: Content
}