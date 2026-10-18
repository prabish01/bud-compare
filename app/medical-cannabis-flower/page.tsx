import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { flowerData as data } from "@/lib/flowerData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} />;
}
