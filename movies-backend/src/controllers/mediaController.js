import prisma from '../prismaClient.js';
import { createMediaschema } from "../validators/mediaSchema.js"; 

export const createMedia = async (req, res) => {
  try {
    const validatedData = createMediaschema.parse(req.body);

const userId = req.user.id;


    const media = await prisma.media.create({
      data: {
        ...validatedData,
        userId, 
      },
    });

    res.status(201).json({ success: true, data: media });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }

    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const getAllMedia = async (req, res) => {
  try {
    const userId = req.user.id; // Logged-in user's ID from auth middleware

    const mediaList = await prisma.media.findMany({
      where: { userId }, // only media of this user
      orderBy: { createdAt: "desc" }, // optional: newest first
    });

    res.status(200).json({ success: true, data: mediaList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const deleteMedia = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user.id;

    // ✅ Step 1: Remove from weekend picks first
    await prisma.weekendPick.deleteMany({
      where: { mediaId: id, userId }
    });

 
    const deleted = await prisma.media.deleteMany({
      where: { id, userId },
    });

    if (deleted.count === 0) {
      return res.status(404).json({ success: false, message: "Media not found or not yours" });
    }

    return res.status(200).json({ success: true, message: "Media deleted successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const updateMedia = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user.id;

    const validatedData = createMediaschema.parse(req.body);

    const updated = await prisma.media.updateMany({
      where: { id, userId }, // Ensure user owns it
      data: validatedData,
    });

    if (updated.count === 0) {
      return res.status(404).json({ success: false, message: "Media not found or not yours" });
    }

    return res.status(200).json({ success: true, message: "Media updated successfully" });

  } catch (error) {

    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, errors: error.errors });
    }

    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
