import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { chronicPainData as data } from "@/lib/chronicPainData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} />;
}
