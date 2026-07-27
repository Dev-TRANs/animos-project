import { createPageMetadata } from "../metadata-config";
import NewsIndex from "./NewsIndex";

export const metadata = createPageMetadata({
  title: "News",
  description: "ANIMOS PROJECTからのお知らせと活動記録を掲載。最新の取り組みは公式noteの記事からご覧いただけます。",
  path: "/news",
});

export default function NewsPage() {
  return <NewsIndex />;
}
