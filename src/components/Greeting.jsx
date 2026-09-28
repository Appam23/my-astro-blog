import { useState } from 'react';

export default function Greeting() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>Hello, Astro!</h3>
      <button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </button>
    </div>
  );
}