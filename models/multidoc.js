const Sequelize = require('sequelize')
const db = require('../database/database')

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
})

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
})

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
})

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
})

Document.hasMany(Block, { onDelete: 'cascade'})
Block.hasMany(Version, { onDelete: 'cascade'})
Version.hasOne(Content, { onDelete: 'cascade'})

module.exports = {
    Document: Document,
    Block: Block,
    Version: Version,
    Content: Content
}

// module.exports = Document
// module.exports = Block
// module.exports = Version
// module.exports = Content
