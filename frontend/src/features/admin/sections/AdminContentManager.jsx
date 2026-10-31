import { useEffect, useState } from "react";
import { apiRequest } from "../../../services/api.js";
import {
  uploadInsightImage,
  uploadTestimonialVideo,
} from "../../../services/cloudinaryUpload.js";

const emptyTestimonial = {
  format: "quote",
  quote: "",
  name: "",
  role: "",
  imageUrl: "",
  imageAlt: "",
  published: false,
};
const emptyVideoTestimonial = {
  format: "video",
  quote: "",
  name: "",
  role: "",
  videoProvider: "youtube",
  videoUrl: "",
  published: false,
};
const emptyInsight = {
  title: "",
  slug: "",
  category: "",
  excerpt: "",
  body: "",
  imageUrl: "",
  imageAlt: "",
  published: false,
};
const inputClass =
  "mt-2 min-h-11 w-full rounded-xl border border-[#001F3F]/20 bg-white px-4 py-3 text-sm font-normal outline-none transition focus:border-[#001F3F] focus:ring-2 focus:ring-[#DAA520]/40";

function getYoutubeEmbedUrl(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    const videoId =
      host === "youtu.be"
        ? url.pathname.split("/").filter(Boolean)[0]
        : url.searchParams.get("v") ||
          url.pathname.match(/\/(?:embed|shorts|live)\/([^/?]+)/)?.[1];
    return ["youtu.be", "youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host) &&
      /^[A-Za-z0-9_-]{11}$/.test(videoId || "")
      ? `https://www.youtube-nocookie.com/embed/${videoId}`
      : "";
  } catch {
    return "";
  }
}

