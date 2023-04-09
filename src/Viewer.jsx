import { Image } from "antd";
import "antd/es/image/style/index.css";
import "./Viewer.css";

export function Viewer({ data = {} }) {
  const { url, hdurl, media_type, date = "" } = data;
  const formattedDateForNasaPage = date.replaceAll("-", "").substr(2);
  const nasaPageUrl = `https://apod.nasa.gov/apod/ap${formattedDateForNasaPage}.html`;

  if (media_type === "video") {
    return (
      <div className="video-wrapper">
        <iframe src={url} />
      </div>
    );
  }

  if (media_type === "image") {
    return (
      <Image
        src={url}
        preview={{
          src: hdurl,
        }}
        style={{ maxHeight: "80vh" }}
      />
    );
  } else {
    return (
      <div>
        <p style={{ color: "white" }}>
          Unsupported media type, try another day <br />
          or try watching on NASA APOD project: <br />
          <a target="_blank" rel="noopener norefer" href={nasaPageUrl}>
            {nasaPageUrl}
          </a>
        </p>
      </div>
    );
  }
}
