type Props = {
    text: string;
}
export function ListHeader(prop: Props) {
  return (
      <h2 className={"text-white text-2xl font-bold m-2"}>
          {prop.text}
      </h2>
  );
}