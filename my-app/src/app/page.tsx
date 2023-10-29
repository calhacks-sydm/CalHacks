import Image from 'next/image'
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);


  return (
    <div>{data}</div>
  )
}
export const useClient = true;
