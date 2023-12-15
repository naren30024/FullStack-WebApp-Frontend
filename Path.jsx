import { useRouter } from "next/router";
import React from 'react'

export default function Path() {
    const router = useRouter()
  return (
    <div>
        {router.asPath}
    </div>
  )
}
