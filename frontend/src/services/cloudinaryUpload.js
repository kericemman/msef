import imageCompression from "browser-image-compression";
import { apiRequest } from "./api.js";

const compressionThreshold = 10 * 1024 * 1024;

function optimizedDeliveryUrl(url) {
  return url.replace("/image/upload/", "/image/upload/f_auto,q_auto/");
}

export async function uploadInsightImage(
  file,
  onProgress = () => {},
  folder = "msef/site/insights",
) {
  if (!file || !file.type.startsWith("image/"))
    throw new Error("Choose a supported image file.");
  let uploadFile = file;

  if (file.size >= compressionThreshold) {
    onProgress({ stage: "compressing", percent: 0, originalSize: file.size });
    uploadFile = await imageCompression(file, {
      maxSizeMB: 8,
      maxWidthOrHeight: 2560,
      useWebWorker: true,
      initialQuality: 0.86,
      onProgress: (percent) =>
        onProgress({ stage: "compressing", percent, originalSize: file.size }),
    });
  }

  onProgress({
    stage: "signing",
    percent: 0,
    originalSize: file.size,
    uploadSize: uploadFile.size,
  });
  let signed;
  try {
    signed = await apiRequest("/admin/cloudinary/insight-signature", {
      method: "POST",
      body: JSON.stringify({ folder }),
    });
  } catch (error) {
    if (error.status === 401)
      throw new Error(
        "Your admin session expired. Sign in again, then retry the upload.",
      );
    if (error.status === 403)
      throw new Error(
        "The API rejected this upload request. Check that the frontend origin matches FRONTEND_ORIGIN on the server.",
      );
    if (error.status === 404)
      throw new Error(
        "The upload-signature API route was not found. Check VITE_API_BASE_URL and restart the backend.",
      );
    if (error.status === 503)
      throw new Error(
        error.message || "Cloudinary uploads are not configured on the server.",
      );
    if (error.status >= 500)
      throw new Error(
        "The server could not prepare the Cloudinary upload. Check the backend logs for the signing endpoint.",
      );
    throw error;
  }

  if (
    !signed?.cloudName ||
    !signed?.apiKey ||
    !signed?.timestamp ||
    !signed?.folder ||
    !signed?.signature
  ) {
    throw new Error(
      "The server returned incomplete Cloudinary upload details. Check the backend Cloudinary configuration.",
    );
  }

  const body = new FormData();
  body.append("file", uploadFile, uploadFile.name);
  body.append("api_key", signed.apiKey);
  body.append("timestamp", String(signed.timestamp));
  body.append("folder", signed.folder);
  body.append("signature", signed.signature);

  onProgress({
    stage: "uploading",
    percent: 0,
    originalSize: file.size,
    uploadSize: uploadFile.size,
  });
  const result = await new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${encodeURIComponent(signed.cloudName)}/image/upload`,
    );
    request.upload.onprogress = (event) => {
      if (event.lengthComputable)
        onProgress({
          stage: "uploading",
          percent: Math.round((event.loaded / event.total) * 100),
          originalSize: file.size,
          uploadSize: uploadFile.size,
        });
    };
    request.onerror = () =>
      reject(new Error("Network error while uploading to Cloudinary."));
    request.onload = () => {
      let payload = {};
      try {
        payload = JSON.parse(request.responseText);
      } catch {
        /* Cloudinary returned an unreadable response. */
      }
      if (request.status < 200 || request.status >= 300)
        reject(
          new Error(
            `Cloudinary upload failed (${request.status}): ${payload.error?.message || "The image was rejected."}`,
          ),
        );
      else resolve(payload);
    };
    request.send(body);
  });
  onProgress({
    stage: "complete",
    percent: 100,
    originalSize: file.size,
    uploadSize: uploadFile.size,
  });

  return {
    url: optimizedDeliveryUrl(result.secure_url),
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    originalSize: file.size,
    uploadSize: uploadFile.size,
  };
}

export async function uploadTestimonialVideo(file, onProgress = () => {}) {
  if (!file || !file.type.startsWith("video/"))
    throw new Error("Choose a video file such as MP4, WebM, or MOV.");

  onProgress({ stage: "signing", percent: 0, originalSize: file.size });
  let signed;
  try {
    signed = await apiRequest("/admin/cloudinary/insight-signature", {
      method: "POST",
      body: JSON.stringify({
        folder: "msef/site/testimonials",
        resourceType: "video",
      }),
    });
  } catch (error) {
    if (error.status === 401)
      throw new Error("Your admin session expired. Sign in again, then retry.");
    if (error.status === 403)
      throw new Error(
        "The API rejected this request. Check that the frontend origin matches FRONTEND_ORIGIN on the server.",
      );
    if (error.status === 503)
      throw new Error(error.message || "Cloudinary uploads are not configured.");
    if (error.status >= 500)
      throw new Error(
        "The server could not prepare the video upload. Check the backend logs.",
      );
    throw error;
  }

  const body = new FormData();
  body.append("file", file, file.name);
  body.append("api_key", signed.apiKey);
  body.append("timestamp", String(signed.timestamp));
  body.append("folder", signed.folder);
  body.append("signature", signed.signature);

  onProgress({ stage: "uploading", percent: 0, originalSize: file.size });
  const result = await new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${encodeURIComponent(signed.cloudName)}/video/upload`,
    );
    request.upload.onprogress = (event) => {
      if (event.lengthComputable)
        onProgress({
          stage: "uploading",
          percent: Math.round((event.loaded / event.total) * 100),
          originalSize: file.size,
        });
    };
    request.onerror = () =>
      reject(new Error("Network error while uploading the video to Cloudinary."));
    request.onload = () => {
      let payload = {};
      try {
        payload = JSON.parse(request.responseText);
      } catch {
        /* Cloudinary returned an unreadable response. */
      }
      if (request.status < 200 || request.status >= 300)
        reject(
          new Error(
            `Cloudinary video upload failed (${request.status}): ${payload.error?.message || "The video was rejected."}`,
          ),
        );
      else resolve(payload);
    };
    request.send(body);
  });

  onProgress({ stage: "complete", percent: 100, originalSize: file.size });
  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    duration: result.duration,
    originalSize: file.size,
  };
}
