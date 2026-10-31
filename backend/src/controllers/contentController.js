import mongoose from "mongoose";
import ContentItem from "../models/ContentItem.js";
import HttpError from "../utils/HttpError.js";
import { sendInsightUpdate } from "../integrations/resend.js";

const typeMap = { testimonials: "testimonial", insights: "insight" };
const slugify = (value) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 180);

function toPublicItem(item) {
  const { _id, __v, type, ...fields } = item;
  return { id: String(_id), ...fields };
}

function validateContent(type, input) {
  if (type === "testimonial") {
    if (
      typeof input.name !== "string" ||
      input.name.trim().length < 2 ||
      input.name.length > 120
    )
      throw new HttpError(400, "Enter the speaker’s name.");

    if (input.format === "video") {
      const provider = input.videoProvider;
      let videoUrl;

      if (provider === "youtube") {
        try {
          const parsedUrl = new URL(input.videoUrl);
          const host = parsedUrl.hostname.toLowerCase().replace(/^www\./, "");
          const videoId =
            host === "youtu.be"
              ? parsedUrl.pathname.split("/").filter(Boolean)[0]
              : parsedUrl.searchParams.get("v") ||
                parsedUrl.pathname.match(/\/(?:embed|shorts|live)\/([^/?]+)/)?.[1];
          if (
            !["youtu.be", "youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host) ||
            !/^[A-Za-z0-9_-]{11}$/.test(videoId || "")
          )
            throw new Error("Invalid YouTube URL");
          videoUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
        } catch {
          throw new HttpError(400, "Enter a valid YouTube video link.");
        }
      } else if (provider === "cloudinary") {
        try {
          const parsedUrl = new URL(input.videoUrl);
          if (
            parsedUrl.protocol !== "https:" ||
            parsedUrl.hostname !== "res.cloudinary.com" ||
            !parsedUrl.pathname.includes("/video/upload/")
          )
            throw new Error("Invalid Cloudinary video URL");
          videoUrl = parsedUrl.toString();
        } catch {
          throw new HttpError(400, "Upload a video to Cloudinary before saving.");
        }
      } else {
        throw new HttpError(400, "Choose YouTube or upload a video file.");
      }

      return {
        format: "video",
        quote: "",
        name: input.name.trim(),
        role: typeof input.role === "string" ? input.role.trim().slice(0, 160) : "",
        image: { url: "", alt: "" },
        video: { provider, url: videoUrl },
        published: input.published === true,
      };
    }

    if (
      typeof input.quote !== "string" ||
      input.quote.trim().length < 10 ||
      input.quote.length > 1600
    )
      throw new HttpError(
        400,
        "Enter a testimonial between 10 and 1,600 characters.",
      );
    let image = { url: "", alt: "" };
    if (input.imageUrl) {
      let url;
      try {
        url = new URL(input.imageUrl);
      } catch {
        throw new HttpError(400, "Enter a valid image URL.");
      }
      if (url.protocol !== "https:")
        throw new HttpError(
          400,
          "Testimonial images must use a secure HTTPS URL.",
        );
      const alt =
        typeof input.imageAlt === "string"
          ? input.imageAlt.trim().slice(0, 250)
          : "";
      if (!alt)
        throw new HttpError(
          400,
          "Add an image description or remove the image URL.",
        );
      image = { url: url.toString(), alt };
    }
    return {
      format: "quote",
      quote: input.quote.trim(),
      name: input.name.trim(),
      role:
        typeof input.role === "string" ? input.role.trim().slice(0, 160) : "",
      image,
      published: input.published === true,
    };
  }

  if (
    typeof input.title !== "string" ||
    !input.title.trim() ||
    input.title.length > 180
  )
    throw new HttpError(400, "Enter an insight title (up to 180 characters).");
  if (
    typeof input.excerpt !== "string" ||
    input.excerpt.trim().length < 10 ||
    input.excerpt.length > 400
  )
    throw new HttpError(400, "Enter an excerpt between 10 and 400 characters.");
  if (
    typeof input.body !== "string" ||
    input.body.trim().length < 20 ||
    input.body.length > 20000
  )
    throw new HttpError(
      400,
      "Enter an insight body between 20 and 20,000 characters.",
    );
  const slug = slugify(
    typeof input.slug === "string" && input.slug.trim()
      ? input.slug.trim()
      : input.title.trim(),
  );
  if (!slug) throw new HttpError(400, "Add a valid web address slug.");
  let image = { url: "", alt: "" };
  if (input.imageUrl) {
    let url;
    try {
      url = new URL(input.imageUrl);
    } catch {
      throw new HttpError(400, "Enter a valid image URL.");
    }
    if (url.protocol !== "https:")
      throw new HttpError(400, "Insight images must use a secure HTTPS URL.");
    const alt =
      typeof input.imageAlt === "string"
        ? input.imageAlt.trim().slice(0, 250)
        : "";
    if (!alt)
      throw new HttpError(
        400,
        "Add an image description or remove the image URL.",
      );
    image = { url: url.toString(), alt };
  }
  return {
    title: input.title.trim(),
    slug,
    category:
      typeof input.category === "string"
        ? input.category.trim().slice(0, 100)
        : "",
    excerpt: input.excerpt.trim(),
    body: input.body.trim(),
    image,
    published: input.published === true,
    publishedAt: input.published === true ? new Date() : undefined,
  };
}

export async function listPublishedContent(request, response, next) {
  const type = typeMap[request.params.type];
  if (!type) return next(new HttpError(404, "Content type not found."));
  try {
    const items = await ContentItem.find({ type, published: true })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(20)
      .lean();
    response.json({ items: items.map(toPublicItem) });
  } catch (error) {
    next(error);
  }
}

export async function getPublishedInsight(request, response, next) {
  try {
    const item = await ContentItem.findOne({
      type: "insight",
      published: true,
      slug: request.params.slug,
    }).lean();
    if (!item) throw new HttpError(404, "Insight not found.");
    response.json({ item: toPublicItem(item) });
  } catch (error) {
    next(error);
  }
}

export async function listAdminContent(request, response, next) {
  const type = typeMap[request.params.type];
  if (!type) return next(new HttpError(404, "Content type not found."));
  try {
    const items = await ContentItem.find({ type })
      .sort({ updatedAt: -1 })
      .limit(300)
      .lean();
    response.json({ items: items.map(toPublicItem) });
  } catch (error) {
    next(error);
  }
}

export async function createContent(request, response, next) {
  const type = typeMap[request.params.type];
  if (!type) return next(new HttpError(404, "Content type not found."));
  try {
    const item = await ContentItem.create({
      type,
      ...validateContent(type, request.body || {}),
    });
    if (type === "insight" && item.published) {
      void sendInsightUpdate(item.toObject()).catch((error) => {
        console.error("Could not load newsletter subscribers for the new insight.", error.message);
      });
    }
    response.status(201).json({ item: toPublicItem(item.toObject()) });
  } catch (error) {
    if (error.code === 11000)
      return next(
        new HttpError(409, "An insight with this URL slug already exists."),
      );
    next(error);
  }
}

export async function updateContent(request, response, next) {
  const type = typeMap[request.params.type];
  if (!type) return next(new HttpError(404, "Content type not found."));
  try {
    if (!mongoose.isValidObjectId(request.params.id))
      throw new HttpError(404, "Content item not found.");
    const existingItem = await ContentItem.findOne({ _id: request.params.id, type });
    if (!existingItem) throw new HttpError(404, "Content item not found.");
    const wasPublished = existingItem.published;
    existingItem.set(validateContent(type, request.body || {}));
    const item = await existingItem.save();
    const updatedItem = item.toObject();
    if (type === "insight" && !wasPublished && item.published) {
      void sendInsightUpdate(updatedItem).catch((error) => {
        console.error("Could not load newsletter subscribers for the published insight.", error.message);
      });
    }
    response.json({ item: toPublicItem(updatedItem) });
  } catch (error) {
    if (error.code === 11000)
      return next(
        new HttpError(409, "An insight with this URL slug already exists."),
      );
    next(error);
  }
}

export async function deleteContent(request, response, next) {
  const type = typeMap[request.params.type];
  if (!type) return next(new HttpError(404, "Content type not found."));
  try {
    if (!mongoose.isValidObjectId(request.params.id))
      throw new HttpError(404, "Content item not found.");
    const deleted = await ContentItem.findOneAndDelete({
      _id: request.params.id,
      type,
    });
    if (!deleted) throw new HttpError(404, "Content item not found.");
    response.status(204).end();
  } catch (error) {
    next(error);
  }
}
