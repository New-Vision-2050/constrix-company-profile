import { Label } from "@/components/label";
import { SvgColor } from "@/components/svg-color";
import Image from "next/image";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} />
);

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: "workspaces.pluralTitle",
    path: "/workspace",
    icon: icon("ic-analytics"),
  },
  {
    title: "patient.plural",
    path: "/patient",
    icon: (
      <Image
        width={24}
        height={24}
        style={{ objectFit: "contain" }}
        src="/assets/icons/navbar/ic-patient.webp"
        alt="patient"
      />
    ),
  },
  {
    title: "services.pluralTitle",
    path: "/services",
    icon: icon("ic-blog"),
  },
  {
    title: "serviceCategories.pluralTitle",
    path: "/service-categories",
    icon: icon("ic-folder"),
  },
  {
    title: "blogs.pluralTitle",
    path: "/",
    icon: icon("ic-blog"),
  },
];
