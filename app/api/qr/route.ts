export const dynamic = "force-dynamic"; // static by default, unless reading the request

import { NextResponse, NextRequest } from "next/server";
import QRCode from "qrcode";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const url = searchParams.get("url");

    if (!url) {
      return new NextResponse(null, {
        status: 400,
        statusText: "Missing url",
      });
    }

    const width = parseInt(searchParams.get("width") ?? "320");

    if (isNaN(width)) {
      return new NextResponse(null, {
        status: 400,
        statusText: "width must be number",
      });
    }

    const margin = parseInt(searchParams.get("margin") ?? "0");

    if (isNaN(margin)) {
      return NextResponse.json({ message: "margin must be number" });
    }

    const backgroundColor = searchParams.get("bgColor") ?? "#fff";

    const codeColor = searchParams.get("codeColor") ?? "#000";

    const imageData = await QRCode.toDataURL(url, {
      width,
      margin,
      type: "image/png",
      color: {
        dark: `#${codeColor.replace("#", "")}`,
        light: `#${backgroundColor.replace("#", "")}`,
      },
    });

    const base64Data = imageData.replace(/^data:image\/png;base64,/, "");

    const binaryData = Buffer.from(base64Data, "base64");

    const blob = new Blob([binaryData], { type: "image/png" });

    const headers = new Headers();

    headers.set("Content-Type", "image/*");
    headers.set("Content-Disposition", 'attachment; filename="qrcode.png"');

    return new NextResponse(blob, { status: 200, statusText: "OK", headers });
  } catch (err) {
    console.error(err);
  }

  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
