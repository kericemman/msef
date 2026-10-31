import { useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { apiRequest } from "../../../services/api.js";
import { uploadInsightImage } from "../../../services/cloudinaryUpload.js";

const blankInsight = {
  title: "",
  slug: "",
  category: "",
  excerpt: "",
  body: "",
  imageUrl: "",
  imageAlt: "",
  published: false,
};
const fieldClass =
  "mt-2 min-h-11 w-full rounded-xl border border-[#001F3F]/20 bg-white px-4 py-3 text-sm font-normal outline-none transition focus:border-[#001F3F] focus:ring-2 focus:ring-[#DAA520]/40";
const insightCategories = [
  "Foundation news",
  "Youth empowerment",
  "Rehabilitation and recovery",
  "Climate-smart agriculture",
  "Environmental conservation",
  "Education and mentorship",
  "Community development",
  "Announcements",
];

function getYoutubeUrl(input) {
  try {
    const url = new URL(input.trim());
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    let videoId = "";
    if (host === "youtu.be")
      videoId = url.pathname.split("/").filter(Boolean)[0] || "";
    else if (
      [
        "youtube.com",
        "m.youtube.com",
        "music.youtube.com",
        "youtube-nocookie.com",
      ].includes(host)
    ) {
      videoId =
        url.searchParams.get("v") ||
        url.pathname.match(/\/(?:embed|shorts|live)\/([^/?]+)/)?.[1] ||
        "";
    }
    if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) return "";
    return `https://www.youtube.com/watch?v=${videoId}`;
  } catch {
    return "";
  }
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

async function fileFromPastedImageUrl(url, index) {
  if (!url || url.startsWith("https://res.cloudinary.com/")) return null;
  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error(
      "A pasted image could not be accessed by the browser. Copy the image itself and paste it again, or upload it with the Image button.",
    );
  }
  if (!response.ok)
    throw new Error(`Could not read pasted image (${response.status}).`);
  const blob = await response.blob();
  if (!blob.type.startsWith("image/"))
    throw new Error("The pasted content did not provide a usable image file.");
  const extension = blob.type.split("/")[1]?.replace("jpeg", "jpg") || "png";
  return new File([blob], `pasted-image-${index}.${extension}`, {
    type: blob.type,
  });
}

