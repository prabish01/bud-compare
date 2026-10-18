import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { nhsVsPrivateData as data } from "@/lib/nhsVsPrivateData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} />;
}
