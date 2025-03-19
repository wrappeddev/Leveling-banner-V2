const { createCanvas, loadImage, registerFont } = require('canvas');

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { username = "User", level = 1, xp = 0, avatar } = req.query;

    const width = 800, height = 250;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Load background
    ctx.fillStyle = "#1e1e2e";
    ctx.fillRect(0, 0, width, height);

    // Register font (ensure font is installed on Vercel)
    ctx.font = "30px Arial";
    ctx.fillStyle = "#ffffff";
    
    // Draw text
    ctx.fillText(`Username: ${username}`, 50, 80);
    ctx.fillText(`Level: ${level}`, 50, 130);
    ctx.fillText(`XP: ${xp}`, 50, 180);

    // Load and draw avatar
    if (avatar) {
        try {
            const avatarImg = await loadImage(avatar);
            ctx.drawImage(avatarImg, 650, 50, 150, 150);
        } catch (error) {
            console.error("Error loading avatar:", error);
        }
    }

    // Return image
    res.setHeader("Content-Type", "image/png");
    canvas.createPNGStream().pipe(res);
};
