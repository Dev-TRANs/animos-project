import type { Metadata } from "next";
import NewsIndex from "./NewsIndex";

export const metadata: Metadata = {
  title: "News",
  description: "アニモスプロジェクトからのお知らせと活動記録です。",
};

export default function NewsPage() {
  return <NewsIndex />;
}
