import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

const YoutubeForm = () => {
  const { register, control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username")} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
