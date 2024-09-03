
interface Params {
  readonly id: string
}


export default function Page(props: { readonly params: Params }) {
  return <div>Blog page</div>
}