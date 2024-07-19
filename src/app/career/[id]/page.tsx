import { Metadata, ResolvingMetadata } from "next";
import React from "react";

const getCareerById = async (id: any) => {
  return fetch(`
https://api-be.rilati.com/career/${id}`)
    .then((res) => res.json())
    .then((data) => {
      return data.data.attributes;
    });
};

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;
  const data = await getCareerById(id);

  return {
    title: data.title,
    description: data.job_description,
    openGraph: {
      images: [
        {
          url: `https://nextjs-open-graph.vercel.app/api/og?title=${encodeURIComponent(
            data.title
          )}&imageUrl=${data.image}`,
        },
      ],
    },
  };
}

const Career = async ({ params }: { params: { id: string } }) => {
  const data = await getCareerById(params.id);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -mx-4 -mb-10 text-center justify-center">
          <div className="sm:w-1/2 mb-10 px-4">
            <div className="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src={data.image}
              />
            </div>
            <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">
              {data.title}
            </h2>
            <p className="leading-relaxed text-base">{data.job_description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
