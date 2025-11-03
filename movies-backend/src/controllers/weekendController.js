import prisma from "../prismaClient.js";

export const toggleWeekendPick = async (req, res) => {
  try {
    const userId = req.user.id; // from authMiddleware
    const { mediaId } = req.body;

    // Check if already exists
    const existing = await prisma.weekendPick.findFirst({
      where: { userId, mediaId }
    });

    if (existing) {
      // Remove it (unpick)
      await prisma.weekendPick.delete({ where: { id: existing.id } });
      return res.json({ success: true, message: "Removed from Weekend Picks " });
    }

    // Add it
    await prisma.weekendPick.create({
      data: { userId, mediaId }
    });

    return res.json({ success: true, message: "Added to Weekend Picks " });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getWeekendPicks = async (req, res) => {
  try {
    const userId = req.user.id;

    const picks = await prisma.weekendPick.findMany({
      where: { userId },
      include: {
        media: true   //  Get full Media object
      }
    });

    return res.json({
      success: true,
      data: picks //  returns [{ id, userId, mediaId, media: {...} }]
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
