import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft, HeartHandshake } from "lucide-react";

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-4 text-4xl font-bold">Post not found</h1>
        <Link href="/" className="text-brand-600 hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContents);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              <HeartHandshake className="h-4 w-4" />
            </div>
            <div className="text-sm font-bold">Church Follow-Up Pipeline</div>
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-brand-600">
            Home
          </Link>
        </div>
      </nav>

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-20">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-600"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="prose prose-slate max-w-none prose-h1:text-4xl prose-h1:font-extrabold prose-h1:tracking-tight prose-h2:text-2xl prose-h2:font-bold prose-p:leading-relaxed prose-p:text-slate-600">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 md:p-12">
          <h2 className="mb-4 text-2xl font-bold">Need help implementing this?</h2>
          <p className="mb-6 text-slate-600">
            Stop losing church visitors because follow-up is slow or generic. Get the full blueprint or let Nathan/HappyWP
            build it for you.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/#download"
              className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-6 py-4 text-sm font-bold text-white hover:bg-brand-700"
            >
              Get the free blueprint
            </Link>
            <Link
              href="/#services"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-900 hover:bg-slate-100"
            >
              See implementation options
            </Link>
          </div>
        </div>
      </article>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>Church Follow-Up Pipeline by HappyWP</div>
          <div>Email: nathan@happywp.co</div>
        </div>
      </footer>
    </main>
  );
}
