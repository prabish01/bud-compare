import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { costData as data } from "@/lib/costData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} />;
}
