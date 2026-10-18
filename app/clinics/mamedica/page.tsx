import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { mamedicaReviewData as data } from "@/lib/mamedicaReviewData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} clinicId="mamedica" />;
}
