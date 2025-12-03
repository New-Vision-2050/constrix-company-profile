import ContactView from "@/sections/contact/view/contact-view";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav");
  return {
    title: t("contact"),
  };
}

function page() {
  return <ContactView />;
}

export default page;
