import { Request, Response } from 'express';
import { prisma } from '../prisma';

// GET: Fetch all services
export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    console.error('Fetch services error:', error);
    return res.status(500).json({ success: false, message: 'Could not retrieve services list.' });
  }
};

// POST: Add new service (Admin only)
export const createService = async (req: Request, res: Response) => {
  try {
    const { title, description, icon, features } = req.body;

    if (!title || !description || !icon) {
      return res.status(400).json({ success: false, message: 'Title, description, and icon name are required.' });
    }

    const service = await prisma.service.create({
      data: {
        title,
        description,
        icon,
        features: Array.isArray(features) ? features : [],
      },
    });

    return res.status(201).json({ success: true, message: 'Service added successfully.', data: service });
  } catch (error) {
    console.error('Create service error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create service entry.' });
  }
};

// PUT: Modify service parameters (Admin only)
export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, icon, features } = req.body;

    const existingService = await prisma.service.findUnique({ where: { id } });
    if (!existingService) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        title: title || undefined,
        description: description || undefined,
        icon: icon || undefined,
        features: Array.isArray(features) ? features : undefined,
      },
    });

    return res.status(200).json({ success: true, message: 'Service updated successfully.', data: updatedService });
  } catch (error) {
    console.error('Update service error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update service details.' });
  }
};

// DELETE: Remove service (Admin only)
export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingService = await prisma.service.findUnique({ where: { id } });
    if (!existingService) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    await prisma.service.delete({ where: { id } });

    return res.status(200).json({ success: true, message: 'Service deleted successfully.' });
  } catch (error) {
    console.error('Delete service error:', error);
    return res.status(500).json({ success: false, message: 'Failed to remove service from database.' });
  }
};
