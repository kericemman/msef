import media from "../content/media-library.json";

const foundationLogo = media.assets.find((asset) => asset.id === "MSEF-12");

export default function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <img src={foundationLogo.optimizedUrl} alt="" />
    </span>
  );
}
