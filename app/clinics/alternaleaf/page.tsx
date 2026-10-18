import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { alternaleafReviewData as data } from "@/lib/alternaleafReviewData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} clinicId="alternaleaf" />;
}
