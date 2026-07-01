import { MainLayout } from "@/components/templates";
import Link from "next/link";

export default function JoinPage() {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-6 py-16 bg-gradient-to-b from-white via-orange-50 to-white">
        <div className="max-w-3xl rounded-3xl border border-orange-100 bg-white/90 p-10 shadow-2xl shadow-orange-200/40">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Join Indians in Korea
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Thanks for your interest! We are growing a welcoming community for
            Indians in Korea. Use the contact page below to send your request,
            or explore our resources and events while you wait.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Contact Us
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center justify-center rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
            >
              Explore Community
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
