"use client";

import { useEffect } from "react";

export default function MidtransScriptLoader() {
  useEffect(() => {
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY as string;

    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.type = "text/javascript";
    script.async = true;
    script.setAttribute("data-client-key", clientKey);

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
