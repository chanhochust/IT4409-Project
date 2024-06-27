import {Counter} from "src/app/(pages)/counter/(components)/Counter";
import {CounterController} from "src/app/(pages)/counter/(components)/CounterController";

const Page = () => {
  return <>
    <Counter/>
    <CounterController/>
  </>
}

export default Page;