export default function AdminContentManager({ type }) {
  const testimonial = type === "testimonials";
  const [testimonialTab, setTestimonialTab] = useState("quote");
  const label = testimonial ? "Testimonial" : "Insight";
  const formLabel = testimonial
    ? testimonialTab === "video"
      ? "video testimonial"
      : "testimonial"
    : "insight";
  const blankForm = testimonial
    ? testimonialTab === "video"
      ? emptyVideoTestimonial
      : emptyTestimonial
    : emptyInsight;
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blankForm);
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const visibleItems = testimonial
    ? items.filter((item) =>
        testimonialTab === "video"
          ? item.format === "video"
          : item.format !== "video",
      )
    : items;

  async function loadItems() {
    setLoading(true);
    try {
      const result = await apiRequest(`/admin/content/${type}`);
      setItems(result.items || []);
    } catch (error) {
      setFeedback(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setItems([]);
    setTestimonialTab("quote");
    setForm(blankForm);
    setEditingId("");
    setFeedback("");
    loadItems();
  }, [type]);

  function updateField(event) {
    const { name, value, checked, type: inputType } = event.target;
    setForm((current) => ({
      ...current,
      [name]: inputType === "checkbox" ? checked : value,
      ...(name === "videoProvider" ? { videoUrl: "" } : {}),
    }));
  }

  function changeTestimonialTab(tab) {
    setTestimonialTab(tab);
    setEditingId("");
    setForm(tab === "video" ? emptyVideoTestimonial : emptyTestimonial);
    setFeedback("");
  }

  function editItem(item) {
    setEditingId(item.id);
    setFeedback("");
    if (testimonial && item.format === "video") {
      setTestimonialTab("video");
      setForm({
        ...emptyVideoTestimonial,
        name: item.name || "",
        role: item.role || "",
        videoProvider: item.video?.provider || "youtube",
        videoUrl: item.video?.url || "",
        published: Boolean(item.published),
      });
    } else if (testimonial)
      setForm({
        ...emptyTestimonial,
        quote: item.quote || "",
        name: item.name || "",
        role: item.role || "",
        imageUrl: item.image?.url || "",
        imageAlt: item.image?.alt || "",
        published: item.published || false,
      });
    else
      setForm({
        title: item.title || "",
        slug: item.slug || "",
        category: item.category || "",
        excerpt: item.excerpt || "",
        body: item.body || "",
        imageUrl: item.image?.url || "",
        imageAlt: item.image?.alt || "",
        published: item.published || false,
      });
    document
      .getElementById("admin-content-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetForm() {
    setEditingId("");
    setForm(blankForm);
    setFeedback("");
  }

  async function handleTestimonialImage(event) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    setUploading(true);
    setFeedback("");
    setUploadProgress({ stage: "starting", percent: 0 });
    try {
      const image = await uploadInsightImage(
        file,
        setUploadProgress,
        "msef/site/testimonials",
      );
      const suggestedAlt = file.name
        .replace(/\.[^.]+$/, "")
        .replace(/[-_]+/g, " ")
        .trim();
      setForm((current) => ({
        ...current,
        imageUrl: image.url,
        imageAlt: current.imageAlt || suggestedAlt,
      }));
      setFeedback(
        `Photo uploaded to Cloudinary${image.uploadSize < image.originalSize ? ` after compression (${(image.originalSize / 1024 / 1024).toFixed(1)} MB → ${(image.uploadSize / 1024 / 1024).toFixed(1)} MB)` : ""}. Please add a clear image description.`,
      );
    } catch (error) {
      setFeedback(error.message || "Could not upload this photo.");
    } finally {
      setUploading(false);
      setUploadProgress(null);
      input.value = "";
    }
  }

  async function handleTestimonialVideo(event) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    setUploading(true);
    setFeedback("");
    setUploadProgress({ stage: "starting", percent: 0 });
    try {
      const video = await uploadTestimonialVideo(file, setUploadProgress);
      setForm((current) => ({
        ...current,
        format: "video",
        videoProvider: "cloudinary",
        videoUrl: video.url,
      }));
      setFeedback("Video uploaded to Cloudinary.");
    } catch (error) {
      setFeedback(error.message || "Could not upload this video.");
    } finally {
      setUploading(false);
      setUploadProgress(null);
      input.value = "";
    }
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setFeedback("");
    try {
      const path = `/admin/content/${type}${editingId ? `/${editingId}` : ""}`;
      const result = await apiRequest(path, {
        method: editingId ? "PUT" : "POST",
        body: JSON.stringify(form),
      });
      if (editingId)
        setItems((current) =>
          current.map((item) => (item.id === editingId ? result.item : item)),
        );
      else setItems((current) => [result.item, ...current]);
      setForm(blankForm);
      setEditingId("");
      setFeedback(
        `${label} ${form.published ? "published" : "saved as a draft"}.`,
      );
    } catch (error) {
      setFeedback(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteItem(item) {
    const name = testimonial ? item.name : item.title;
    if (
      !window.confirm(
        `Delete this ${label.toLowerCase()}${name ? ` from ${name}` : ""}?`,
      )
    )
      return;
    try {
      await apiRequest(`/admin/content/${type}/${item.id}`, {
        method: "DELETE",
      });
      setItems((current) => current.filter((entry) => entry.id !== item.id));
      if (editingId === item.id) resetForm();
    } catch (error) {
      setFeedback(error.message);
    }
  }

  return (
    <section>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a6812]">
          Website content
        </p>
        <h2 className="mt-2 text-2xl font-semibold md:text-2xl lg:text-3xl">
          Manage {testimonial ? "testimonials" : "insights"}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#526171]">
          {testimonial
            ? "Published written and video testimonials appear on the public Home page. Confirm permission to publish each story and attribution."
            : "Published insights appear on the public Home page and have their own readable page."}
        </p>
      </div>

      {testimonial && (
        <div className="mt-6 flex flex-wrap gap-2 border-b border-[#001F3F]/10 pb-3">
          <button
            type="button"
            onClick={() => changeTestimonialTab("quote")}
            aria-pressed={testimonialTab === "quote"}
            className={`min-h-10 rounded-full px-4 text-sm font-semibold transition-colors ${testimonialTab === "quote" ? "bg-[#001F3F] text-white" : "border border-[#001F3F]/15 bg-white text-[#35475a] hover:bg-[#F8F6EF]"}`}
          >
            Written testimonials
          </button>
          <button
            type="button"
            onClick={() => changeTestimonialTab("video")}
            aria-pressed={testimonialTab === "video"}
            className={`min-h-10 rounded-full px-4 text-sm font-semibold transition-colors ${testimonialTab === "video" ? "bg-[#001F3F] text-white" : "border border-[#001F3F]/15 bg-white text-[#35475a] hover:bg-[#F8F6EF]"}`}
          >
            Video testimonials
          </button>
        </div>
      )}

      <div className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
        <div className="space-y-4">
          {loading && (
            <p className="rounded-2xl bg-white p-5 text-sm text-[#526171]">
              Loading {label.toLowerCase()}s…
            </p>
          )}
          {!loading && visibleItems.length === 0 && (
            <p className="rounded-2xl bg-white p-5 text-sm text-[#526171]">
              No {testimonialTab === "video" ? "video testimonials" : `${label.toLowerCase()}s`} yet. Add the first one with the form.
            </p>
          )}
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-[#001F3F]/10 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.published ? "bg-emerald-50 text-emerald-800" : "bg-[#F8F6EF] text-[#526171]"}`}
                  >
                    {item.published ? "Published" : "Draft"}
                  </span>
                  {testimonial && item.format === "video" && item.video?.provider === "youtube" && (
                    <iframe
                      src={item.video.url}
                      title={`Video testimonial from ${item.name}`}
                      loading="lazy"
                      allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="mb-4 aspect-video w-full rounded-xl bg-black"
                    />
                  )}
                  {testimonial && item.format === "video" && item.video?.provider === "cloudinary" && (
                    <video
                      src={item.video.url}
                      controls
                      preload="metadata"
                      className="mb-4 aspect-video w-full rounded-xl bg-black"
                    />
                  )}
                  {testimonial && item.format !== "video" && item.image?.url && (
                    <img
                      src={item.image.url}
                      alt={item.image.alt || ""}
                      className="mb-3 h-16 w-16 rounded-full object-cover"
                    />
                  )}
                  <h3 className="mt-3 text-lg font-semibold">
                    {testimonial ? item.name : item.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-[#526171]">
                    {testimonial
                      ? item.format === "video"
                        ? "Video testimonial"
                        : `“${item.quote}”`
                      : item.excerpt}
                  </p>
                  {!testimonial && (
                    <p className="mt-2 text-xs text-[#667687]">
                      /{item.slug}
                      {item.category ? ` · ${item.category}` : ""}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <button
                    onClick={() => editItem(item)}
                    className="min-h-10 rounded-full border border-[#001F3F]/20 px-4 text-sm font-semibold hover:bg-[#F8F6EF]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item)}
                    className="min-h-10 rounded-full border border-red-200 px-4 text-sm font-semibold text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <form
          id="admin-content-form"
          onSubmit={submit}
          className="scroll-mt-5 rounded-2xl border border-[#001F3F]/10 bg-white p-5 shadow-sm sm:p-6"
        >
          <h3 className="text-lg font-semibold">
            {editingId
              ? `Edit ${formLabel}`
              : `Add ${formLabel}`}
          </h3>
          {testimonial ? testimonialTab === "video" ? (
            <>
              <label className="mt-5 block text-sm font-semibold">
                Person’s name
                <input
                  name="name"
                  minLength="2"
                  maxLength="120"
                  required
                  value={form.name}
                  onChange={updateField}
                  className={inputClass}
                />
              </label>
              <label className="mt-4 block text-sm font-semibold">
                Role or affiliation <span className="font-normal text-[#667687]">(optional)</span>
                <input name="role" maxLength="160" value={form.role} onChange={updateField} className={inputClass} />
              </label>
              <label className="mt-4 block text-sm font-semibold">
                Video source
                <select name="videoProvider" value={form.videoProvider} onChange={updateField} className={inputClass}>
                  <option value="youtube">YouTube link</option>
                  <option value="cloudinary">Upload video file</option>
                </select>
              </label>
              {form.videoProvider === "youtube" ? (
                <label className="mt-4 block text-sm font-semibold">
                  YouTube video URL
                  <input name="videoUrl" type="url" required value={form.videoUrl} onChange={updateField} placeholder="https://www.youtube.com/watch?v=…" className={inputClass} />
                </label>
              ) : (
                <div className="mt-4 rounded-xl border border-[#001F3F]/10 bg-[#F8FAFC] p-4">
                  <p className="text-sm font-semibold">Upload a video to Cloudinary</p>
                  <p className="mt-1 text-xs leading-5 text-[#667687]">Choose an MP4, WebM, or MOV video. Large files may take longer to upload.</p>
                  <label className={`mt-3 inline-flex min-h-10 cursor-pointer items-center rounded-full px-4 text-sm font-semibold text-white ${uploading ? "bg-[#526171]" : "bg-[#001F3F] hover:bg-[#0b385f]"}`}>
                    <input type="file" accept="video/mp4,video/webm,video/quicktime" disabled={uploading} onChange={handleTestimonialVideo} className="sr-only" />
                    {uploading ? "Uploading…" : form.videoUrl ? "Replace video" : "Choose video file"}
                  </label>
                  {uploadProgress && <p role="status" aria-live="polite" className="mt-3 text-xs text-[#526171]">{uploadProgress.stage === "uploading" ? `Uploading to Cloudinary… ${Math.round(uploadProgress.percent)}%` : "Preparing upload…"}</p>}
                </div>
              )}
              {form.videoUrl && (
                <div className="mt-4 overflow-hidden rounded-xl border border-[#001F3F]/10 bg-black">
                  {form.videoProvider === "youtube" ? (
                    <iframe src={getYoutubeEmbedUrl(form.videoUrl)} title="Video testimonial preview" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen className="aspect-video w-full" />
                  ) : (
                    <video src={form.videoUrl} controls preload="metadata" className="aspect-video w-full" />
                  )}
                  <button type="button" onClick={() => setForm((current) => ({ ...current, videoUrl: "" }))} className="m-3 min-h-9 rounded-full border border-white/30 px-3 text-xs font-semibold text-white hover:bg-white/10">Remove video</button>
                </div>
              )}
            </>
          ) : (
            <>
              <label className="mt-5 block text-sm font-semibold">
                Quote
                <textarea
                  name="quote"
                  minLength="10"
                  maxLength="1600"
                  rows="5"
                  required
                  value={form.quote}
                  onChange={updateField}
                  className={`${inputClass} resize-y`}
                />
              </label>
              <label className="mt-4 block text-sm font-semibold">
                Person’s name
                <input
                  name="name"
                  minLength="2"
                  maxLength="120"
                  required
                  value={form.name}
                  onChange={updateField}
                  className={inputClass}
                />
              </label>
              <label className="mt-4 block text-sm font-semibold">
                Role or affiliation{" "}
                <span className="font-normal text-[#667687]">(optional)</span>
                <input
                  name="role"
                  maxLength="160"
                  value={form.role}
                  onChange={updateField}
                  className={inputClass}
                />
              </label>
              <div className="mt-4 rounded-xl border border-[#001F3F]/10 bg-[#F8FAFC] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">
                      Portrait or testimonial image
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#667687]">
                      Get permission to publish the person’s image. Images 10 MB
                      or larger are compressed before upload.
                    </p>
                  </div>
                  <label
                    className={`inline-flex min-h-10 cursor-pointer items-center rounded-full px-4 text-sm font-semibold text-white ${uploading ? "bg-[#526171]" : "bg-[#001F3F] hover:bg-[#0b385f]"}`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={handleTestimonialImage}
                      className="sr-only"
                    />
                    {uploading
                      ? "Uploading…"
                      : form.imageUrl
                        ? "Replace image"
                        : "Upload image"}
                  </label>
                </div>
                {uploadProgress && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-3 text-xs text-[#526171]"
                  >
                    {uploadProgress.stage === "compressing"
                      ? `Compressing image… ${Math.round(uploadProgress.percent)}%`
                      : uploadProgress.stage === "uploading"
                        ? `Uploading to Cloudinary… ${Math.round(uploadProgress.percent)}%`
                        : "Preparing upload…"}
                  </div>
                )}
                {form.imageUrl && (
                  <div className="mt-4 flex flex-wrap items-start gap-4">
                    <img
                      src={form.imageUrl}
                      alt={form.imageAlt || "Testimonial image preview"}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                    <div className="min-w-[14rem] flex-1">
                      <label className="block text-sm font-semibold">
                        Image description
                        <input
                          name="imageAlt"
                          maxLength="250"
                          required
                          value={form.imageAlt}
                          onChange={updateField}
                          className={inputClass}
                          placeholder="Describe the person or image"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            imageUrl: "",
                            imageAlt: "",
                          }))
                        }
                        className="mt-2 min-h-9 rounded-full border border-red-200 px-3 text-xs font-semibold text-red-700 hover:bg-red-50"
                      >
                        Remove image
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <label className="mt-5 block text-sm font-semibold">
                Title
                <input
                  name="title"
                  maxLength="180"
                  required
                  value={form.title}
                  onChange={updateField}
                  className={inputClass}
                />
              </label>
              <label className="mt-4 block text-sm font-semibold">
                URL slug{" "}
                <span className="font-normal text-[#667687]">
                  (leave blank to create from title)
                </span>
                <input
                  name="slug"
                  maxLength="200"
                  value={form.slug}
                  onChange={updateField}
                  className={inputClass}
                />
              </label>
              <label className="mt-4 block text-sm font-semibold">
                Category{" "}
                <span className="font-normal text-[#667687]">(optional)</span>
                <input
                  name="category"
                  maxLength="100"
                  value={form.category}
                  onChange={updateField}
                  className={inputClass}
                />
              </label>
              <label className="mt-4 block text-sm font-semibold">
                Short description
                <textarea
                  name="excerpt"
                  minLength="10"
                  maxLength="400"
                  rows="3"
                  required
                  value={form.excerpt}
                  onChange={updateField}
                  className={`${inputClass} resize-y`}
                />
              </label>
              <label className="mt-4 block text-sm font-semibold">
                Article text
                <textarea
                  name="body"
                  minLength="20"
                  maxLength="20000"
                  rows="7"
                  required
                  value={form.body}
                  onChange={updateField}
                  className={`${inputClass} resize-y`}
                />
              </label>
              <label className="mt-4 block text-sm font-semibold">
                Cloudinary image URL{" "}
                <span className="font-normal text-[#667687]">(optional)</span>
                <input
                  name="imageUrl"
                  type="url"
                  value={form.imageUrl}
                  onChange={updateField}
                  className={inputClass}
                />
              </label>
              <label className="mt-4 block text-sm font-semibold">
                Image description{" "}
                <span className="font-normal text-[#667687]">
                  (required when an image is added)
                </span>
                <input
                  name="imageAlt"
                  maxLength="250"
                  required={Boolean(form.imageUrl)}
                  value={form.imageAlt}
                  onChange={updateField}
                  className={inputClass}
                />
              </label>
            </>
          )}
          <label className="mt-5 flex min-h-11 cursor-pointer items-center gap-3 text-sm font-semibold">
            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={updateField}
              className="h-4 w-4 accent-[#001F3F]"
            />
            Publish on website
          </label>
          {feedback && (
            <p
              role="status"
              aria-live="polite"
              className="mt-4 rounded-xl bg-[#F8F6EF] px-4 py-3 text-sm leading-6 text-[#435365]"
            >
              {feedback}
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving || uploading}
              className="min-h-11 rounded-full bg-[#001F3F] px-5 text-sm font-bold text-white hover:bg-[#0b385f] disabled:opacity-60"
            >
              {saving
                ? "Saving…"
                : editingId
                  ? "Save changes"
                  : `Save ${formLabel}`}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="min-h-11 rounded-full border border-[#001F3F]/20 px-5 text-sm font-semibold hover:bg-[#F8F6EF]"
              >
                Cancel edit
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