function InsightEditor({ value, onChange, onImageUpload }) {
  const imageInput = useRef(null);
  const [imageBusy, setImageBusy] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ["https", "http", "mailto"],
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Youtube.configure({
        nocookie: true,
        controls: true,
        allowFullscreen: true,
        width: "100%",
        height: 390,
      }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "min-h-[260px] px-4 py-4 text-sm leading-7 text-[#23384D] outline-none [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:my-5 [&_blockquote]:border-l-4 [&_blockquote]:border-[#DAA520] [&_blockquote]:pl-4 [&_blockquote]:italic [&_a]:text-[#07518A] [&_a]:underline [&_img]:my-5 [&_img]:max-h-[620px] [&_img]:max-w-full [&_img]:rounded-xl [&_iframe]:my-5 [&_iframe]:max-w-full [&_hr]:my-6 [&_hr]:border-[#001F3F]/15",
      },
      handlePaste: (_view, event) => {
        const clipboard = event.clipboardData;
        if (!clipboard) return false;

        const imageFiles = Array.from(clipboard.items || [])
          .filter(
            (item) => item.kind === "file" && item.type.startsWith("image/"),
          )
          .map((item) => item.getAsFile())
          .filter(Boolean);
        const html = clipboard.getData("text/html");
        const plainText = clipboard.getData("text/plain");
        const parsed = new DOMParser().parseFromString(
          html || `<p>${escapeHtml(plainText).replace(/\n/g, "<br>")}</p>`,
          "text/html",
        );
        const pastedImages = Array.from(parsed.querySelectorAll("img"));
        if (imageFiles.length === 0 && pastedImages.length === 0) return false;

        event.preventDefault();
        setImageBusy(true);

        void (async () => {
          try {
            let imageIndex = 0;
            for (const imageNode of pastedImages) {
              const clipboardFile = imageFiles.shift();
              const source = imageNode.getAttribute("src") || "";
              if (source.startsWith("https://res.cloudinary.com/")) continue;

              const file =
                clipboardFile ||
                (await fileFromPastedImageUrl(source, imageIndex + 1));
              if (!file)
                throw new Error(
                  "A pasted image could not be read. Copy the image itself and paste it again, or upload it with the Image button.",
                );

              imageIndex += 1;
              const uploaded = await onImageUpload(file);
              imageNode.setAttribute("src", uploaded.url);
              imageNode.removeAttribute("srcset");
              imageNode.removeAttribute("sizes");
              if (!imageNode.getAttribute("alt")?.trim())
                imageNode.setAttribute(
                  "alt",
                  file.name || `Pasted image ${imageIndex}`,
                );
            }

            for (const file of imageFiles) {
              const uploaded = await onImageUpload(file);
              const imageNode = parsed.createElement("img");
              imageNode.setAttribute("src", uploaded.url);
              imageNode.setAttribute(
                "alt",
                file.name || `Pasted image ${++imageIndex}`,
              );
              parsed.body.append(imageNode);
            }

            const content = parsed.body.innerHTML.trim();
            if (content) editor.chain().focus().insertContent(content).run();
          } catch (error) {
            window.alert(
              error.message || "Could not paste and upload these images.",
            );
          } finally {
            setImageBusy(false);
          }
        })();

        return true;
      },
    },
    onUpdate: ({ editor: activeEditor }) => onChange(activeEditor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML())
      editor.commands.setContent(value || "", { emitUpdate: false });
  }, [editor, value]);

  if (!editor)
    return (
      <div className="min-h-[300px] animate-pulse rounded-xl bg-[#F3F5F7]" />
    );

  const tools = [
    {
      label: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
      symbol: "B",
      style: "font-bold",
    },
    {
      label: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
      symbol: "I",
      style: "italic",
    },
    {
      label: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
      symbol: "H2",
    },
    {
      label: "Heading 3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: editor.isActive("heading", { level: 3 }),
      symbol: "H3",
    },
    {
      label: "Bulleted list",
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
      symbol: "• List",
    },
    {
      label: "Numbered list",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
      symbol: "1. List",
    },
    {
      label: "Quote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive("blockquote"),
      symbol: "❞",
    },
  ];

  function addLink() {
    const current = editor.getAttributes("link").href || "";
    const url = window.prompt(
      "Enter a link URL (https:// or mailto:)",
      current,
    );
    if (url === null) return;
    if (!url.trim())
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    else
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url.trim() })
        .run();
  }

  async function addInlineImage(event) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      window.alert("Choose an image file.");
      input.value = "";
      return;
    }
    const name = file.name
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .trim();
    const alt = window.prompt("Describe this image for accessibility", name);
    if (alt === null) {
      input.value = "";
      return;
    }
    setImageBusy(true);
    try {
      const image = await onImageUpload(file);
      editor
        .chain()
        .focus()
        .setImage({ src: image.url, alt: alt.trim() || name })
        .run();
    } catch (error) {
      window.alert(error.message || "Could not upload this inline image.");
    } finally {
      setImageBusy(false);
      input.value = "";
    }
  }

  function addYoutubeVideo() {
    const input = window.prompt("Paste a YouTube video URL");
    if (input === null) return;
    const src = getYoutubeUrl(input);
    if (!src) {
      window.alert("Enter a valid YouTube video link.");
      return;
    }
    editor
      .chain()
      .focus()
      .setYoutubeVideo({ src, width: "100%", height: 390 })
      .run();
  }

  return (
    <div className="mt-2 overflow-hidden rounded-xl border border-[#001F3F]/20 focus-within:border-[#001F3F] focus-within:ring-2 focus-within:ring-[#DAA520]/40">
      <div
        aria-label="Article formatting"
        role="toolbar"
        className="flex flex-wrap gap-1 border-b border-[#001F3F]/10 bg-[#F7F8F9] p-2"
      >
        {tools.map((tool) => (
          <button
            key={tool.label}
            type="button"
            title={tool.label}
            aria-label={tool.label}
            aria-pressed={tool.active}
            onClick={tool.action}
            className={`min-h-9 rounded-lg border px-2.5 text-xs transition-colors ${tool.style || ""} ${tool.active ? "border-[#001F3F] bg-[#001F3F] text-white" : "border-transparent text-[#35475a] hover:border-[#001F3F]/15 hover:bg-white"}`}
          >
            {tool.symbol}
          </button>
        ))}
        <button
          type="button"
          title="Add link"
          aria-label="Add link"
          aria-pressed={editor.isActive("link")}
          onClick={addLink}
          className={`min-h-9 rounded-lg border px-2.5 text-xs underline underline-offset-2 ${editor.isActive("link") ? "border-[#001F3F] bg-[#001F3F] text-white" : "border-transparent text-[#35475a] hover:border-[#001F3F]/15 hover:bg-white"}`}
        >
          Link
        </button>
        <button
          type="button"
          title="Upload image into article"
          aria-label="Upload image into article"
          disabled={imageBusy}
          onClick={() => imageInput.current?.click()}
          className="min-h-9 rounded-lg border border-transparent px-2.5 text-xs font-semibold text-[#35475a] hover:border-[#001F3F]/15 hover:bg-white disabled:opacity-50"
        >
          {imageBusy ? "Uploading…" : "▧ Image"}
        </button>
        <input
          ref={imageInput}
          type="file"
          accept="image/*"
          onChange={addInlineImage}
          className="sr-only"
          tabIndex={-1}
        />
        <button
          type="button"
          title="Embed YouTube video"
          aria-label="Embed YouTube video"
          onClick={addYoutubeVideo}
          className="min-h-9 rounded-lg border border-transparent px-2.5 text-xs font-semibold text-[#35475a] hover:border-[#001F3F]/15 hover:bg-white"
        >
          ▶ YouTube
        </button>
        <button
          type="button"
          title="Undo"
          aria-label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="min-h-9 rounded-lg border border-transparent px-2.5 text-sm text-[#35475a] hover:border-[#001F3F]/15 hover:bg-white disabled:opacity-40"
        >
          ↶
        </button>
        <button
          type="button"
          title="Redo"
          aria-label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="min-h-9 rounded-lg border border-transparent px-2.5 text-sm text-[#35475a] hover:border-[#001F3F]/15 hover:bg-white disabled:opacity-40"
        >
          ↷
        </button>
      </div>
      <EditorContent editor={editor} />
      <div
        role="status"
        aria-live="polite"
        className="border-t border-[#001F3F]/10 bg-[#FBFCFD] px-4 py-2 text-xs text-[#667687]"
      >
        {imageBusy
          ? "Uploading pasted image(s) to Cloudinary…"
          : "Paste text with images, upload images, or embed YouTube videos alongside your article."}
      </div>
    </div>
  );
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 180);
}

