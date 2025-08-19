// src/models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../services/db');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  jfsku: DataTypes.STRING,
  name: DataTypes.STRING,
  merchantSku: DataTypes.STRING,
  type: DataTypes.STRING,
  productGroup: DataTypes.STRING,
  netRetailPrice: DataTypes.JSONB,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
  isVisible: DataTypes.BOOLEAN,
  isParent: DataTypes.BOOLEAN,
  description: DataTypes.TEXT,
  shippingWeight: DataTypes.FLOAT,
  weight: DataTypes.FLOAT,
  barcode: DataTypes.STRING,
  upc: DataTypes.STRING,
  originCountry: DataTypes.STRING,
  width: DataTypes.FLOAT,
  height: DataTypes.FLOAT,
  length: DataTypes.FLOAT,
}, {
  tableName: 'Products',
  schema: 'public',
  timestamps: false,
});

module.exports = Product;
