'use server'

import { Thread, ThreadSchema } from '@/utils/models/thread/thread.model'
import {Status} from "@/utils/interfaces/Status";
import {error} from "next/dist/build/output/log";
import {setHeaders} from "@/utils/set-headers.utils";

export async function fetchAllThreads() : Promise<Thread[]> {
  const {data} = await fetch(
    `${process.env.PUBLIC_API_URL}/apis/thread/`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(response => {
    if( !response.ok ) {
      throw new Error('Network response failed')
    }
    return response.json()
  })
  return ThreadSchema.array().parse(data)
}

export async function postThread(thread: Thread) : Promise<Status> {
  console.log(thread)
  return fetch(
    `${process.env.PUBLIC_API_URL}/apis/thread/`,
    {
      method: 'post',
      headers:await setHeaders(),
      body: JSON.stringify(thread)
    }
  ).then(response => {
    if( !response.ok ) {
      throw new Error('Network response failed')
    }
    return response.json()
  }).catch(error => {
    console.error(error)
    throw error
  })
}

