import { buildWebPageStructuredData } from "@/lib/site-metadata";

type StructuredPageDataProps = {
  title: string;
  description: string;
  path: "/" | "/studio" | "/systems" | "/brief";
};

export default function StructuredPageData({
  title,
  description,
  path,
}: StructuredPageDataProps) {
  const data = buildWebPageStructuredData({ title, description, path });

  return (
    <script
      data-bnd-page-structured-data={path}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
