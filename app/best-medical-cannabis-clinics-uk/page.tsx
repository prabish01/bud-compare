import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { bestClinicsData as data } from "@/lib/bestClinicsData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} />;
}
