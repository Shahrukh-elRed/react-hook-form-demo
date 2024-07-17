import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

const YoutubeForm = () => {
  const { register, control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: { value: true, message: "Username is required" },
          })}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
          })}
        />

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", { required: "Channel is required" })}
        />

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
