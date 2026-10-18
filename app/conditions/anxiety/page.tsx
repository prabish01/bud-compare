import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { anxietyData as data } from "@/lib/anxietyData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} />;
}
