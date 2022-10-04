const {DataTypes}= require('sequelize')
const {sequelize}=require('../util/database')

module.exports ={
    Recipe: sequelize.define('recipe', {
        recipeId:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
         title: DataTypes.STRING,
         creator: DataTypes.STRING,
         category:DataTypes.STRING,
         ingredients: DataTypes.TEXT,
         directions: DataTypes.TEXT,
         notes: DataTypes.TEXT,
         
        })
}
