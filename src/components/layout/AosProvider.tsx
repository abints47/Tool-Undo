"use client";

import { useEffect } from "react";
import AOS from "aos";

/**
 * Single client island that initializes AOS once for the whole app.
 * Server Components can safely render `data-aos` attributes without
 * importing the AOS library themselves.
 */
export default function AosProvider() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
      easing: "ease-out-cubic",
      anchorPlacement: "top-bottom",
    });
  }, []);

  return null;
}
