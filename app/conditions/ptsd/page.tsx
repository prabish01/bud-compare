import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { ptsdData as data } from "@/lib/ptsdData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} />;
}
