import { render } from "@testing-library/vue";
import SCard from "~/components/SCard.vue";

test("SCard should say Hello World", () => {
  const { getByText } = render(SCard, {
    props: {
      title: "Hello World",
    },
  });

  // assert output
  getByText("Hello World");
});
