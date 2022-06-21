import { Modal, useMantineTheme } from "@mantine/core";
import { Toaster, toast } from "react-hot-toast";
import { useForm } from "@mantine/form";
import { Button, Checkbox, NumberInput } from "@mantine/core";
import { BrandPaypal } from "tabler-icons-react";
const Paypal = ({ open, setopen, totalPrice }) => {
  const form = useForm({
    initialValues: {
      paypalAccount: "",
      isTransitionComfirm: false,
    },
  });

  const theme = useMantineTheme();
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Modal
        opened={open}
        onClose={() => setopen(false)}
        title={"Paypal Payment"}
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.7}
        overlayBlur={7}
        zIndex={400}
        centered
      >
        <h3 className="capitalize text-3xl text-blue-600 italic font-bold">
          paypal
        </h3>

        <form
          onSubmit={form.onSubmit((values) => console.log("register done"))}
          className="w-[90%] mx-auto mt-6"
        >
          <NumberInput
            icon={<BrandPaypal />}
            required
            placeholder="***********"
            label="Paypal Account"
            size="lg"
            radius="xl"
            className="flex-1 mx-auto mt-2"
            hideControls
            {...form.getInputProps("paypalAccount")}
          />

          <Checkbox
            required
            className="mt-6 lg:mt-5 cursor-pointer"
            label="Do you comfirm this transitions ?"
            {...form.getInputProps("isTransitionComfirm", { type: "checkbox" })}
          />

          <div className="w-full flex items-center justify-center">
            <Button
              type="submit"
              className="bg-blue-600 text-white text-lg mt-5 transition-all duration-200 ease-out hover:bg-blue-800 hover:shadow-md lg:w-[80%]  w-[100%] h-12 rounded-full"
            >
              Pay ${totalPrice}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Paypal;
