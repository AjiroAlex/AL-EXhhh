const express = require("express");
const fetch = require("node-fetch");

const app = express();
const API_KEY = "8ff4d074-7832-40b8-8f49-3546ac79fae2"; // ضع مفتاحك هنا

app.get("/", (req, res) => {
    res.send("✅ Leonardo AI Bot is running on Vercel!");
});

app.get("/generate", async (req, res) => {
    const prompt = req.query.prompt; // النص الذي سيتم استخدامه لإنشاء الصورة

    if (!prompt) {
        return res.status(400).json({ error: "يرجى إدخال النص المطلوب." });
    }

    try {
        const response = await fetch("https://cloud.leonardo.ai/api/rest/v1/generations", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: prompt,
                modelId: "ac614f96-5061-4290-a3b7-2b3830a5e4ee",
                width: 1024,
                height: 1024,
                num_images: 1
            })
        });

        const data = await response.json();
        res.json({ image_url: data.generations[0].generated_image });
    } catch (error) {
        res.status(500).json({ error: "❌ حدث خطأ أثناء إنشاء الصورة." });
    }
});

// ❌ لا تستخدم `app.listen()` على Vercel
module.exports = app;