export default function AdminInsights({
  fullScreen = false,
  articleId = "",
  onOpenEditor = () => {},
  onClose = () => {},
}) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blankInsight);
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [editorInitialized, setEditorInitialized] = useState(false);

  async function loadItems() {
    setLoading(true);
    setFeedback("");
    try {
      const result = await apiRequest("/admin/content/insights");
      setItems(result.items || []);
    } catch (error) {
      setFeedback(error.message || "Could not load insights.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (!fullScreen || loading || editorInitialized) return;
    if (articleId !== "new") {
      const item = items.find((entry) => entry.id === articleId);
      if (item) {
        setEditingId(item.id);
        setForm({
          title: item.title || "",
          slug: item.slug || "",
          category: item.category || "",
          excerpt: item.excerpt || "",
          body: item.body || "",
          imageUrl: item.image?.url || "",
          imageAlt: item.image?.alt || "",
          published: Boolean(item.published),
        });
      } else
        setFeedback(
          "This insight could not be found. Return to the insights list and try again.",
        );
    }
    setEditorInitialized(true);
  }, [fullScreen, loading, editorInitialized, articleId, items]);

  const visibleItems = useMemo(
    () =>
      items.filter((item) => {
        const matchesStatus =
          filter === "all" ||
          (filter === "published" ? item.published : !item.published);
        const term = search.trim().toLowerCase();
        const matchesSearch =
          !term ||
          [item.title, item.category, item.excerpt, item.slug].some((value) =>
            value?.toLowerCase().includes(term),
          );
        return matchesStatus && matchesSearch;
      }),
    [items, search, filter],
  );

  function updateField(event) {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function editItem(item) {
    setEditingId(item.id);
    setFeedback("");
    setForm({
      title: item.title || "",
      slug: item.slug || "",
      category: item.category || "",
      excerpt: item.excerpt || "",
      body: item.body || "",
      imageUrl: item.image?.url || "",
      imageAlt: item.image?.alt || "",
      published: Boolean(item.published),
    });
    document
      .getElementById("insight-editor-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetForm() {
    setEditingId("");
    setForm(blankInsight);
    setFeedback("");
  }

  async function uploadImageFile(file) {
    if (!file.type.startsWith("image/"))
      throw new Error("Choose an image file such as JPG, PNG, or WebP.");
    setUploading(true);
    setUploadProgress({
      stage: "starting",
      percent: 0,
      originalSize: file.size,
    });
    setFeedback("");
    try {
      const image = await uploadInsightImage(file, setUploadProgress);
      setFeedback(
        `Image uploaded to Cloudinary${image.uploadSize < image.originalSize ? ` after compression (${(image.originalSize / 1024 / 1024).toFixed(1)} MB → ${(image.uploadSize / 1024 / 1024).toFixed(1)} MB)` : ""}.`,
      );
      return image;
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  }

  async function handleImageUpload(event) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    try {
      const image = await uploadImageFile(file);
      const suggestedAlt = file.name
        .replace(/\.[^.]+$/, "")
        .replace(/[-_]+/g, " ")
        .trim();
      setForm((current) => ({
        ...current,
        imageUrl: image.url,
        imageAlt: current.imageAlt || suggestedAlt,
      }));
    } catch (error) {
      setFeedback(error.message || "Could not upload this image.");
    } finally {
      input.value = "";
    }
  }

  async function submit(event) {
    event.preventDefault();
    const plainText = form.body
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .trim();
    if (plainText.length < 20) {
      setFeedback("Write at least 20 characters in the article body.");
      return;
    }
    if (form.body.length > 20000) {
      setFeedback(
        "Article formatting is too long. Keep the article under 20,000 characters.",
      );
      return;
    }
    setSaving(true);
    setFeedback("");
    const payload = { ...form, slug: form.slug.trim() || slugify(form.title) };
    try {
      const path = `/admin/content/insights${editingId ? `/${editingId}` : ""}`;
      const result = await apiRequest(path, {
        method: editingId ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      if (editingId)
        setItems((current) =>
          current.map((item) => (item.id === editingId ? result.item : item)),
        );
      else setItems((current) => [result.item, ...current]);
      if (fullScreen) {
        setForm({
          title: result.item.title,
          slug: result.item.slug,
          category: result.item.category || "",
          excerpt: result.item.excerpt,
          body: result.item.body,
          imageUrl: result.item.image?.url || "",
          imageAlt: result.item.image?.alt || "",
          published: Boolean(result.item.published),
        });
        setEditingId(result.item.id);
      } else {
        setForm(blankInsight);
        setEditingId("");
      }
      setFeedback(
        `Insight ${payload.published ? "published" : "saved as a draft"}.`,
      );
      if (payload.published && fullScreen) onClose();
    } catch (error) {
      setFeedback(error.message || "Could not save this insight.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteItem(item) {
    if (!window.confirm(`Delete “${item.title}”? This cannot be undone.`))
      return;
    try {
      await apiRequest(`/admin/content/insights/${item.id}`, {
        method: "DELETE",
      });
      setItems((current) => current.filter((entry) => entry.id !== item.id));
      if (editingId === item.id) resetForm();
      setFeedback("Insight deleted.");
    } catch (error) {
      setFeedback(error.message || "Could not delete this insight.");
    }
  }

  const editorForm = (
    <form
      id="insight-editor-form"
      onSubmit={submit}
      className="w-full rounded-2xl border border-[#001F3F]/10 bg-white p-5 shadow-sm sm:p-7 lg:p-9"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8a6812]">
            Article editor
          </p>
          <h2 className="mt-1 text-xl font-semibold md:text-2xl">
            {editingId ? "Edit insight" : "Create an insight"}
          </h2>
        </div>
        {editingId && (
          <span className="rounded-full bg-[#F8F6EF] px-3 py-1 text-xs font-semibold text-[#526171]">
            Editing
          </span>
        )}
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <label className="block text-sm font-semibold lg:col-span-2">
          Title
          <input
            name="title"
            maxLength="180"
            required
            value={form.title}
            onChange={updateField}
            className={fieldClass}
            placeholder="A clear, engaging headline"
          />
        </label>
        <label className="block text-sm font-semibold">
          URL slug{" "}
          <span className="font-normal text-[#667687]">(optional)</span>
          <input
            name="slug"
            maxLength="200"
            value={form.slug}
            onChange={updateField}
            className={fieldClass}
            placeholder={slugify(form.title) || "created-from-title"}
          />
        </label>
        <label className="block text-sm font-semibold">
          Category{" "}
          <span className="font-normal text-[#667687]">(optional)</span>
          <select
            name="category"
            value={form.category}
            onChange={updateField}
            className={fieldClass}
          >
            <option value="">Choose a category</option>
            {form.category && !insightCategories.includes(form.category) && (
              <option value={form.category}>{form.category}</option>
            )}
            {insightCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold lg:col-span-2">
          Short description
          <textarea
            name="excerpt"
            minLength="10"
            maxLength="400"
            rows="3"
            required
            value={form.excerpt}
            onChange={updateField}
            className={`${fieldClass} resize-y`}
            placeholder="A short summary for insight cards and previews."
          />
          <span className="mt-1 block text-right text-xs font-normal text-[#667687]">
            {form.excerpt.length}/400
          </span>
        </label>
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold">Article body</label>
          <InsightEditor
            value={form.body}
            onChange={(body) =>
              setForm((current) =>
                current.body === body ? current : { ...current, body },
              )
            }
            onImageUpload={uploadImageFile}
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[#001F3F]/10 bg-[#F8FAFC] p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold">Cover image</h3>
            <p className="mt-1 text-xs leading-5 text-[#667687]">
              Upload JPG, PNG, WebP, or another image format. Images 10 MB or
              larger are compressed in the background first.
            </p>
          </div>
          <label
            className={`inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full px-5 text-sm font-bold transition-colors ${uploading ? "bg-[#526171] text-white" : "bg-[#001F3F] text-white hover:bg-[#0b385f]"}`}
          >
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={handleImageUpload}
              className="sr-only"
            />
            {uploading
              ? "Working…"
              : form.imageUrl
                ? "Replace image"
                : "Choose image"}
          </label>
        </div>
        {uploadProgress && (
          <div
            role="status"
            aria-live="polite"
            className="mt-4 rounded-xl bg-white p-3 text-sm text-[#35475a]"
          >
            <div className="flex items-center justify-between gap-3">
              <span>
                {uploadProgress.stage === "compressing"
                  ? "Compressing image in the background…"
                  : uploadProgress.stage === "uploading"
                    ? "Uploading image to Cloudinary…"
                    : uploadProgress.stage === "signing"
                      ? "Preparing secure upload…"
                      : "Preparing image…"}
              </span>
              <span className="tabular-nums">
                {["compressing", "uploading"].includes(uploadProgress.stage)
                  ? `${Math.round(uploadProgress.percent)}%`
                  : ""}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EDF0F2]">
              <div
                className="h-full rounded-full bg-[#DAA520] transition-all"
                style={{
                  width: `${["compressing", "uploading"].includes(uploadProgress.stage) ? Math.max(4, uploadProgress.percent) : 35}%`,
                }}
              />
            </div>
          </div>
        )}
        {form.imageUrl && (
          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.55fr)]">
            <div className="overflow-hidden rounded-xl border border-[#001F3F]/10 bg-white">
              <img
                src={form.imageUrl}
                alt={form.imageAlt || "Insight cover preview"}
                className="max-h-72 w-full object-cover"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">
                Image description
                <input
                  name="imageAlt"
                  maxLength="250"
                  required
                  value={form.imageAlt}
                  onChange={updateField}
                  className={fieldClass}
                  placeholder="Describe the image for accessibility"
                />
              </label>
              <label className="mt-4 block text-sm font-semibold">
                Cloudinary image URL
                <input
                  name="imageUrl"
                  type="url"
                  value={form.imageUrl}
                  onChange={updateField}
                  className={`${fieldClass} text-xs`}
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
                className="mt-3 min-h-10 rounded-full border border-red-200 px-4 text-sm font-semibold text-red-700 hover:bg-red-50"
              >
                Remove image
              </button>
            </div>
          </div>
        )}
      </div>

      <label className="mt-6 flex min-h-11 cursor-pointer items-center gap-3 text-sm font-semibold">
        <input
          type="checkbox"
          name="published"
          checked={form.published}
          onChange={updateField}
          className="h-4 w-4 accent-[#001F3F]"
        />
        Publish on website
        <span
          className={`ml-auto rounded-full px-3 py-1 text-xs font-semibold ${form.published ? "bg-emerald-50 text-emerald-800" : "bg-[#F8F6EF] text-[#526171]"}`}
        >
          {form.published ? "Live when saved" : "Draft"}
        </span>
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
          className="min-h-11 rounded-full bg-[#001F3F] px-6 text-sm font-bold text-white transition-colors hover:bg-[#0b385f] disabled:opacity-60"
        >
          {saving
            ? "Saving…"
            : editingId
              ? "Save changes"
              : form.published
                ? "Publish insight"
                : "Save as draft"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="min-h-11 rounded-full border border-[#001F3F]/20 px-5 text-sm font-semibold hover:bg-[#F8F6EF]"
          >
            Clear form
          </button>
        )}
      </div>
    </form>
  );

  if (fullScreen) {
    if (loading || !editorInitialized)
      return (
        <main className="grid min-h-screen place-items-center bg-[#F3F5F7] text-sm text-[#526171]">
          Loading insight editor…
        </main>
      );
    return (
      <main className="min-h-screen bg-[#F3F5F7] text-[#001F3F]">
        <header className="sticky top-0 z-10 border-b border-[#001F3F]/10 bg-white/95 px-4 py-3 backdrop-blur sm:px-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-full border border-[#001F3F]/15 px-4 text-sm font-semibold hover:bg-[#F8F6EF]"
            >
              ← Back to insights
            </button>
            <p className="hidden text-sm font-semibold text-[#526171] sm:block">
              Morning Star · Insights
            </p>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${form.published ? "bg-emerald-50 text-emerald-800" : "bg-[#F8F6EF] text-[#526171]"}`}
            >
              {form.published ? "Published" : "Draft"}
            </span>
          </div>
        </header>
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-9">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a6812]">
              {editingId ? "Edit article" : "New article"}
            </p>
            <h1 className="mt-1 text-2xl font-semibold md:text-2xl lg:text-3xl">
              {form.title || "Untitled insight"}
            </h1>
          </div>
          {editorForm}
        </div>
      </main>
    );
  }

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a6812]">
            Website content
          </p>
          <h2 className="mt-2 text-2xl font-semibold md:text-2xl lg:text-3xl">
            Insights
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#526171]">
            Write and publish foundation news, community stories, and useful
            updates.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenEditor("new")}
          className="min-h-11 shrink-0 rounded-full bg-[#001F3F] px-5 text-sm font-bold text-white transition-colors hover:bg-[#0b385f]"
        >
          ＋ New insight
        </button>
      </div>
      {feedback && (
        <p
          role="status"
          aria-live="polite"
          className="mt-5 rounded-xl bg-[#F8F6EF] px-4 py-3 text-sm leading-6 text-[#435365]"
        >
          {feedback}
        </p>
      )}
      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-[#001F3F]/10 bg-white p-4 shadow-sm sm:flex-row">
        <label className="flex-1 text-xs font-semibold uppercase tracking-wide text-[#667687]">
          Search articles
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search title, category, or slug"
            className="mt-1 min-h-10 w-full rounded-lg border border-[#001F3F]/15 px-3 text-sm font-normal normal-case tracking-normal text-[#001F3F] outline-none focus:border-[#001F3F]"
          />
        </label>
        <label className="text-xs font-semibold uppercase tracking-wide text-[#667687]">
          Status
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="mt-1 min-h-10 w-full rounded-lg border border-[#001F3F]/15 bg-white px-3 text-sm font-normal normal-case tracking-normal text-[#001F3F] sm:w-36"
          >
            <option value="all">All insights</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </label>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-[#667687]">
        <span>
          {visibleItems.length}{" "}
          {visibleItems.length === 1 ? "article" : "articles"}
        </span>
        <button
          onClick={loadItems}
          disabled={loading}
          className="rounded-lg px-2 py-1 font-semibold text-[#001F3F] hover:bg-white disabled:opacity-50"
        >
          {loading ? "Loading…" : "↻ Refresh"}
        </button>
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">
        {loading && (
          <p className="rounded-2xl bg-white p-5 text-sm text-[#526171]">
            Loading insights…
          </p>
        )}
        {!loading && visibleItems.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#001F3F]/20 bg-white p-8 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#F8F2DF] text-xl text-[#8a6812]">
              ▤
            </span>
            <p className="mt-4 font-semibold">
              {items.length ? "No matching insights" : "No insights yet"}
            </p>
            <p className="mt-1 text-sm text-[#667687]">
              {items.length
                ? "Try another search or status filter."
                : "Create your first article to share an update with your community."}
            </p>
          </div>
        )}
        {visibleItems.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-2xl border border-[#001F3F]/10 bg-white shadow-sm"
          >
            {item.image?.url && (
              <img
                src={item.image.url}
                alt={item.image.alt || ""}
                className="h-44 w-full object-cover"
              />
            )}
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${item.published ? "bg-emerald-50 text-emerald-800" : "bg-[#F8F6EF] text-[#526171]"}`}
                >
                  {item.published ? "Published" : "Draft"}
                </span>
                {item.category && (
                  <span className="rounded-full bg-[#E8F1F8] px-3 py-1 text-xs font-semibold text-[#07518A]">
                    {item.category}
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#526171]">
                {item.excerpt}
              </p>
              <p className="mt-2 truncate text-xs text-[#667687]">
                /{item.slug}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => onOpenEditor(item.id)}
                  className="min-h-9 rounded-full border border-[#001F3F]/20 px-4 text-sm font-semibold hover:bg-[#F8F6EF]"
                >
                  Edit article
                </button>
                <button
                  onClick={() => deleteItem(item)}
                  className="min-h-9 rounded-full border border-red-200 px-4 text-sm font-semibold text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
                {item.published && (
                  <a
                    href={`/insights/${item.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-9 items-center rounded-full px-3 text-sm font-semibold text-[#07518A] hover:bg-[#E8F1F8]"
                  >
                    View ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
