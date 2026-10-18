import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { insomniaData as data } from "@/lib/insomniaData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} />;
}
