"use client";

import { useRef, useState } from "react";
import jsQR from "jsqr";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [scanFile, setScanFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const isUrl = (value: string) => {
    try {
      const url = new URL(value.trim());
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const generateQR = () => {
    setError("");
    setScanResult("");

    if (!text.trim()) {
      setError("Please enter text, a URL, or any information.");
      return;
    }

    const encoded = encodeURIComponent(text.trim());

    setQrImage(
      `https://api.qrserver.com/v1/create-qr-code/?size=700x700&data=${encoded}`
    );
  };

  const downloadQR = async () => {
    if (!qrImage) return;

    try {
      const response = await fetch(qrImage);

      if (!response.ok) {
        throw new Error();
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "krishaiworks-qr-code.png";

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch {
      setError("Unable to download QR code.");
    }
  };

  const clearGenerator = () => {
    setText("");
    setQrImage("");
    setError("");
  };

  const scanQRCode = (file: File | null) => {
    if (!file) return;

    setError("");
    setScanResult("");
    setScanFile(file);

    if (!file.type.startsWith("image/")) {
      setError("Please select an image containing a QR code.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error();
        }

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        context.drawImage(
          image,
          0,
          0,
          image.naturalWidth,
          image.naturalHeight
        );

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

        const code = jsQR(
          imageData.data,
          imageData.width,
          imageData.height,
          {
            inversionAttempts: "attemptBoth",
          }
        );

        if (code) {
          setScanResult(code.data);
        } else {
          setError(
            "No QR code found. Please upload a clear QR image."
          );
        }
      } catch {
        setError("Unable to scan this image.");
      } finally {
        URL.revokeObjectURL(imageUrl);
      }
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      setError("Unable to read the selected image.");
    };

    image.src = imageUrl;
  };

  const copyResult = async () => {
    if (!scanResult) return;

    try {
      await navigator.clipboard.writeText(scanResult);
    } catch {
      setError("Unable to copy result.");
    }
  };

  const openWebsite = () => {
    if (!isUrl(scanResult)) return;

    window.open(
      scanResult.trim(),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#251316] via-[#0d090b] to-black text-white">

      {/* NAVBAR */}
      <nav className="mx-4 mt-5 rounded-3xl border border-[#e8a0a0]/20 bg-black/75 px-4 py-4 backdrop-blur-xl sm:mx-auto sm:max-w-6xl sm:px-6">
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full border border-[#e8a0a0]/30">
              <img
                src="/logo.png"
                alt="KrishAIWorks"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-sm font-bold sm:text-base">
                KrishAIWorks
              </h2>

              <p className="text-[10px] text-zinc-500 sm:text-xs">
                AI Solutions That Work
              </p>
            </div>
          </div>

          <a
            href="#qr-tool"
            className="rounded-xl border border-[#e8a0a0]/30 bg-[#e8a0a0]/10 px-4 py-2 text-xs text-[#e8a0a0] transition hover:bg-[#e8a0a0]/20"
          >
            Follow
          </a>

        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pb-14 pt-16 text-center sm:px-8 sm:pt-24">

        <div className="inline-flex rounded-full border border-[#e8a0a0]/25 bg-[#e8a0a0]/10 px-5 py-2 text-xs text-[#e8a0a0]">
          🔳 QR Code Generator & Scanner
        </div>

        <p className="mt-5 text-sm text-zinc-500">
          Built by{" "}
          <span className="text-[#e8a0a0]">
            KrishAIWorks
          </span>
        </p>

        <h1 className="mt-7 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl">
          Create QR Codes.
          <br />
          <span className="text-[#e8a0a0]">
            Scan Them Too.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-lg">
          Generate QR codes from any text or URL, or
          scan a QR code directly from an image.
        </p>

      </section>

      {/* MAIN TOOL */}
      <section
        id="qr-tool"
        className="mx-auto max-w-5xl px-4 pb-24 sm:px-8"
      >

        <div className="grid gap-6 lg:grid-cols-2">

          {/* GENERATOR */}
          <div className="rounded-[2rem] border border-[#e8a0a0]/20 bg-black/85 p-5 sm:p-8">

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8a0a0]">
              QR Generator
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Create a QR Code
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Enter a URL, text, phone number, email,
              or any information you want to encode.
            </p>

            <textarea
              value={text}
              onChange={(event) => {
                setText(event.target.value);
                setError("");
              }}
              placeholder="https://example.com"
              rows={5}
              className="mt-7 w-full resize-none rounded-2xl border border-[#e8a0a0]/15 bg-[#090708] p-4 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-[#e8a0a0]/50"
            />

            <button
              type="button"
              onClick={generateQR}
              className="mt-4 w-full rounded-2xl bg-[#e8a0a0] px-6 py-4 text-sm font-bold text-black transition hover:bg-white"
            >
              ✨ Generate QR Code
            </button>

            {qrImage && (
              <div className="mt-7 rounded-3xl border border-[#e8a0a0]/20 bg-white p-5">

                <div className="flex justify-center">
                  <img
                    src={qrImage}
                    alt="Generated QR Code"
                    className="h-auto w-full max-w-[300px]"
                  />
                </div>

                <p className="mt-4 break-all text-center text-xs text-zinc-500">
                  {text}
                </p>

                <button
                  type="button"
                  onClick={downloadQR}
                  className="mt-5 w-full rounded-xl bg-black px-5 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-800"
                >
                  📥 Download QR Code
                </button>

                <button
                  type="button"
                  onClick={clearGenerator}
                  className="mt-2 w-full py-2 text-xs text-zinc-400 hover:text-black"
                >
                  Create Another
                </button>

              </div>
            )}

          </div>

          {/* SCANNER */}
          <div className="rounded-[2rem] border border-[#e8a0a0]/20 bg-black/85 p-5 sm:p-8">

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8a0a0]">
              QR Scanner
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Scan a QR Code
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Upload an image containing a QR code and
              extract its information instantly.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                scanQRCode(
                  event.target.files?.[0] || null
                );

                event.target.value = "";
              }}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-7 flex min-h-[240px] w-full flex-col items-center justify-center rounded-3xl border border-dashed border-[#e8a0a0]/30 bg-[#090708] px-6 text-center transition hover:border-[#e8a0a0]/70 hover:bg-[#0d090b]"
            >

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-[#e8a0a0]/20 bg-[#e8a0a0]/10 text-4xl">
                📷
              </div>

              <h3 className="mt-5 font-bold">
                Upload QR Image
              </h3>

              <p className="mt-2 text-sm text-zinc-600">
                JPG, PNG or other supported image
              </p>

              <span className="mt-5 rounded-xl bg-[#e8a0a0] px-5 py-3 text-sm font-bold text-black">
                Choose Image
              </span>

            </button>

            {scanFile && (
              <div className="mt-4 rounded-xl border border-[#e8a0a0]/10 bg-[#090708] px-4 py-3">
                <p className="truncate text-xs text-zinc-500">
                  Selected:{" "}
                  <span className="text-zinc-300">
                    {scanFile.name}
                  </span>
                </p>
              </div>
            )}

            {/* RESULT */}

            {scanResult && (
              <div className="mt-7 rounded-3xl border border-[#e8a0a0]/20 bg-[#090708] p-5">

                <span className="inline-block rounded-xl border border-[#e8a0a0]/25 bg-[#e8a0a0]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e8a0a0]">
                  Scan Result
                </span>

                <h3 className="mt-5 text-2xl font-extrabold sm:text-3xl">
                  QR Code Detected.
                </h3>

                <div className="mt-5 rounded-2xl border border-[#e8a0a0]/10 bg-black p-4">
                  <p className="break-all text-sm leading-7 text-zinc-300">
                    {scanResult}
                  </p>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">

                  <button
                    type="button"
                    onClick={copyResult}
                    className="w-full rounded-xl border border-[#e8a0a0]/25 bg-[#e8a0a0]/10 px-5 py-3 text-sm font-semibold text-[#e8a0a0] transition hover:bg-[#e8a0a0]/20"
                  >
                    📋 Copy Result
                  </button>

                  {isUrl(scanResult) && (
                    <button
                      type="button"
                      onClick={openWebsite}
                      className="w-full rounded-xl bg-[#e8a0a0] px-5 py-3 text-sm font-bold text-black transition hover:bg-white"
                    >
                      🌐 Open Website
                    </button>
                  )}

                </div>

              </div>
            )}

          </div>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-300">
            ⚠️ {error}
          </div>
        )}

      </section>

      {/* FEATURES */}

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">

        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-3xl border border-[#e8a0a0]/10 bg-black/70 p-6">
            <div className="text-3xl">🔳</div>
            <h3 className="mt-5 text-lg font-bold">
              Generate QR Codes
            </h3>
            <p className="mt-3 text-sm leading-7 text-zinc-500">
              Turn URLs, text and information into
              downloadable QR codes.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8a0a0]/10 bg-black/70 p-6">
            <div className="text-3xl">📷</div>
            <h3 className="mt-5 text-lg font-bold">
              Scan From Images
            </h3>
            <p className="mt-3 text-sm leading-7 text-zinc-500">
              Upload a QR image and extract its
              encoded information.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8a0a0]/10 bg-black/70 p-6">
            <div className="text-3xl">📱</div>
            <h3 className="mt-5 text-lg font-bold">
              Mobile Friendly
            </h3>
            <p className="mt-3 text-sm leading-7 text-zinc-500">
              Designed for phones, tablets and
              desktop screens.
            </p>
          </div>

        </div>

      </section>

      {/* HOW TO USE */}

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">

        <div className="text-center">

          <p className="text-xs uppercase tracking-[0.22em] text-[#e8a0a0]">
            How To Use
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Simple and quick.
          </h2>

        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">

          {[
            [
              "01",
              "Enter Information",
              "Enter a URL or text you want to convert.",
            ],
            [
              "02",
              "Generate",
              "Create your QR code instantly.",
            ],
            [
              "03",
              "Download or Scan",
              "Download your QR or upload an image to scan one.",
            ],
          ].map(([number, title, description]) => (

            <div
              key={number}
              className="rounded-3xl border border-[#e8a0a0]/10 bg-black/70 p-6"
            >

              <span className="text-sm font-bold text-[#e8a0a0]">
                {number}
              </span>

              <h3 className="mt-4 font-bold">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                {description}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-[#e8a0a0]/10 px-5 py-10">

        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 text-center">

          <div className="h-14 w-14 overflow-hidden rounded-full border border-[#e8a0a0]/30">
            <img
              src="/logo.png"
              alt="KrishAIWorks Logo"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="font-bold">
              KrishAIWorks
            </p>

            <p className="mt-2 text-xs text-zinc-600">
              AI Solutions That Work
            </p>
          </div>

        </div>

      </footer>

    </main>
  );
}