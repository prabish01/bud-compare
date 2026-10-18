import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { oilsData as data } from "@/lib/oilsData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} />;
}
