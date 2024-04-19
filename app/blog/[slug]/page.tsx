import {fullBlog} from "@/app/lib/interface";
import {client, urlFor} from "@/app/lib/sanity";
import Image from "next/image";
import React from "react";
import {PortableText} from "@portabletext/react";
import {MoveLeft} from "lucide-react";
import Back from "@/app/components/Back";
import Link from "next/link";

export const revalidate = 30;

async function getData(slug: string) {
  const query = ` *[_type == "blog" && slug.current == '${slug}']{
        "curentSlug" : slug.current,
        title,
        content,
        titleImage
    }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({params}: {params: {slug: string}}) {
  const data: fullBlog = await getData(params.slug);

  return (
    <>
      <div>
        <Link href={"/"}>
          <MoveLeft />
        </Link>
        <h1>
          <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
            Rafi-Blog
          </span>
          <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl mb-3">
            {data.title}
          </span>
        </h1>
        <Image
          src={urlFor(data.titleImage).url()}
          alt=""
          width={800}
          height={800}
          className="rounded-lg mt-8"
          priority
        />
        <div className="mt-16 prose prose-blue prose-xl dark:prose-invert prose-headings:underline">
          <PortableText value={data.content} />
        </div>
      </div>
    </>
  );
}
