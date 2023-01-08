import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { getStoryblokApi, StoryblokComponent } from '@storyblok/react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Home(props) {

  const story = props.story;

  const { data: session } = useSession();
	let name = "";
	let email = "";
	if (session) {
		email = session.user.email
		name = session.user.name.split(" ")[0]
	}

  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/" onClick={signIn}>
        {(!session) &&
          <button>Login</button>
        }
      </Link>
      {(session) &&
      <>
        <header>
          <h2>logged in as {email}</h2>
          <h1>
            { story ? story.name : 'My Site' }
          </h1>
        </header>
  
        <main>
        <StoryblokComponent blok={story.content} />
        </main>
        <Link href="/" onClick={signOut}><button>log out</button></Link>
      </>}
    </div>
  )
}

export async function getStaticProps() {
  
  let slug = "home";
 
  // load the draft version
  let sbParams = {
    version: "published", // or 'published'
  };
 
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
 
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600, // revalidate every hour
  };
}
