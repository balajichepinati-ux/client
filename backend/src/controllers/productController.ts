import { Request, Response } from 'express';
import { prisma } from '../prisma';

// GET: Fetch all products with search and category filtering
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;

    const filterConditions: any = {};

    if (category && category !== 'All') {
      filterConditions.category = String(category).toLowerCase();
    }

    if (search) {
      filterConditions.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { description: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where: filterConditions,
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    console.error('Fetch products error:', error);
    return res.status(500).json({ success: false, message: 'Could not retrieve products catalog.' });
  }
};

// POST: Add new product (Admin only)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, category, description, price, image, specs } = req.body;

    if (!name || !category || !description) {
      return res.status(400).json({ success: false, message: 'Name, category, and description are required.' });
    }

    const product = await prisma.product.create({
      data: {
        name,
        category: category.toLowerCase(),
        description,
        price: price ? parseFloat(price) : null,
        image: image || null,
        specs: Array.isArray(specs) ? specs : [],
      },
    });

    return res.status(201).json({ success: true, message: 'Product created successfully.', data: product });
  } catch (error) {
    console.error('Create product error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create product record.' });
  }
};

// PUT: Update product data (Admin only)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, description, price, image, specs } = req.body;

    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: name || undefined,
        category: category ? category.toLowerCase() : undefined,
        description: description || undefined,
        price: price !== undefined ? (price ? parseFloat(price) : null) : undefined,
        image: image !== undefined ? image : undefined,
        specs: Array.isArray(specs) ? specs : undefined,
      },
    });

    return res.status(200).json({ success: true, message: 'Product updated successfully.', data: updatedProduct });
  } catch (error) {
    console.error('Update product error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update product details.' });
  }
};

// DELETE: Remove product from database (Admin only)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    await prisma.product.delete({ where: { id } });

    return res.status(200).json({ success: true, message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Delete product error:', error);
    return res.status(500).json({ success: false, message: 'Failed to remove product from database.' });
  }
};
