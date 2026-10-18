import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { adhdData as data } from "@/lib/adhdData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} />;
}
