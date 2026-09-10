import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0F172A",
          borderRadius: "50%",
          padding: "2px",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="18" stroke="#334155" strokeWidth="2.5" />
          <path
            d="M 18 5 C 28 13, 27 27, 17 35"
            stroke="#E05638"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 9 27 C 12 15, 28 15, 31 27"
            stroke="#2563EB"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="10" cy="26" r="3" fill="#E05638" />
          <circle cx="30" cy="26" r="3" fill="#E05638" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
