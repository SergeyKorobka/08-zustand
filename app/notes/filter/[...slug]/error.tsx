'use client';

type Props = {
  error: Error;
};

export default function Error({ error }: Props) {
  console.log(error);
  return <p>Could not fetch the list of notes. {error.message}</p>;
}
