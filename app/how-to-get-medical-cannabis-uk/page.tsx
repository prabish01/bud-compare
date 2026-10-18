import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { howToGetData as data } from "@/lib/howToGetData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} />;
}
